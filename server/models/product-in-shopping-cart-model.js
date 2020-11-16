class ProductInShoppingCart {
    constructor(productInShoppingCartId, amount, price, productId, shoppingCartId) {
        this.productInShoppingCartId = productInShoppingCartId;
        this.amount = amount;
        this.price = price;
        this.productId = productId;
        this.shoppingCartId = shoppingCartId;
    }
}

module.exports = ProductInShoppingCart;