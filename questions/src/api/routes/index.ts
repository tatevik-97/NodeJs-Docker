import express from 'express'
import {questions} from '../controllers/questions'

const router = express.Router()

router.get('/api/questions', questions)


export {router}
