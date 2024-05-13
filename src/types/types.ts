import { Roles, MovieStatuses } from "./constants";

export type Roles = typeof Roles[keyof typeof Roles];
export type MovieStatus = typeof MovieStatuses[number];

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
    director: {
        id: number;
        name: string;
    }[];
    writers: {
        id: number;
        name: string;
    }[];
    stars: {
        id: number;
        name: string;
    }[];
    genre: {
        id: number;
        name: string;
    }[];
    images: {
        width: string;
        image: string;
    }[];
    imdbid: string;
    rank: number;
    rating: string;
    year: string;
    movieStatus: MovieStatus 
}