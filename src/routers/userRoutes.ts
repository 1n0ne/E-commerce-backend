import { activateUser, banUser, changeUserRole, deleteSingleUser, findUserByid, forgetPassword, getAllUsers, registerUser, restPassword, unBanUser, updateUser } from '../controllers/userController'
import { isAdmin, isLoggedOut, isLoggedin } from '../middlewares/isLoggedin'

import { Router } from 'express'
import { UserInfoValidation } from '../middlewares/validation'
import { runValidation } from '../middlewares'
import { uploadImage } from '../middlewares/uploadImage'

const router = Router()

router.post('/process-register', uploadImage.single('image'), isLoggedOut, UserInfoValidation, runValidation, registerUser)

router.post('/activate', isLoggedOut, activateUser)
router.get('/:id', isLoggedin, findUserByid)
router.put('/update/:id', isLoggedin, updateUser)

router.get('/', isLoggedin, isAdmin, getAllUsers)
router.put('/:id/ban', isLoggedin, isAdmin, banUser)
router.put('/:id/unban', isLoggedin, isAdmin, unBanUser)
router.delete('/:id', isLoggedin, isAdmin, deleteSingleUser)
router.put('/change-role/:id', isLoggedin, isAdmin, changeUserRole)
router.post('/forget-password', isLoggedOut, forgetPassword)
router.put('/rest-password', isLoggedOut, restPassword)

export default router
