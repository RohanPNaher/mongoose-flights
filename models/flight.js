import mongoose from "mongoose";

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/,
  },
  price: {
    type: Number,
    min: 0,
  }
}, {
  timestamps: true
})

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
  },
  tickets: [ticketSchema],
  menu: [{type: Schema.Types.ObjectId, ref: 'Meal'}],
}, {
  timestamps: true
})

const Flight = mongoose.model('Flight', flightsSchema)

export {
  Flight
}