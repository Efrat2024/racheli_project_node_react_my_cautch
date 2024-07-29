const express = require("express");
const router = express.Router();
const shopingCartController = require("../controllers/shopingCartController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);
router.get("/", shopingCartController.getAllProducts);
router.get("/:id", shopingCartController.getProductById);
router.post("/", shopingCartController.createNewProduct);
router.delete("/:id", shopingCartController.deleteProduct);
router.put("/:id", shopingCartController.updateProduct);

module.exports = router;