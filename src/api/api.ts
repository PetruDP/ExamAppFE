import { store } from "../app/store";
import { setMoviesList, setMyMovies } from "../features/movies/moviesSlice";
import { setToken } from "../features/auth/authSlice";
import { baseUrl, reqWithAuth } from "./config"
import { delay } from "./delay";
import { MovieI, MovieStatus } from "../types/types";

export interface StatusData {
    status: number;
    ok: boolean;
}

export const GETMovies = async () => {
    const res = await fetch(`${baseUrl}/movie/top100`);
    const json = await res.json()
    if(res.ok) { 
        store.dispatch(setMoviesList(json)); 
        return json
    }
    else {
        return undefined
    }
}

export const GETMovie = async (id: string) => {
    const res = await fetch(`${baseUrl}/movie/${id}`);
    if(res.ok) {
        return await res.json();
    }
    else return undefined
}

// AUTH ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export interface Login_Register_Payload {
    username: string;
    password: string;
}
// DONE!
export const POSTRegister = async (payload: Login_Register_Payload) => {
    const res = await fetch(`${baseUrl}/authentication/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    const json = await res.json() as { token: string };
    if (res.ok) {
        store.dispatch(setToken(json.token));
    }
    console.log(json)
    return { status: res.status, ok: res.ok };
}
// DONE!
export const POSTLogin = async (payload: Login_Register_Payload) => {
    const res = await fetch(`${baseUrl}/authentication/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    const json = await res.json() as any;
    if (res.ok) store.dispatch(setToken(json.token));
    if(!res.ok){
        throw Error(json.error)
    }
    return { status: res.status, ok: res.ok };
}

// [USER] ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// [USER] ADdd movie to list reqeust
export const POSTAddMovie = async (payload: { id: string }) => {
    const req = reqWithAuth(`${baseUrl}/profile/add/${payload.id}`, {
        method: "POST",
        body: JSON.stringify(payload),
    }); 
    const res = await fetch(req);
    if(res.ok) return { status: res.status, ok: res.ok }
    else throw Error(`Failed to add movie`)
}

// [USER] Read user --> Returns user profile with movies list
export interface GETUserI {
    username: string;
    userMovies: {
        movie: MovieI
    }[]
}
export const GETUser = async (payload: { username: string }) => {
    const req = reqWithAuth(`${baseUrl}/profile/${payload.username}`);
    const res = await fetch(req);
    const json = await res.json() as any;
    if(res.ok) {store.dispatch(setMyMovies(json.userMovies.map((el: GETUserI["userMovies"][number]) => {
        return { ...el.movie }
        })))
        return json
    }
    else {
        throw Error(`Failed to fetch user profile: ${json.error}`)
    }

}

// [USER] Update User --> User updates his profile (username/password)
interface POSTUserUpdateUser {
    username?: string;
    oldPassword?: string;
    newPassword?: string;
}
export const POSTUserUpdateUser = async (payload: POSTUserUpdateUser) => {
    const req = reqWithAuth(`${baseUrl}/profile/update`, {
        method: "POST",
        body: JSON.stringify(payload)
    });
    const res = await fetch(req);
    const json = await res.json();
    if(res.ok) {
        store.dispatch(setToken(json.token))
        return { status: res.status, ok: res.ok } as StatusData
    }
    else {
        throw Error(`Failed to update user: ${json.error}`)
    }
}

// [USER] Remove Movie from List
export const DELETEUserMovie = async (payload: { movieId: string }) => {
    const req = reqWithAuth(`${baseUrl}/profile/remove/${payload.movieId}`, {
        method: "DELETE"
    }); 
    const res = await fetch(req);
    if(res.ok) return { status: res.status, ok: res.ok } as StatusData;
    else throw Error("Failed to delete movie from list");
}

// [USER] Update the status of a movie from my movies list
export const PATCHUpdateStatus = async (payload: { movieId: string, movieStatus: MovieStatus }) => {
    const req = reqWithAuth(`${baseUrl}/profile/update/movie`, {
        method: "PATCH",
        body: JSON.stringify(payload)
    });
    const res = await fetch(req);
    if(res.ok) return { status: res.status, ok: res.ok };
    else throw Error("Failed to update movie status");
}

// [ADMIN] ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// [ADMIN] Update User --> Admin updates a user's fields
interface POSTAdminUpdateUserI {

}
export const POSTAdminUpdateUser = async (payload: POSTAdminUpdateUserI) => {
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