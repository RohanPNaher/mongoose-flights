import mongoose from "mongoose";

const Schema = mongoose.Schema

const flightsSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'],
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN'
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
    required: true,
  },
  departs: {
    type: Date,
    default: Date.now() + 365*24*60*60000,
  }
}, {
  timestamps: true
})

const Flight = mongoose.model('Flight', flightsSchema)

export {
  Flight
}