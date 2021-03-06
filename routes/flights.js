import { Router } from 'express'
const router = Router()
import * as flightsCtrl from '../controllers/flights.js'

/* GET users listing. */
// GET - /flights/new
router.get('/new', flightsCtrl.new)
// GET - /flights/
router.get('/', flightsCtrl.index)
// GET - /flights/:id
router.get('/:id', flightsCtrl.show)

// POST - /flights
router.post('/', flightsCtrl.create)
// POST - /flights/:id/tickets
router.post('/:id/tickets', flightsCtrl.createTicket)
// POST - /flights/:id/meals
router.post('/:id/meals', flightsCtrl.addMeal)

// DELETE - -/flights/:id
router.delete('/:id', flightsCtrl.delete)

export {
  router
}
