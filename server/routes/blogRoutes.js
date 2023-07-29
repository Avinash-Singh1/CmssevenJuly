const express = require("express");
const { getContact, createContact, upDate, deleteContact } = require("../controllers/contactControllers");
const router = express.Router();

router.route("/").get(getContact).post(createContact);
// router.route("/").post(createContact);
router.route("/:id").put(upDate).delete(deleteContact);

// router.route("/:id").delete(deleteContact);

module.exports =router;
  