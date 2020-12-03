const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./apiRoutes.js");
const htmlRoutes = require("./htmlRoutes");

// for routes starting with the path in first argument
router.use("/api", apiRoutes);
router.use("/html", htmlRoutes);

// send the react index.html template if route doesn't match either of the above
router.get("*", (req,res)=> {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

module.exports = router;
