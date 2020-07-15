const express = require("express");
const tripController = require("./controller");
const router = express.Router();
const { authenticate, authorize } = require("../../../middleware/auth");

//POST (PRIVATE - DRIVER)
router.post(
  "/",
  authenticate,
  authorize(["driver"]),
  tripController.createTrip
);

//GET trips
router.get("/", tripController.getTrips);

//GET Trip by Id
router.get("/:tripId", tripController.getTripById);

//DELETE
router.delete("/:tripId", tripController.deleteTrip);

//UPDATE
router.put(
  "/:tripId",
  authenticate,
  authorize(["driver"]),
  tripController.updateTrip
);

//PUT book-trip
router.put(
  "/book-trip/:tripId",
  authenticate,
  authorize(["passenger"]),
  tripController.bookTrip
);

//PUT finish trip
router.put(
  "/finish-trip/:tripId",
  authenticate,
  authorize(["driver"]),
  tripController.finishTrip
);

module.exports = router;
