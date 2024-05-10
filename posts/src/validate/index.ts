
import {body} from "express-validator";
import path from "path";

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

export const checkFileType = (file: Express.Multer.File, cb:any) => {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}
