import s from "../../styles/Profile.module.scss";
import { useEffect } from "react";
import { useFetchWrapper } from "../../api/useFetchWrapper";
import { GETUser, GETUserI } from "../../api/api";
import { MovieI } from "../../types/types";
import { CircularProgress } from "@mui/material";
import MyMovieListCard from "./MyMovieListCard";
import { useAppSelector } from "../../app/hooks";
import { selectMyMovies } from "../movies/moviesSlice";
import { selectJWTDecoded } from "../auth/authSlice";

type Props = {
    tabValue: number;
    tabIndex: number;
};

export default function MyMoviesList({ tabValue, tabIndex }: Props) {
    const { Username } = useAppSelector(selectJWTDecoded);
    const myMovies = useAppSelector(selectMyMovies);
    const {
        loading,
        error,
        data,
        trigger,
    } = useFetchWrapper<GETUserI | undefined>();

    useEffect(() => {
        if (myMovies.length === 0) {
            trigger(() => GETUser({ username: Username }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let content;
    if (loading) {
        content = <CircularProgress sx={{ marginTop: "4rem" }} />;
    } else if (error) {
        content = <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>;
    } else if (myMovies && myMovies.length > 0) {
        content = myMovies.map((el) => (
            <MyMovieListCard
                key={el.id}
                movie={el}
            />
        ));
    }

    return (
        <div
            className={s.MyMoviesList}
            hidden={tabValue !== tabIndex}
        >
            {tabValue === tabIndex && <div>{content}</div>}
        </div>
    );
}
