import { Router } from "express";
import userController from "../controllers/userController.js";
import bookingController from "../controllers/bookingController.js";
const privateRoutes = Router();

privateRoutes.get("/user", userController.GetAll);
privateRoutes.patch("/user");
privateRoutes.get("/user/bookings");
privateRoutes.delete("/user/bookings/:booking_id",bookingController.delBooking);

export default privateRoutes;
