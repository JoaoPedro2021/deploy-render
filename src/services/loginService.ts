import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { BadRequestError } from "../helpers/api-error";
import { Login } from "../interface/email.interface";
import { userRepository } from "../repositories/userRepository";

export const loginUser = async (body: Login) => {
    const { email, password } = body
    const user = await userRepository.findOneBy({ email })

    if (!user) {
        throw new BadRequestError("Email/Password is invalid")
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
        throw new BadRequestError("Email/Password is invalid")
    }

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_PASS ?? '',
        { expiresIn: '8h' }
    );

    return { accessToken: token }
}