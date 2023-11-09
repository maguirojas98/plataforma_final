// RUTAS A LAS PANTALLAS 

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Plataforma from "./pages/Plataforma";
import SingUp from "./pages/Singup";
import Login from "./pages/login";
import Player from "./pages/Player";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import UserLiked from "./pages/UserLiked";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/singup" element={<SingUp />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/tv" element={<TVShows />} />
        <Route exact path="/mylist" element={<UserLiked />} />
        <Route exact path="/" element={<Plataforma />} />
      </Routes>
    </BrowserRouter>
  );
}