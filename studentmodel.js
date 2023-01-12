const mongoose = require("mongoose")

const student = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        subject: {
            type: String,
            required: true,
            trim: true
        },
        marks: {
            type: Number,
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    }
)

module.exports = mongoose.model("Student", student)