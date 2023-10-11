import { Router } from "express";
import movieController from "../controllers/movieController.js";

const publicRoutes = Router();

//MOVIE ROUTES
publicRoutes.get("/movies");
publicRoutes.get("/movies/:movie_id");
publicRoutes.get("/movies/:query");

//SCREENING ROUTES
publicRoutes.get("/movies/:movie_id/screenings", movieController.getScreenings);
publicRoutes.get("/movies/:movie_id/screenings/:query");
publicRoutes.get("/movies/:movie_id/screenings/:screening_id");

//BOOKING ROUTES 
publicRoutes.post("/movies/:movie_id/screenings/:screening_id/booking");

export default publicRoutes;
