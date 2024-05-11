import { Roles } from "./constants";

export type Roles = typeof Roles[keyof typeof Roles];

export interface JWTPayload {
    Username: string;
    Role: Roles | "";
    sub: string;
}

export interface MovieI {
    id: string;
    title: string;
    description: string;
    link: string;
    Director: string[];
    Writers: string[];
    Stars: string[];
    genre: string[];
    images: {
        width: string;
        image: string;
    }[];
    imdbid: string;
    rank: number;
    rating: string;
    year: string;
}