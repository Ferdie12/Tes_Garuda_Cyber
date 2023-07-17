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
web.use("/api", routes);

web.use(errorMiddleware);

const check = await prisma.product.findMany();

if(check.length == 0){
    await prisma.product.createMany({
        data: [
            {
                name: "Laptop",
                price: 2100000
            },
            {
                name: "Notebook",
                price: 1600000
            },
            {
                name: "Monitor",
                price: 700000
            }
        ]
    })
}

export default web;
