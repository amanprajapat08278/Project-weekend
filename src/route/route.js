const express = require("express")
const router = express.Router()
const user = require("../controller/userController")
const admin = require("../controller/adminController")
const auth = require("../middleware/auth")
const adminiAuth = require("../middleware/adminAuth")


//------------------- User APIs --------------------//

router.post("/user/resister", user.userResister)

router.post("/user/login", user.userLogin)

router.get("/user/:userId/time-slot", auth.authentication, auth.autherisation, user.getTimeSlots)

router.post("/user/:userId/vaccine-resistration", auth.authentication, auth.autherisation, user.vaccineResistration)

router.put("/user/:userId/vaccine-resistration", auth.authentication, auth.autherisation, user.updateResister)



//----------------- Admin APIs --------------------//

router.post("admin/login", admin.adminLogin)

router.post("/admin/slot-create", adminiAuth.adminAuthentication, admin.slotCreate)

router.get("/admin/totalUser", adminiAuth.adminAuthentication, admin.totalUser)

router.get("/admin/resisteredUser", adminiAuth.adminAuthentication, admin.reisteredslot)


//--------------------------------------------------//

router.all("/*", (req, res) => {
    res.status(400).send({ status: false, message: "URL is wrong" })
})


module.exports = router