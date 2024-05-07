import express from 'express'
import {addQuestions, getQuestions} from '../controllers/questions'
import {validateNewQuestion} from "../../validate";
import {currentUser} from "@tatev-97/common";

const router = express.Router()

router.get('/api/questions/:id', getQuestions)
router.post('/api/questions',validateNewQuestion, addQuestions)



export {router}
