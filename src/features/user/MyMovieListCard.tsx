import s from "../../styles/Profile.module.scss";
import { useState, useEffect } from "react";
import { useFetchWrapper } from "../../api/useFetchWrapper";
import { DELETEUserMovie, StatusData, GETUsersMoviesList } from "../../api/api";
import { Link } from "react-router-dom";
import { MovieI } from "../../types/types";
import { Paper, Tooltip, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SnackResponse from "../../components/Utils/SnackResponse";

type Props = {
    movie: MovieI;
};

export default function MyMovieListCard({ movie }: Props) {
    const [status, setStatus] = useState("Not Watched");
    const { loading, error, data, trigger } = useFetchWrapper<StatusData>();
    const { trigger: getMyMovies } = useFetchWrapper();

    useEffect(() => {
        if(data?.ok) getMyMovies(GETUsersMoviesList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setStatus(e.target.value as string);
    }

    function handleRemoveMovie() {
        trigger(() => DELETEUserMovie({}));
    }

    return (
        <Paper
            elevation={4}
            className={s.movieCard}
        >
            <Link to={`/movie/${movie.id}`}>
                &#35;{movie.id.split("top")[1]}&nbsp;{movie.title}
            </Link>
            <p>
                Rating {movie.rating}
                &nbsp; &#8226; &nbsp; Year {movie.year}
                &nbsp; &#8226; &nbsp;
                <a
                    href={movie.link}
                    target="_blank"
                >
                    IMDB
                </a>
            </p>
            <div className={s.btns}>
                <label htmlFor={`status-${movie.id}`}></label>
                <select
                    id={`status-${movie.id}`}
                    value={status}
                    onChange={handleStatusChange}
                >
                    <option value="Not Watched">Not Watched</option>
                    <option value="Watched">Watched</option>
                    <option value="Plan to Watch">Plan to Watch</option>
                </select>
                <Tooltip title="Remove movie from your list">
                    <Button
                        onClick={handleRemoveMovie}
                        sx={{ margin: "1.5rem 0 0 0" }}
                        variant="outlined"
                        disabled={loading}
                        startIcon={<DeleteIcon />}
                    >
                        {loading ? "LOADING" : "REMOVE"}
                    </Button>
                </Tooltip>
                <SnackResponse
                    open={Boolean(data?.ok)}
                    message="Movie removed!"
                />
                <SnackResponse
                    open={Boolean(error)}
                    message={error}
                    alertProps={{
                        severity: "error",
                    }}
                />
            </div>
        </Paper>
    );
}
