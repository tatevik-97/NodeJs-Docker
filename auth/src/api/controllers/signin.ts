import  { Request, Response } from "express";
import User from "../../models/UserModel";
import {BadRequestError} from "@tatev-97/common/build";
import {Password} from "../../services/Password";
import jwt from "jsonwebtoken";

export const signIn = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const existingUser = await User.findOne({email})
        if (!existingUser || !(await Password.compare(existingUser.password, password))) {
            throw new BadRequestError("Invalid credentials")
        }
        const token = jwt.sign({id: existingUser._id, email: existingUser.email}, process.env.JWT_KEY!)
        return res.status(200).json({token})
    } catch (err) {
        throw err
    }
}
