import React from "react";
import { useSelector } from "react-redux";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { path } from "../utils";
import ProtectedRoute from "../hoc/authentication.jsx";

import Home from "../components/views/home/home.jsx";
import Price from "../components/views/detail/price.jsx";
import Partner from "../components/views/detail/partner.jsx";
import Movies from "../components/views/home/movies.jsx";
import Auth from "../components/views/auth/Auth.jsx";
import Movie from "../components/views/Movie/movie.jsx";
import Booking from "../components/views/booking/booking.jsx";
import BookingTwo from "../components/views/booking/bookingStageTwo.jsx";
import ScreeningMovie from "../components/views/screeningMovie/screeningMovie.jsx";
import RootLayout from "../containers/RootLayout";

const System = () => {
  const systemMenuPath = path.systemMenuPath;
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to={systemMenuPath} replace />} />
        <Route path="login" element={<Auth />} />
        <Route path="home" element={<Home />} />
        <Route path="movie/:id" element={<Movie />} />
        <Route
          path="booking/:id"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
        <Route
          path="booking2/:id"
          element={
            <ProtectedRoute>
              <BookingTwo />
            </ProtectedRoute>
          }
        />
        <Route path="screeningMovie" element={<ScreeningMovie />} />
        <Route path="Movies" element={<Movies />} />
        <Route path="Price" element={<Price />} />
        <Route path="Partner" element={<Partner />} />
        <Route path="*" element={<Navigate to={systemMenuPath} replace />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default System;
