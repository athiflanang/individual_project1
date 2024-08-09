const router = require("express").Router()
const UserController = require("../controller/UserController")
const MonsterController = require("../controller/MonsterController")
const BookmarkController = require("../controller/BookmarkController")
const ImageUrlController = require("../controller/ImageController")
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")
const errorHandler = require("../middleware/errorHandlers")
const upload = require("../helper/multer")

//login
router.post('/login', UserController.login)
router.post('/google-login', UserController.googleAuth)
router.post('/register', UserController.register)

router.use(authentication)

//user
router.post('/addUser', authorization, UserController.addUser)

//monster
router.get('/monster', MonsterController.getAllMonster)
router.get('/monster/:id', MonsterController.findMonsterById)

//bookmark
router.get('/bookmark', BookmarkController.getAllBookmark)
router.post('/bookmark/:id', BookmarkController.addBookmark)
router.delete('/bookmark/:id', BookmarkController.deleteBookmark)

//upload image
router.post('/upload', upload.single("img"), ImageUrlController.InsertImage)

//gemini ai
router.post('/gemini/:id', MonsterController.GoogleGenerativeAI)

//error
router.use(errorHandler)

module.exports = router