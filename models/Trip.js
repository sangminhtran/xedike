const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  driverId: {type: mongoose.Types.ObjectId, ref: "User"},
  locationFrom: { type: String, required: true },
  locationTo: { type: String, required: true },
  startTime: { type: Date, required: true },
  //options: {type: [String], required: true},
  availableSeats: { type: Number, required: true },
  fee: Number,
  passengers: [
    {
      passengersId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      numberOfBookingSeats: Number
    }
  ],
  isFinished: {type: Boolean, default: false}
});

const Trip = mongoose.model("Trip", TripSchema, "Trip");

module.exports = {
  Trip,
  TripSchema
};
