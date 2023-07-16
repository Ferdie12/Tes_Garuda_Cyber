import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import errorMiddleware from "../middleware/error-middleware.js";
import routes from "../routes/index.js";
import prisma from "./database.js";

export const web = express();
web.use(cors());
web.use(morgan("dev"));
web.use(express.json());
web.use(express.urlencoded({extended: false}));
web.use(routes);

web.use(errorMiddleware);

const check = await prisma.product.findMany();
const today = new Date();
const lastMonth = new Date(today);
lastMonth.setMonth(lastMonth.getMonth() - 1);
const month = lastMonth.getMonth() + 1; 
await prisma.voucher.updateMany({
    data: {
        exp: lastMonth
    },
    where: {
        OR: [
            { id: 9 },
            { id: 10 }
        ]
    }
});

if(check.length == 0){
    await prisma.product.createMany({
        data: [
            {
                name: "laptop",
                price: 2100000
            },
            {
                name: "notebook",
                price: 1600000
            },
            {
                name: "monitor",
                price: 700000
            }
        ]
    })
}

export default web;
