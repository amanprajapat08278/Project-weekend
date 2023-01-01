const customerModel = require("../models/customerModel")
const crypto = require("crypto")
const { checkDate, validateEmail, checkPhone, isValidname, isValidAddress, isValidUUID } = require("../validation")





const createCustomer = async (req, res) => {

    try {
        let data = req.body;
        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "Please enter your details !" }) }
        
        let { firstName, lastName, mobileNumber, DOB, emailID, address, status } = data;

        if (!firstName) { return res.status(400).send({ status: false, message: "First name is mendatory !" }) }
        if (!isValidname(firstName)) { return res.status(400).send({ status: false, message: "Enter a valid first name !" }) }

        if (!lastName) { return res.status(400).send({ status: false, message: "Last name is mendatory !" }) }
        if (!isValidname(lastName)) { return res.status(400).send({ status: false, message: "Enter a valid last name !" }) }

        if (!mobileNumber) { return res.status(400).send({ status: false, message: "Mobile number is mendatory !" }) }
        if (!checkPhone(mobileNumber)) { return res.status(400).send({ status: false, message: "Enter a valid Mobile number !" }) }
        let dataByMobile = await customerModel.findOne({ mobileNumber: mobileNumber })
        if (dataByMobile) { return res.status(400).send({ status: false, message: "Mobile number must be unique !" }) }

        if (!DOB) { return res.status(400).send({ status: false, message: "DOB is mendatory !" }) }
        if (!checkDate(DOB)) { return res.status(400).send({ status: false, message: "Enter a valid DOB (Format : DD-MM-YYYY) !" }) }

        if (!emailID) { return res.status(400).send({ status: false, message: "Email Id is mendatory !" }) }
        if (!validateEmail(emailID)) { return res.status(400).send({ status: false, message: "Enter a valid Email Id !" }) }
        let dataByEmail = await customerModel.findOne({ emailID: emailID })
        if (dataByEmail) { return res.status(400).send({ status: false, message: "Email Id must be unique !" }) }

        if (!address) { return res.status(400).send({ status: false, message: "Address is mendatory !" }) }
        if (!isValidAddress(address)) { return res.status(400).send({ status: false, message: "Enter a valid address !" }) }

        let UUID = crypto.randomUUID()
        data.customerID = UUID

        if (!status) { return res.status(400).send({ status: false, message: "Status is mendatory !" }) }
        else {
            let enums = customerModel.schema.obj.status.enum
            if (!enums.includes(status)) { return res.status(400).send({ status: false, message: "Enter a valid status (ACTIVE||INACTIVE) !" }) }
        }

        let result = await customerModel.create(data)
        return res.status(201).send({ status: true, data: result })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}






const getCustomer = async (req, res) => {
    try {
        let data = req.query
        data.status = "ACTIVE"

        let result = await customerModel.find(data)
        if (result.length == 0) { return res.status(404).send({ status: false, message: "NO customer found !" }) }

        res.status(200).send({ status: false, data: result })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}






const deleteCustomer = async (req, res) => {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "Please enter your Mobile number or Email id !" }) }

        let { mobileNumber, emailID } = data

        if (mobileNumber) {
            if (!checkPhone(mobileNumber)) { return res.status(400).send({ status: false, message: "Enter a valid Mobile number !" }) }
        }
        if (emailID) {
            if (!validateEmail(emailID)) { return res.status(400).send({ status: false, message: "Enter a valid Email Id !" }) }
        }

        let coustmer = await customerModel.findOne(data)
        if (!coustmer) { return res.status(404).send({ status: false, message: "No customer found !" }) }
        if(coustmer.status=="INACTIVE"){ return res.status(404).send({ status: false, message: "Customer already deleted !" }) }

        await customerModel.findOneAndUpdate(data, { $set: { status: "INACTIVE" } })

        res.status(200).send({ status: true, message: "Customer Deleted !" })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}




module.exports = { createCustomer, getCustomer, deleteCustomer }