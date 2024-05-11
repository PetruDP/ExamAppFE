import { store } from "../app/store";
import { setMoviesList } from "../features/movies/moviesSlice";
import { setToken } from "../features/auth/authSlice";
import { baseUrl } from "./config"
// import { delay } from "./delay";

export const GETMovies = async () => {
    const res = await fetch(`${baseUrl}/movies`);
    const json = await res.json()
    store.dispatch(setMoviesList(json));
    return json
}

export const GETMovie = async (id: string) => {
    const res = await fetch(`${baseUrl}/movies/${id}`);
    return await res.json();
}

export interface Login_Register_Payload {
    username: string;
    password: string;
}
export const POSTRegister = async (payload: Login_Register_Payload ) => {
    console.log(payload);
    const res = await fetch(`${baseUrl}/register`);
    const { token } = await res.json() as { token: string };
    store.dispatch(setToken(token));
    return { status: res.status, ok: res.ok };
}

export const POSTLogin = async (payload: Login_Register_Payload) => {
    console.log(payload);
    const res = await fetch(`${baseUrl}/login`);
    const { token } = await res.json() as { token: string };
    store.dispatch(setToken(token));
    return { status: res.status, ok: res.ok };
}