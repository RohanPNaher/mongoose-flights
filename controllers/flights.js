import { Flight } from '../models/flight.js'

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight',
  })
}

function create(req, res) {
  for (let key in req.body) {
    if(req.body[key] === ""){
      delete req.body[key]
    }
  }

  const flight = new Flight(req.body)
  
  flight.save(function(error) {
    // console.log(req.body)
    if (error) return res.redirect('/flights/new')
    res.redirect('/flights')
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

function show(req, res){
  Flight.findById(req.params.id, (error, flight) => {
    res.render('flights/show', {
      flight: flight,
      error: error,
      title: "Flight Details",
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

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  createTicket,
}