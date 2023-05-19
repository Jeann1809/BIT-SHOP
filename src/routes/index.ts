import { Router } from "express"
import Users from "./user.routes"
import Products from "./product.routes"
const router = Router()

// rutas del api

// rutas del usuario 
router.use("/user", Users)
router.use("/product", Products)

// rutas de los productos

export default router