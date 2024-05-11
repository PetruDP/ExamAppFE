import s from "../../styles/MoviesList.module.scss";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { CircularProgress } from "@mui/material";
import { MovieI } from "../../types/types";
import MovieCard from "./MovieCard";
import { useFetchWrapper } from "../../api/useFetchWrapper";
import { GETMovies } from "../../api/api";

export default function MoviesList() {
    const { moviesList: movies } = useAppSelector((state) => state.movies);
    const {
        loading,
        error,
        trigger,
    } = useFetchWrapper<MovieI[]>();

    useEffect(() => {
        if(movies.length === 0){
            trigger(GETMovies);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let content;
    let containerClass = s["movies-list-loading"];
    if (loading) {
        content = <CircularProgress className={s["loading-movies"]} />;
    } else if (error) {
        content = <p style={{ color: "red", fontWeight: "bold", fontSize: "1.25rem"}}>{error}</p>;
    } else if (movies) {
        containerClass = s["movies-list"];
        content = movies.map((el) => (
            <MovieCard
                movie={el}
                key={`${el.id}-${el.title}`}
            />
        ));
    }

    return <div className={containerClass}>{content}</div>;
}
