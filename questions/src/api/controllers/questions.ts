import  { Request, Response } from "express";

export const questions = async (req: Request, res: Response) => {

    res.json({message: 'Questions route'})

}
