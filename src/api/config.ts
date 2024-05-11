import { store } from "../app/store";

const { auth } = store.getState();

let baseUrl: string = "http://localhost:3001";
/**
 * Returns a `Request` object that includes authorization for protected routes
 */
let baseRequest: (url: string) => Request = (url: string) => new Request(url, {
    headers: {
        "Authorization": `Bearer ${auth.auth.token}`
    },
    credentials: "include"
})

if (import.meta.env.PROD) {
    baseUrl = "";
    baseRequest = (url) => new Request(url, {
        headers: {
            "Authorization": `Bearer ${auth.auth.token}`
        },
        credentials: "include"
    })
}

export { baseRequest, baseUrl };