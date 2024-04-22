import {NextFunction, Request, Response} from "express";
import {NotFoundError} from "@tatev-97/common/build";

export const currentUserController = async (req: Request, res: Response) => {
    const user = req.currentUser;
    if(!user){
        throw new NotFoundError()
    }
    return res.send(user)
  }
