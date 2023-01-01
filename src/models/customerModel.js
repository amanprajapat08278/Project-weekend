const { Schema, model } = require("mongoose")

let customerSchema = new Schema({
    firstName: String,
    lastName: String,
    mobileNumber: String,
    DOB: String,
    emailID: String,
    address: String,
    customerID: String,
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"]
    }
}, { timesTemp: true }
)

module.exports = model("Customer", customerSchema)