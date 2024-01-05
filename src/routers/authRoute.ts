import { login, logout } from '../controllers/authController'

import { Router } from 'express'
import { isLoggedin } from '../middlewares/isLoggedin'

const router = Router()

router.post('/login', login)
router.post('/logout', isLoggedin, logout)
export default router
