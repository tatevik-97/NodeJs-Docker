import  { Request, Response } from "express";
import {Questions} from "../../models/questions";
import {NotFoundError} from "@tatev-97/common";
import { promises as fs } from 'fs';
import path from 'path';

const viewCountFilePath = path.join(__dirname, 'viewCount.json');

async function saveViewCount(viewCountData) {
    await fs.writeFile(viewCountFilePath, JSON.stringify(viewCountData, null, 2));
}

async function getViewCount() {
    try {
        const data = await fs.readFile(viewCountFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return {};
    }
}



export const getQuestions = async (req: Request, res: Response) => {
    try{
        const question = await Questions.findById(req.params.id)
        let viewCountData = await getViewCount();
        viewCountData[req.params.id] = (viewCountData[req.params.id] || 0) + 1;
        await saveViewCount(viewCountData);

        if(!question){
            throw new NotFoundError()
        }
        question.views = viewCountData[req.params.id];

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
