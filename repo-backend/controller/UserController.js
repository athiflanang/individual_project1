const { compare } = require('../helper/bcrypt')
const { User } = require('../models')
const { signToken, verifiedToken } = require('../helper/jwt')
const { where } = require('sequelize')

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body
      const regisUser = await User.create({ username, email, password })

      res.status(201).json({
        message: "Succesfully create new user",
        regisUser
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { username, email, password } = req.body
      if (!username || !email || !password) throw { name: "InvalidLogin" }

      const loginUser = await User.findOne({
        where: {
          username,
          email
        }
      })

      if (!loginUser) throw { name: 'LoginError' }
      if (!compare(password, loginUser.password)) throw { name: 'LoginError' }

      const payload = {
        id: loginUser.id,
        email: loginUser.email,
        role: loginUser.role
      }

      const access_token = signToken(payload)
      res.status(200).json({
        message: "Success login",
        access_token
      })
    } catch (error) {
      next(error)
    }
  }

  static async addUser(req, res, next) {
    try {
      const { username, email, password } = req.body

      const newUser = await User.create({ username, email, password })

      const newVerifiedUser = [newUser.email, newUser.username]

      res.status(201).json({
        message: "Succesfully create new user",
        newVerifiedUser
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController