import { store } from "../app/store";
import { setMoviesList } from "../features/movies/moviesSlice";
import { setToken } from "../features/auth/authSlice";
import { baseUrl } from "./config"
import { delay } from "./delay";

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

// AUTH -------------------------------------------------------------------------------------------------
export interface Login_Register_Payload {
    username: string;
    password: string;
}
// DONE!
export const POSTRegister = async (payload: Login_Register_Payload ) => {
    console.log(payload);
    const res = await fetch(`${baseUrl}/register`);
    const { token } = await res.json() as { token: string };
    if(res.ok) store.dispatch(setToken(token));
    return { status: res.status, ok: res.ok };
}
// DONE!
export const POSTLogin = async (payload: Login_Register_Payload) => {
    console.log(payload);
    const res = await fetch(`${baseUrl}/login`);
    const { token } = await res.json() as { token: string };
    if(res.ok) store.dispatch(setToken(token));
    return { status: res.status, ok: res.ok };
}

// TBD
export const POSTAddMovie = async (payload: { id: string }) => {
    console.log(payload);
    const res = await fetch(`${baseUrl}/movies`);
    await delay(1);
    const json = await res.json();
    console.log(json);
    return { status: res.status, ok: res.ok }
}