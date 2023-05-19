import Express from "express"
import { Router } from "express"
const router = Router()
import controllers from "../controllers"

// crear un usuario
router.post("/create", controllers.User.createUser)
router.get("/getall", controllers.User.getUsers)
router.put("/update", controllers.User.updateUser)
router.delete("/delete", controllers.User.deleteUser)
router.get("/find", controllers.User.findUser)
export default router