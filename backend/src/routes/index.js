import express from "express";
import Product from "../controllers/product.js";
import User from "../controllers/user.js";
import Voucher from "../controllers/voucher.js";
const router = express.Router();

// api user
router.post("/api/register", User.register);
router.post("/api/login", User.login);

// api product
router.get("/product", Product.getAll);
router.get("/product/:id", Product.getbyId);

// api voucher
router.get('/api/voucher', Voucher.getVoucher);
router.get('/use', Voucher.useVoucher);

export default router;