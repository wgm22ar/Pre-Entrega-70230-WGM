const express = require("express"); 
const router = express.Router(); 


router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts"); 
})




module.exports = router; 