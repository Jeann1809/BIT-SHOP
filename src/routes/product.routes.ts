import Express from "express"
import { Router } from "express"
const router = Router()
import controllers from "../controllers"

router.get("/getall", controllers.Product.getProducts)
router.post("/create", controllers.Product.createProduct)
router.put("/update", controllers.Product.updateProduct)
router.delete("/delete", controllers.Product.deleteProduct)
router.get("/bill", controllers.Product.factura)

export default router