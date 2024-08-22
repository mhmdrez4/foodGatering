import express from "express";
import { createOrder, deleteOrder, getOrder} from "../controllers/orderController";
import { verifyAddOrder } from "../middlewares/verifyOrder";
import { verifyToken } from "../middlewares/authorization";

const app = express()

app.use(express.json())

app.get(`/`, [verifyToken],getOrder)
app.post(`/`, [verifyToken, verifyAddOrder],createOrder)
app.delete(`/:id`, [verifyToken],deleteOrder)

export default app