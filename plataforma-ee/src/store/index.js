//ACA SE CONECTA Y USA LA API

import {
    configureStore,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import axios from "axios";
//import { API_KEY, TMBD_BASE_URL } from "../utils/constants.js";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("plataforma/genres", async () => {
  const {
    data: {genres}
  } = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=cf161086749eac1388bb66692fae9307`
  ); 
  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
      const movieGenres = [];
      movie.genre_ids.forEach((genre) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movieGenres.push(name.name);
      });
      if (movie.backdrop_path){
        moviesArray.push({
          id: movie.id,
          name: movie?.original_name ? movie.original_name : movie.original_title,
          image: movie.backdrop_path,
          genres: movieGenres.slice(0, 3),
        });
    }
    });
  };

const getRawData = async (api, genres, paging = false) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
      const {
        data: { results },
      } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      createArrayFromRawData(results, moviesArray, genres);
    }
    //console.log({moviesArray});
    return moviesArray;
  };

  export const fetchDataByGenre = createAsyncThunk(
    "plataforma/genre",
    async ({ genre, type }, thunkAPI) => {
      const {
        plataforma: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `https://api.themoviedb.org/3/discover/${type}?api_key=cf161086749eac1388bb66692fae9307&with_genres=${genre}`,
        genres
      );
    }
  );

export const fetchMovies = createAsyncThunk(
    "plataforma/trending",
    async ({ type }, thunkApi) => {
      const {
        plataforma: { genres },
      } = thunkApi.getState();
      return getRawData(
        `https://api.themoviedb.org/3/trending/${type}/week?api_key=cf161086749eac1388bb66692fae9307`,
        genres,
        true
      );
    }
  );

  export const getUsersLikedMovies = createAsyncThunk(
    "plataforma/getLiked",
    async (email) => {
      const {
        data: { movies },
      } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
      return movies;
    }
  );

  export const removeMovieFromLiked = createAsyncThunk(
    "plataforma/deleteLiked",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put("http://localhost:5000/api/user/remove", {
        email,
        movieId,
      });
      return movies;
    }
  );


const PlataformaSlice = createSlice({
  name: "Plataforma",
  initialState,
  extraReducers: (builder) => {
   builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
    });
    builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    plataforma: PlataformaSlice.reducer,
  },
});

