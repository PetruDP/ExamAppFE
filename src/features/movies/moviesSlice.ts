import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieI } from "../../types/types";
import { RootState } from "../../app/store";

interface InitialState {
    moviesList: MovieI[];
    myMovies: MovieI[];
}

const initialState: InitialState = {
    moviesList: [],
    myMovies: []
}

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMoviesList(state, action: PayloadAction<MovieI[]>){
            state.moviesList = [...action.payload];
        },
        setMyMovies(state, action: PayloadAction<MovieI[]>){
            state.myMovies = [...action.payload];
        }
    }
});

export const selectMoviesList = (state: RootState) => state.movies.moviesList;
export const selectMyMovies = (state: RootState) => state.movies.myMovies;

export const { setMoviesList, setMyMovies } = moviesSlice.actions;
export default moviesSlice.reducer;