import express from 'express'
import {signUp} from '../controllers/signup'
import {signIn} from '../controllers/signin'
import {currentUserController} from '../controllers/currentUser'
 import {validateSignUp} from "../../validate";
import {validateRequest, currentUser} from "@tatev-97/common";

const router = express.Router()

router.get('/api/users/currentuser',currentUser, currentUserController)

router.post('/api/users/signin', validateSignUp, validateRequest, signIn)

router.post('/api/users/signup', validateSignUp, validateRequest, signUp)


export {router}
