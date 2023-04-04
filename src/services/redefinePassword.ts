import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { BadRequestError } from "../helpers/api-error";
import { userRepository } from "../repositories/userRepository";
import { sendEmail } from "../email/nodemail.utils";
import { ResetPassword } from "../interface/email.interface";


export const redefinePassword = async (email: string) => {

    const user = await userRepository.findOneBy({ email })

    if (!user) {
        throw new BadRequestError("User not found!")

    }

    const secret = process.env.JWT_PASS + user.password

    console.log(secret)

    const token = jwt.sign({ email: user.email, id: user.id }, secret, {
        expiresIn: "1h",
    });

    const subject = "Token para redifinir senha"

    const text = token

    const to = "jpss7693@gmail.com"

    try {
        await sendEmail({ subject, text, to })
        return {
            message: 'Email sended with success!'
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                message: error.message
            }
        }
    }
}


export const resetPassword = async (body: ResetPassword, id: string) => {
    const { token, password } = body

    const user = await userRepository.findOneBy({ id })

    if (!user) {
        throw new BadRequestError("User not found!")
    }

    const secret = process.env.JWT_PASS + user.password

    try {
        const verify = jwt.verify(token, secret)

        const newHashedPassword = await bcrypt.hash(password, 10);

        await userRepository.update({
            id: id
        }, {
            password: newHashedPassword
        })
        return { message: "Password updated!" }

    } catch (error) {
        throw new BadRequestError("Token invalid")
    }

}