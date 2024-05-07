import { body, validationResult } from "express-validator";

export const validateNewQuestion = [
    body('title')
        .trim()
        .isLength({min: 5, max: 50})
        .withMessage('Title must be between 5 and 50 characters'),

    body('description')
        .trim()
        .isLength({min: 5})
        .withMessage('Content must be at least 5 characters long'),

    body('tags')
        .optional({ checkFalsy: true })
        .isArray()
        .withMessage('Tags must be an array'),

    body('tags.*')
        .isString()
        .withMessage('Each tag must be a string'),

    body('votes')
        .optional({ checkFalsy: true })
        .isInt({ min: 0 })
        .withMessage('Votes must be a non-negative integer'),

    body('answers')
        .optional({ checkFalsy: true })
        .isArray()
        .withMessage('Answers must be an array'),

    body('answers.*.user')
        .isString()
        .withMessage('Each answer user must be a string'),

    body('answers.*.text')
        .isString()
        .withMessage('Each answer text must be a string'),

    body('author')
        .trim()
        .isString()
        .withMessage('Author must be a string')
];

