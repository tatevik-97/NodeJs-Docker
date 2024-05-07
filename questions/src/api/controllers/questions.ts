import  { Request, Response } from "express";
import {Questions} from "../../models/questions";
import {NotFoundError} from "@tatev-97/common";

export const getQuestions = async (req: Request, res: Response) => {
    try{
        const question = await Questions.findById(req.params.id)
        if(!question){
            throw new NotFoundError()
        }
        res.send(question)
    }catch(err){
        throw err
    }

}
export const addQuestions = async (req: Request, res: Response) => {

    const {title,
        description,
        tags,
        votes,
        answers,
        author} = req.body;


    const question = Questions.build({
        title,
        description,
        tags,
        votes,
        answers,
        author
    })
    await question.save()
    res.status(201).send(question)


}
