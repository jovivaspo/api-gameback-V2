const {Router} = require('express')
const userController = require('../controllers/userController')

const router = Router()

router.route('/')
.get(userController.listUsers)

router.route('/delete/:id')
.delete(userController.deleteUser)

router.route('/create')
.post(userController.createUsers)

router.route('/login')
.post(userController.login)




module.exports = router