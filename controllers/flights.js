import { Flight } from '../models/flight.js'

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

function create(req, res) {
  for (let key in req.body) {
    if(req.body[key] === ""){
      delete req.body[key]
    }
  }

  const flight = new Flight(req.body)
  
  flight.save(function(err) {
    console.log(req.body)
    // console.log(req.body)
    if (err) return res.redirect('/flights/new')
    res.redirect('/flights')
  })
}

function index(req, res){
  Flight.find({}, (error, flights) => {
    res.render('flights/index', {
      flights: flights,
      title: 'All Flights'
    })
  })
}

export {
  newFlight as new,
  create,
  index,
}