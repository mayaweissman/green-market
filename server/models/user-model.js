class User {
    constructor(userId, firstName, lastName, email, idNumber, password, 
        city, address,role) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.idNumber = idNumber;
        this.city = city;
        this.address = address;
        this.role = role;
    }
}

module.exports = User;