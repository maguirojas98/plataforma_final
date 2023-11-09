import React from "react";
import CardSlider from "./CardSlider";

 export default function Slider({movies}){
    const getMoviesFromRange = (from, to) => {
        return movies.slice(from, to);
      };

    //console.log(movies);
    return <div>
    <CardSlider data={getMoviesFromRange(0, 10)} title="En Tendencia" />
    <CardSlider data={getMoviesFromRange(10, 20)} title="Nuevos lanzamientos" />
    <CardSlider
      data={getMoviesFromRange(20, 30)}
      title="Películas taquilleras"
    />
    <CardSlider
      data={getMoviesFromRange(30, 40)}
      title="Popular on EE"
    />
    <CardSlider data={getMoviesFromRange(40, 50)} title="Peliculas de Accion" />
    <CardSlider data={getMoviesFromRange(50, 60)} title="Épicas" />
  </div>

}
