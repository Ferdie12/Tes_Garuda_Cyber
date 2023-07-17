import express from "express";
import auth from "../middleware/auth-middleware.js";
import Product from "../controllers/product.js";
import User from "../controllers/user.js";
import Voucher from "../controllers/voucher.js";
const router = express.Router();

// api user
router.post("/register", User.register);
router.post("/login", User.login);

// api product
router.get("/product", Product.getAll);
router.get("/product/:id", Product.getbyId);
router.post("/product/buy",auth, Product.buyProduct);

// api voucher
router.get('/voucher', Voucher.getVoucher);
router.get('/use', Voucher.useVoucher);

export default router;