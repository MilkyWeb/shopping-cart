class Entry {
  constructor(item) {
    this._item = item;
    this._qty = 1;

    return new Proxy(this, {
      get(entry, field) {
        if (field in entry._item) return entry._item[field];

        return Reflect.get(...arguments);
      },
    });
  }

  get item() {
    return this._item;
  }

  get quantity() {
    return this._qty;
  }

  increaseQuantity(value = 1) {
    const newValue = this._validateInputQty(value);

    this.setQuantity(this._qty + newValue);
  }

  decreaseQuantity(value = 1) {
    const newValue = this._validateInputQty(value);

    this.setQuantity(this._qty - newValue);
  }

  setQuantity(value) {
    const newQty = this._validateInputQty(value);

    this._qty =
      newQty > this.item.maxQuantity
        ? this.item.maxQuantity
        : newQty < this.item.minQuantity
        ? this.item.minQuantity
        : newQty;
  }

  total() {
    return this.item.price * this.quantity;
  }

  _validateInputQty(value) {
    const newValue = parseFloat(value);
    if (isNaN(newValue)) throw new Error("Invalid quantity value");

    return newValue;
  }
}

export default Entry;
