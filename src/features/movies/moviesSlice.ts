import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieI } from "../../types/types";

interface InitialState {
    moviesList: MovieI[];
}

const initialState: InitialState = {
    moviesList: []
}

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMoviesList(state, action: PayloadAction<MovieI[]>){
            state.moviesList = [...action.payload];
        }
    }
});

export const { setMoviesList } = moviesSlice.actions;
export default moviesSlice.reducer;