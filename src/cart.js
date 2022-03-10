import Item from "./item";
import Entry from "./entry";
import CartStorage from "./storage";
import EventEmiter from "./utils/events";

class Cart {
  constructor() {
    this._initEntries();
    this._emitter = new EventEmiter();
  }

  _initEntries() {
    this._entries = Object.create(CartStorage);
  }

  get items() {
    return this._entries;
  }

  add(newItem) {
    if (!(newItem instanceof Item)) throw new Error("Invalid Item");

    let entry;
    if (newItem.id in this.items) {
      entry = this.items[newItem.id];
      entry.increaseQuantity();
    } else {
      entry = new Entry(newItem);
      this._entries[newItem.id] = entry;
    }

    this.emit("addItem");
    return entry;
  }

  remove(itemId) {
    if (!(itemId in this._entries)) throw new Error("Item not found");

    const entry = this._entries[itemId];
    delete this._entries[itemId];

    this.emit("removeItem");
    return entry.item;
  }

  clear() {
    this._initEntries();
    this.emit("clear");
  }

  subTotal() {
    return Object.values(this._entries).reduce(
      (accum, entry) => accum + entry.total(),
      0
    );
  }

  emit(event) {
    this._emitter.emit(event, this);
    this._emitter.emit("change", this);
  }

  on(ev, fn) {
    this._emitter.addListener(ev, fn);
  }
}

export default Cart;
