class Order {
    constructor(orderId, totalPrice, city, dateOfShipping, dateOfCreating, FourDigitOfCreditCart,
        address, userId, shoppingCartId) {
        this.orderId = orderId;
        this.totalPrice = totalPrice;
        this.city = city;
        this.address = address;
        this.dateOfShipping = dateOfShipping;
        this.dateOfCreating = dateOfCreating;
        this.FourDigitOfCreditCart = FourDigitOfCreditCart;
        this.userId = userId;
        this.shoppingCartId = shoppingCartId;
    }
}

module.exports = Order;