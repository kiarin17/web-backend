import getUsersList, {swGetUser} from './login-get.route'
import createTheUser, {swPostUser} from './login-post.route'
import { Request, Response } from 'express'

const express = require('express')

export const swLoginRouter = {
  "/login": {
    "get": {
      ...swGetUser
    },
    "post": {
      ...swPostUser
    }
  }
}
const router = express()
router.get('/', function (req: Request, res: Response){
  getUsersList(req, res)
})
router.post('/', function (req: Request, res: Response) {
  createTheUser(req, res)
})
export default router