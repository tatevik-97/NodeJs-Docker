import  { Request, Response } from "express";
import {PostsService} from "../../services/Posts";

export const allPosts = async (req: Request, res: Response) => {
    const allPosts = PostsService.getAllPosts();
    // res.json(allPosts)
    res.json({message: 'Questions route'})

}
