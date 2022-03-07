class Item {
  constructor(id, name, price, minQuantity = 1, maxQuantity = 100) {
    this.id = id;
    this.name = name;
    this._maxQuantity = maxQuantity;
    this._minQuantity = minQuantity;

    const newPrice = parseFloat(price);
    if (isNaN(newPrice) || newPrice < 0) throw new Error("Invalid price");
    this._price = newPrice;
  }

  get price() {
    return this._price;
  }

  get minQuantity() {
    return this._minQuantity;
  }

  get maxQuantity() {
    return this._maxQuantity;
  }
}

export default Item;
