import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JWTPayload } from "../../types/types";
import { jwtDecode } from "jwt-decode";
import { RootState } from "../../app/store";

// Initial State
interface InitialState {
    auth: {
        token: string;
        decoded: JWTPayload;
        persistLogin: boolean;
    }
}

const initialState: InitialState = {
    auth: {
        token: "",
        decoded: {
            Username: "",
            Role: "",
            sub: "",
        },
        persistLogin: false
    }
}

// Initialization from localStorage / persist login
function initFromLocalStorage() {
    // Check if user wants his session to be remembered
    // If so, check if the token stored in localStorage is valid,
    // decode it and save it in memory under auth.token
    if (!localStorage.persistLogin) {
        localStorage.persistLogin = true;
        initialState.auth.persistLogin = true;
        checkTokenValidity();
    }
    else if (localStorage.persistLogin === "true") {
        initialState.auth.persistLogin = true;
        checkTokenValidity();
    }
    else if (localStorage.persitLogin === "false") {
        initialState.auth.persistLogin = false;
    }

    function checkTokenValidity() {
        if (!localStorage.token) localStorage.token = "";
        else if (localStorage.token) {
            try {
                initialState.auth.decoded = jwtDecode(localStorage.token);
                initialState.auth.token = localStorage.token;
            }
            catch (error) {
                console.error("Invalid jwt token in localStorage");
            }
        }
    }
}
initFromLocalStorage();

// Auth Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            try {
                state.auth.decoded = jwtDecode(action.payload);
                state.auth.token = action.payload;
                localStorage.token = action.payload;
            }
            catch (error) {
                if (error instanceof Error) console.error(error.message);
                else console.error("Error decoding jwt");
            }
        },
        setPersistLogin: (state, action: PayloadAction<boolean>) => {
            state.auth.persistLogin = action.payload;
            localStorage.persistLogin = action.payload ? "true" : "false";
        },
        logout: (state) => {
            state.auth.token = "";
            state.auth.decoded = {
                Username: "",
                Role: "",
                sub: ""
            }
        }
    }
});


export const selectToken = (state: RootState) => state.auth.auth.token;
export const selectJWTDecoded = (state: RootState) => state.auth.auth.decoded;
export const selectPersistLogin = (state: RootState) => state.auth.auth.persistLogin;

export const { setToken, logout, setPersistLogin } = authSlice.actions
export default authSlice.reducer