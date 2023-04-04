import { BadRequestError } from "../helpers/api-error";
import { UserBody } from "../interface/email.interface";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";


export const createUser = async (body: UserBody) => {
    const { name, email, password } = body;

    const user = await userRepository.findOneBy({ email })

    if (user) {
        throw new BadRequestError("Email alaready exists!")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
        name,
        email,
        password: hashedPassword,
    })

    await userRepository.save(newUser);

    const { password: _, ...userWithoutPassword } = newUser

    return userWithoutPassword
}