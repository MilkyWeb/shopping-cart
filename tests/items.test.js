import { Item } from "../src";

const id = "item1";
const name = "Playera";
const price = 15;

test("item default attributes", () => {
  const item = new Item(id, name, price);

  expect(item.id).toBe(id);
  expect(item.name).toBe(name);
  expect(item.price).toBe(price);
  expect(item.maxQuantity).toBe(100);
  expect(item.minQuantity).toBe(1);
});

test("item custom attributes", () => {
  const item = new Item(id, name, price, 5, 15);

  expect(item.maxQuantity).toBe(15);
  expect(item.minQuantity).toBe(5);
});
