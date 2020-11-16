class Product {
    constructor(productId, name, price, image, categoryId) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.image = image;
        this.categoryId = categoryId;
    }
}

module.exports = Product;