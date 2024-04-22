import express from 'express'
import {signUp} from '../controllers/signup'
import {signIn} from '../controllers/signin'
import {currentUser} from '../controllers/currentUser'
import {validateSignUp} from "../../validate";
import {validateRequest} from "@tatev-97/common";

const router = express.Router()

router.get('/api/users/currentuser', currentUser)

router.post('/api/users/signin', validateSignUp, validateRequest, signIn)

router.post('/api/users/signup', validateSignUp, validateRequest, signUp)


export {router}
