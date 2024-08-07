const router = require("express").Router()
const UserController = require("../controller/UserController")
const MonsterController = require("../controller/MonsterController")
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")
const errorHandler = require("../middleware/errorHandlers")
const upload = require("../helper/multer")

//login
router.post('/login', UserController.login)
router.post('/register', UserController.register)

router.use(authentication)

//user
router.post('/addUser', authorization, UserController.addUser)
//monster
router.get('/monster', MonsterController.getAllMonster)
router.get('/monster/:id', MonsterController.findMonsterById)
router.post('/bookmark/:id', MonsterController.addBookmark)
router.delete('/bookmark/:id', MonsterController.deleteBookmark)

//error
router.use(errorHandler)

module.exports = router