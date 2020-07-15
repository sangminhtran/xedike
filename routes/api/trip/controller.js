const { Trip } = require("../../../models/Trip");
const { User } = require("../../../models/User");
const mongoose = require("mongoose");

//driver
module.exports.createTrip = (req, res, next) => {
  const driverId = req.user.id;
  console.log(driverId);
  const { locationFrom, locationTo, startTime, availableSeats, fee } = req.body;

  const newTrip = new Trip({
    driverId,
    locationFrom,
    locationTo,
    startTime,
    availableSeats,
    fee
  });

  newTrip
    .save()
    .then(trip => {
      res.status(200).json(trip);
    })
    .catch(err => res.json(err));
};

module.exports.getTrips = (req, res, next) => {
  Trip.find()
    .then(trips => {
      res.status(200).json(trips);
    })
    .catch(err => res.json(err));
};

module.exports.getTripById = (req, res, next) => {
  const { tripId } = req.params;
  Trip.findById(tripId)
    .populate("driverId", "avatar email _id")
    .then(trip => {
      res.status(200).json(trip);
    })
    .catch(err => res.json(err));
};

module.exports.deleteTrip = (req, res, next) => {
  const { tripId } = req.params;
  Trip.deleteOne({ _id: tripId })
    .then(result => res.status(200).json(result))
    .catch(err => res.json(err));
};

module.exports.updateTrip = (req, res, next) => {
  const { tripId } = req.params;
  const { locationFrom, locationTo, startTime, availableSeats, fee } = req.body;
  Trip.findById(tripId)
    .then(trip => {
      trip.locationFrom = locationFrom;
      trip.locationTo = locationTo;
      trip.startTime = startTime;
      trip.availableSeats = availableSeats;
      trip.fee = fee;

      return trip.save();
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => res.json(err));
};

module.exports.bookTrip = (req, res, next) => {
  const passengerId = req.user.id;
  const { numberOfBookingSeats } = req.body;
  console.log(passengerId, numberOfBookingSeats);
  const { tripId } = req.params;
  Trip.findById(tripId)
    .then(trip => {
      if (trip.availableSeats < numberOfBookingSeats)
        return Promise.reject({ status: 400, message: "Not enough seat" });

      const passenger = {
        passengerId,
        numberOfBookingSeats
      };
      trip.passengers.push(passenger);
      trip.availableSeats = trip.availableSeats - numberOfBookingSeats;

      return trip.save();
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => {
      if (!err.status) return res.json(err);
      res.status(err.status).json({ message: err.message });
    });
};

module.exports.finishTrip = (req, res, next) => {
  const { tripId } = req.params;
  Trip.findById(tripId)
    .then(trip => {
      trip.isFinished = true;
      return trip.save();
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => res.json(err));
};
