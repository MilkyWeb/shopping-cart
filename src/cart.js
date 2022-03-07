import Item from "./item";
import Entry from "./entry";
import CartStorage from "./storage";

class Cart {
  constructor() {
    this._entries = Object.create(CartStorage);
  }

  get items() {
    return this._entries;
  }

  add(newItem) {
    if (!(newItem instanceof Item)) throw new Error("Invalid Item");

    const entry = new Entry(newItem);
    this._entries[newItem.id] = entry;
    return entry;
  }

  remove(itemId) {
    if (!(itemId in this._entries)) throw new Error("Item not found");

    const entry = this._entries[itemId];
    delete this._entries[itemId];

    return entry.item;
  }

  subTotal() {
    return Object.values(this._entries).reduce(
      (accum, entry) => accum + entry.total(),
      0
    );
  }
}

export default Cart;
