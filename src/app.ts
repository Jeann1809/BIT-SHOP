import Express from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes/index"
import {connectDB} from "./database"

// crear instancia de express
const app = Express()

// traer el puerto de las variables de entorno 
dotenv.config()

// conexion base de datos 
connectDB()


// establecer el puerto en el cual se ejecuta el API
const port = process.env.PORT || 3200

// establecer usos de express
app.use(Express.json())

// establecer las rutas a utilizar en el api
app.use("/api", apiRoutes)

// ejecucion del api
app.listen(port, ()=> console.log(`Api is running in port ${port}`))