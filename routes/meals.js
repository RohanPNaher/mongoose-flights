import { Router } from 'express'
const router = Router()
import * as mealsCtrl from '../controllers/meals.js'

// GET - /meals/new
router.get('/new', mealsCtrl.new)

//POST - /meals
router.post('/', mealsCtrl.create)

export {
  router
}