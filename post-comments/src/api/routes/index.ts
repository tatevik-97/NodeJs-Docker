import express from 'express'
import {allPosts} from '../controllers/allPosts'

const router = express.Router()

router.get('/api/post-comments', allPosts)


export {router}
