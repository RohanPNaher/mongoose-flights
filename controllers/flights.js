import { Flight } from '../models/flight.js'
import { Meal } from '../models/meal.js'

function newFlight(req, res){
  res.render('flights/new', {
    title: 'Add Flight',
  })
}

function create(req, res){
  for (let key in req.body) {
    if(req.body[key] === ""){
      delete req.body[key]
    }
  }

  const flight = new Flight(req.body)
  
  flight.save(function(error) {
    // console.log(req.body)
    if (error) return res.redirect('/flights/new')
    res.redirect(`/flights/${flight._id}`);
  })
}

function index(req, res){
  Flight.find({}, (error, flights) => {
    res.render('flights/index', {
      flights: flights,
      title: 'All Flights',
    })
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('menu')
  .exec(function(err, flight) {
    Meal.find({_id: {$nin: flight.menu}}, (err, meals) => {
      res.render('flights/show', {
        title: 'Flight Detail', 
        flight: flight,
        meals: meals,
      })
    })
  })
}

function deleteFlight(req, res){
  Flight.findByIdAndDelete(req.params.id, (error, flight) => {
    res.redirect('/flights')
  })
}

function createTicket(req, res){
  Flight.findById(req.params.id, (error, flight) => {
    flight.tickets.push(req.body)
    flight.save(err => res.redirect(`/flights/${flight._id}`))
  })
}

function addMeal(req, res){
  Flight.findById(req.params.id, (error, flight) => {
    flight.menu.push(req.body.mealId)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  createTicket,
  addMeal,
}