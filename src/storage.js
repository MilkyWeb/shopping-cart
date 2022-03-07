const CartStorage = {};
Object.defineProperty(CartStorage, "length", {
  get() {
    return Object.values(this).length;
  },
});
Object.defineProperty(CartStorage, "count", {
  get() {
    return Object.values(this).reduce(
      (accum, entry) => accum + entry.quantity,
      0
    );
  },
});

export default CartStorage;
