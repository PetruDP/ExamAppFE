let baseUrl: string = "http://localhost:3001";
let baseRequest: Request = new Request(baseUrl);

if (import.meta.env.PROD) {
    baseUrl = "";
    baseRequest = new Request(baseUrl, {})
}

export { baseRequest, baseUrl };