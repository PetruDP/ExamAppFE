import { store } from "../app/store";
import { setMoviesList } from "../features/movies/moviesSlice";
import { setToken } from "../features/auth/authSlice";
import { baseUrl, reqWithAuth } from "./config"
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
    const req = reqWithAuth(`${baseUrl}/movies`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
    const res = await fetch(req);
    const json = await res.json();
    console.log(json);
    return { status: res.status, ok: res.ok }
}

// [USER] Read user --> User reads his profile
export const GETUser = async (payload: { username: string }) => {
    const req = reqWithAuth(`${baseUrl}/user/profile/${payload.username}`);
    const res = await fetch(req);
    return await res.json();
}

// [USER] Update User --> User updates his profile (username/password)
interface POSTUserUpdateUser {

}
export const POSTUserUpdateUser = async (payload: POSTUserUpdateUser) => {
    const req = reqWithAuth(`${baseUrl}/admin/update`);
    const res = await fetch(req);
}

// [ADMIN] Update User --> Admin updates a user's fields
interface POSTAdminUpdateUserI {

}
export const POSTAdminUpdateUser = async (payload: POSTUpdateUserI) => {
    const req = reqWithAuth(`${baseUrl}/admin/update`);
    const res = await fetch(req);
}

// [ADMIN] Read All Users --> Admin receives a list of all users
export const GETUsers = async () => {
    const req = reqWithAuth(`${baseUrl}/admin/getUsers`);
    const res = await fetch(req);
    return await res.json();
}

// 