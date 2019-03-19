const express = require("express");
const router = express.Router({ mergeParams: true});
const {showHousing, deleteHousing, getHousing, createHousing} = require("../handlers/housing");

router.route("/")
    .get(showHousing)
    .post(createHousing);
router.route("/:housing_id")
    .get(getHousing)
    .delete(deleteHousing);
module.exports = router;