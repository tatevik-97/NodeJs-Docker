import  { Request, Response } from "express";
import {PostsService} from "../../services/Questions";

export const questions = async (req: Request, res: Response) => {
    const allPosts = PostsService.getAllPosts();
    // res.json(questions)
    res.json({message: 'Questions route'})

}
