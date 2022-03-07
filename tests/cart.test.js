import { Cart, Item } from "../src";

const itemId = "p1";
const name = "Playera";
const price = 150;

test("Init cart", () => {
  const cart = new Cart();

  expect(cart.items.length).toBe(0);
  expect(cart.subTotal()).toBe(0);
});

test("Cart add item", () => {
  const cart = new Cart();

  const item = new Item(itemId, name, price);
  cart.add(item);

  expect(cart.items.length).toBe(1);
  expect(cart.items[itemId].name).toBe(name);
  expect(cart.items[itemId].price).toBe(price);
  expect(cart.items[itemId].quantity).toBe(1);
  expect(cart.items[itemId].total()).toBe(price);
  expect(cart.subTotal()).toBe(price);
});

test("Cart increase item quantity", () => {
  const cart = new Cart();

  const item = new Item(itemId, "Playera", price);
  cart.add(item);
  cart.items[itemId].increaseQuantity();

  expect(cart.items.length).toBe(1);
  expect(cart.items.count).toBe(2);
  expect(cart.items[itemId].quantity).toBe(2);
  expect(cart.subTotal()).toBe(price * 2);
});

test("Cart add many items", () => {
  const cart = new Cart();

  const item1 = new Item(itemId, name, price);
  const item2 = new Item("p2", name, price + 15);
  cart.add(item1);
  cart.add(item2);

  expect(cart.items.length).toBe(2);
  expect(cart.items.count).toBe(2);
  expect(cart.items[itemId].price).toBe(price);
  expect(cart.items["p2"].price).toBe(price + 15);
  expect(cart.subTotal()).toBe(price + price + 15);
});

test("Cart add many items change quantity", () => {
  const cart = new Cart();

  const item1 = new Item(itemId, name, price);
  const item2 = new Item("p2", name, price + 15);
  cart.add(item1);
  cart.add(item2);
  cart.items[itemId].increaseQuantity();
  cart.items["p2"].setQuantity(3);

  expect(cart.items.length).toBe(2);
  expect(cart.items.count).toBe(5);
  expect(cart.items[itemId].total()).toBe(price * 2);
  expect(cart.items["p2"].total()).toBe((price + 15) * 3);
  expect(cart.subTotal()).toBe(price * 2 + (price + 15) * 3);
});

test("Cart decrease item quantity", () => {
  const cart = new Cart();

  const item = new Item(itemId, name, price);
  cart.add(item);
  cart.items[itemId].setQuantity(5);
  cart.items[itemId].decreaseQuantity();

  expect(cart.items.length).toBe(1);
  expect(cart.items.count).toBe(4);
  expect(cart.items[itemId].quantity).toBe(4);
  expect(cart.subTotal()).toBe(price * 4);
});

test("Cart delete item", () => {
  const cart = new Cart();

  const item = new Item(itemId, name, price);
  cart.add(item);

  expect(cart.items.length).toBe(1);
  expect(cart.items.count).toBe(1);
  expect(cart.subTotal()).toBe(price);

  const deleted = cart.remove(item.id);

  expect(cart.items.length).toBe(0);
  expect(cart.items.count).toBe(0);
  expect(cart.subTotal()).toBe(0);
  expect(deleted).toBe(item);
});
