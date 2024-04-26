
import {body} from "express-validator";

export const validateNewPost = [
    body('title')
        .optional()
        .trim()
        .isLength({min:5,max:50})
        .withMessage('Title must be between 5 and 50 charters'),

    body('content')
        .optional()
        .trim()
        .isLength({min:5})
        .withMessage('Content must be at least 5 characters long'),
]
