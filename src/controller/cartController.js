const { isValidObjectId } = require("mongoose");
const cartModel = require("../models/cartModel");
const customerModel = require("../models/customerModel");
const { checkName } = require("../validation");





const createCart = async (req, res) => {
    try {

        let data = req.body;
        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "Please enter cart details !" }) }

        let { cardNumber, cardType, status, vision, customerID } = data

        if (!cardNumber) { return res.status(400).send({ status: false, message: "cardNumber is mendatory !" }) }
        let cartNumberUnique = await cartModel.findOne({ cardNumber: cardNumber })
        if (cartNumberUnique) { return res.status(400).send({ status: false, message: "cardNumber must be unique !" }) }

        if (!cardType) { return res.status(400).send({ status: false, message: "Card Type is mendatory !" }) }
        else {
            let enums = cartModel.schema.obj.cardType.enum
            if (!enums.includes(cardType)) { return res.status(400).send({ status: false, message: "Enter a valid cart type (REGULAR||SPECIAL) !" }) }
        }

        if (!status) { data.status = "ACTIVE" }
        else {
            let enums = customerModel.schema.obj.status.enum
            if (!enums.includes(status)) { return res.status(400).send({ status: false, message: "Enter a valid status (ACTIVE||INACTIVE) !" }) }
        }

        if (!vision || typeof (vision) != "string") { return res.status(400).send({ status: false, message: "Vision is mendatory && valid !" }) }

        if (!customerID) { return res.status(400).send({ status: false, message: "customerID is mendatory !" }) }
        if (!isValidObjectId(customerID)) { return res.status(400).send({ status: false, message: "Enter a valid customerID !" }) }
        let dataByCusId = await cartModel.findOne({ customerID: customerID })
        if (dataByCusId) { return res.status(400).send({ status: false, message: "Customer Id must be unique !" }) }

        let customer = await customerModel.findOne({ _id: customerID })
        if (!customer) { return res.status(400).send({ status: false, message: "No coustomer exits by this customerId !" }) }

        data.customerName = customer.firstName + " " + customer.lastName

        let result = await cartModel.create(data)
        res.status(201).send({ status: true, data: result })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}





const getCart = async (req, res) => {

    try {
        let data = req.query
        let result = await cartModel.find(data)
        if (result.length == 0) { return res.status(404).send({ status: false, message: "NO card found !" }) }
        res.status(200).send({ status: false, data: result })
    } catch (err) {
        res.status(500).send({ status: true, message: err.message })
    }
}




module.exports = { createCart, getCart }