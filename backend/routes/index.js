import express from "express";
import Product from "../controllers/product.js";
import Voucher from "../controllers/voucher.js";
const router = express.Router();

router.get("/product", Product.getAll);
router.get("/product/:id", Product.getbyId);
router.get('/voucher', Voucher.getVoucher);
router.get('/use', Voucher.useVoucher);

export default router;