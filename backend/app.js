import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/index.js"
import prisma from "./prisma/config.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(routes);

// 404 middleware
app.use((req,res,next) => {
    try {
        return res.status(404).json({
            status: false,
            message: "salah link cuy"
        })
    } catch (error) {
        next(error)
    }
})

// 500 middleware
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({
        status: false,
        message: err.message
    });
});

const check = await prisma.product.findMany();

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

app.listen(5000, () => console.log("Server running on port 5000"))
