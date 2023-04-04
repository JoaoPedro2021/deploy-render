import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError, UnauthorzedError } from "../helpers/api-error";
import { userRepository } from "../repositories/userRepository";

type JwtPayload = {
    id: string
}


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        throw new UnauthorzedError("Not authorized")
    }
    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload

    const user = await userRepository.findOneBy({ id })

    if (!user) {
        throw new BadRequestError("User is not exists")
    }

    const { password: _, ...loggedUser } = user

    req.user = loggedUser;

    next();
}