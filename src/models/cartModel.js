const { default: mongoose } = require("mongoose")
const { Schema, model } = mongoose

const cardSchema = new Schema(
    {
        cardNumber: String,
        cardType: {
            type: String,
            enum: ["REGULAR", "SPECIAL"]
        },
        customerName: String,
        status: {
            type: String,
            default: "ACTIVE",
            enum: ["ACTIVE", "INACTIVE"]
        },
        vision: String,
        customerID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        }
        
    }
)

module.exports = model("Card", cardSchema)