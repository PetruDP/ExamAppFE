import { store } from "../app/store";

let baseUrl: string = "http://localhost:3001";

type ReqWithAuth = (url: string, init?: RequestInit) => Request;
/**
 * Returns a `Request` object that includes authorization for protected routes
 */
const reqWithAuth: ReqWithAuth = (url, init) => {
    const { auth } = store.getState();
    return new Request(url, {
        headers: {
            "Authorization": `Bearer ${auth.auth.token}`
        },
        credentials: "include",
        ...init
    })
}

if (import.meta.env.PROD) {
    baseUrl = "";
}

export { reqWithAuth, baseUrl };