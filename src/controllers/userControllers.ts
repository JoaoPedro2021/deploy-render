import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

import { createUser } from "../services/userServices";
import { loginUser } from "../services/loginService";
import { redefinePassword, resetPassword } from "../services/redefinePassword";
import { getImgCloudinary, uploadCloudinary } from "../services/uploadCloudinary";


export class UserController {
    async create(req: Request, res: Response) {
        const user = await createUser(req.body)

        return res.send(user)
    }

    async login(req: Request, res: Response) {
        const userLogin = await loginUser(req.body)

        return res.json(userLogin)
    }

    async forgotPassword(req: Request, res: Response) {
        const { email } = req.body

        const redefine = await redefinePassword(email)

        return res.json(redefine)
    }

    async resetPassword(req: Request, res: Response) {
        const { id }: any = req.user

        const reset = await resetPassword(req.body, id)

        return res.json(reset)

    }


    async uploadCloudinary(req: Request, res: Response) {
        const { file } = req

        const imgUpload = await uploadCloudinary(file)

        return res.json(imgUpload)
    }


    async getImgCloudinary(req: Request, res: Response) {
        const { public_id } = req.params

        const getImageUrl = await getImgCloudinary(public_id)

        return res.json(getImageUrl)
    }
}   