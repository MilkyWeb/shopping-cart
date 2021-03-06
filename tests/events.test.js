import { jest } from "@jest/globals";
import { Cart, Item } from "../src";

function getItem() {
  return new Item("p1", "product name", 123);
}

describe("Event tests", () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
  });

  test("Test addItem event", () => {
    const item = getItem();
    const eventHandler = {
      handleAddItem: (c) => {
        expect(c.items["p1"].price).toBe(123);
      },
    };
    const spy = jest.spyOn(eventHandler, "handleAddItem");

    cart.on("addItem", eventHandler.handleAddItem);
    cart.add(item);

    expect(spy).toHaveBeenCalled();
  });

  test("Test removeItem event", () => {
    const item = getItem();
    const eventHandler = {
      handleRemoveItem: (c) => {
        expect(c.items.count).toBe(0);
      },
    };
    const spy = jest.spyOn(eventHandler, "handleRemoveItem");

    cart.on("removeItem", eventHandler.handleRemoveItem);
    cart.add(item);
    cart.remove(item.id);

    expect(spy).toHaveBeenCalled();
  });

  test("Test change event", () => {
    const item = getItem();
    const eventHandler = {
      handleAddItem: (c) => {
        expect(c.items["p1"].price).toBe(123);
      },
    };
    const spy = jest.spyOn(eventHandler, "handleAddItem");

    cart.on("change", eventHandler.handleAddItem);
    cart.add(item);

    expect(spy).toHaveBeenCalled();
  });

  test("Test clear event", () => {
    const item = getItem();
    const eventHandler = {
      handleClear: (c) => {
        expect(c.items.count).toBe(0);
      },
    };
    const spy = jest.spyOn(eventHandler, "handleClear");

    cart.on("clear", eventHandler.handleClear);
    cart.add(item);
    cart.clear();

    expect(spy).toHaveBeenCalled();
  });

  test("Test increase event", () => {
    const item = getItem();
    const eventHandler = {
      handleEvent: (c) => {
        expect(c.items.count).toBe(2);
      },
    };
    const spy = jest.spyOn(eventHandler, "handleEvent");

    cart.on("increaseQuantity", eventHandler.handleEvent);
    cart.add(item);
    cart.items["p1"].increaseQuantity();

    expect(spy).toHaveBeenCalled();
  });

  test("Test decrease event", () => {
    const item = getItem();
    const eventHandler = {
      handleEvent: (c) => {
        expect(c.items.count).toBe(2);
      },
    };
    const spy = jest.spyOn(eventHandler, "handleEvent");

    cart.on("decreaseQuantity", eventHandler.handleEvent);
    cart.add(item);
    cart.items["p1"].setQuantity(3);
    cart.items["p1"].decreaseQuantity();

    expect(spy).toHaveBeenCalled();
  });

  test("Test remove listener", () => {
    const item = getItem();
    const eventHandler = {
      handleAddItem: (c) => {
        expect(c.items.count).toBe(1);
      },
    };
    const spy = jest.spyOn(eventHandler, "handleAddItem");

    cart.on("change", eventHandler.handleAddItem);
    cart.add(item);
    expect(spy).toHaveBeenCalled();

    cart.off("change", eventHandler.handleAddItem);
    cart.clear();

    expect(spy).toHaveBeenCalledTimes(1);
    // expect(spy).not.toHaveBeenCalled();
  });
});
