import  Express  from "express"
import path from "path"
import cors from "cors"
import foodRoute from "./routes/foodRoutes"
import OrderRoute from "./routes/orderRoutes"
import AdminRoute from "./routes/adminRoutes"


const app = Express()
const PORT: number = 8000

app.use(cors())

app.use(`/food`, foodRoute)
app.use(`/order`, OrderRoute)
app.use(`/admin`, AdminRoute)
app.use(`/public`, Express.static(path.join(__dirname, `public`)))
app.listen(PORT, () => console.log(`Server Egg Farm run on port ${PORT}`))