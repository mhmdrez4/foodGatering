import express from "express"
import { verifyToken } from "../middlewares/authorization"
import { createFoods, dropFoods, getAllFoods, updateFoods } from "../controllers/foodControllers"
import uploadFile from "../middlewares/uploadImageOfEgg"
import { verifyAddFood, verifyEditFood } from "../middlewares/verifyFood"
const app = express()

app.use(express.json())
/** add middleware process to verify token */
app.get(`/`, [verifyToken], getAllFoods)

/** add middleware process to varify token, upload an image, and verify request data */
app.post(`/`, [verifyToken, uploadFile.single("image"), verifyAddFood], createFoods)

/** add middleware process to varify token, upload an image, and verify request data */
app.put(`/:id`, [verifyToken, uploadFile.single("image"), verifyEditFood], updateFoods)

/** add middleware process to verify token */
app.delete(`/:id`, [verifyToken], dropFoods)
export default app