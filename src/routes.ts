import { Request, Response, Router } from "express";
import { UserController } from "./controllers/userControllers";
import { authMiddleware } from "./middlewares/authMiddleware";
import { upload } from "./middlewares/multer";

const routes = Router()

routes.post("/user", new UserController().create)

routes.post("/login", new UserController().login)

routes.post("/forgot-password", new UserController().forgotPassword)

routes.post("/reset-password", authMiddleware, new UserController().resetPassword)

routes.post('/upload', upload.single('image'), new UserController().uploadCloudinary)


routes.get('/upload/:public_id', new UserController().getImgCloudinary)


export default routes;