const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./apiRoutes.js");
const htmlRoutes = require("./htmlRoutes");

// API Routes
router.use("/api", apiRoutes);
router.use("/html", htmlRoutes);

router.get("*", (req,res)=> {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

module.exports = router;
