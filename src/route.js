const express = require("express")
const router = express.Router()
const cartController = require("./controller/cartController")
const customerController = require("./controller/customerController")

router.post("/customer/create", customerController.createCustomer)
router.get("/customer/get", customerController.getCustomer)
router.delete("/customer/delete", customerController.deleteCustomer)

router.post("/cart/create", cartController.createCart)
router.get("/cart/get", cartController.getCart)

module.exports = router