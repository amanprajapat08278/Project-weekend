const jwt = require("jsonwebtoken")


const adminAuthentication = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token) {return res.status(400).send({ status: false, message: "Token is mendatory !" }) }

        token = token.split(" ")[1]

        jwt.verify(token, "admin vaccine", (err, decode) => {
            if (err) { return res.status(401).send({ status: false, message: err.message }) }
            else {
                req.decode = decode
                next()
            }
        })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}






module.exports = { adminAuthentication }