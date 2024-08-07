const { where } = require('sequelize')
const { v2: cloudinary } = require('cloudinary')
const { Bookmark } = require('../models')
const axios = require('axios')

class MonsterController {
  static async getAllMonster(req, res, next) {
    try {
      const { data } = await axios.get(`https://mhw-db.com/monsters`)

      // console.log(data); //sucess get all data, uncomment for proof

      res.status(200).json({
        message: "Successfully get all article",
        data
      })
    } catch (error) {
      next(error)
    }
  }
  static async findMonsterById(req, res, next) {
    try {
      const { id } = req.params

      const { data } = await axios.get(`https://mhw-db.com/monsters/${id}`)

      // console.log(data); //sucess get data by id, uncomment for proof
      if (!data) {
        throw ({ name: "NotFound", id })
      }

      res.status(200).json({
        message: `Successfully find monster with id ${data.id}`,
        data
      })
    } catch (error) {
      next()
    }
  }

  static async addBookmark(req, res, next) {
    try {
      const { id } = req.params
      const { userId } = req.loginInfo
      const { data } = await axios.get(`https://mhw-db.com/monsters/${id}`)

      if (!data) {
        throw ({ name: "NotFound", id })
      }

      // const userId = req.user.id
      // console.log(userId, "<<<<<<< ini login info");

      const addBookmark = await Bookmark.create({
        userId,
        monsterId: id,
        monsterName: data.name
      })

      //console.log(addBookmark, "<<<< ini bookmark"); //success add bookmark, uncomment for proof

      res.status(201).json({
        message: "Successfully add bookmark",
        addBookmark
      })
    } catch (error) {
      next(error)
    }
  }

  static async deleteBookmark(req, res, next) {
    try {
      const { id } = req.params
      let findBookmark = await Bookmark.findByPk(id)

      if (!findBookmark) {
        throw ({ name: "NotFound", id })
      }

      const deleteBookmark = await Bookmark.destroy({
        where: {
          id
        },
      })

      res.status(200).json({
        message: `Successfully delete bookmark with id ${id}`,
        findBookmark
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MonsterController