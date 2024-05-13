import s from "../../styles/Profile.module.scss";
import { useState, useEffect } from "react";
import { useFetchWrapper } from "../../api/useFetchWrapper";
import { DELETEUserMovie, StatusData, GETUser, PATCHUpdateStatus } from "../../api/api";
import { Link } from "react-router-dom";
import { MovieI, MovieStatus } from "../../types/types";
import { Paper, Tooltip, Button } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { MovieStatuses } from "../../types/constants";
import { selectJWTDecoded } from "../auth/authSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import SnackResponse from "../../components/Utils/SnackResponse";

type Props = {
    movie: MovieI;
};

export default function MyMovieListCard({ movie }: Props) {
    const { Username } = useAppSelector(selectJWTDecoded);
    const [status, setStatus] = useState<MovieStatus>("NOT WATCHED");
    const { loading, error, data, trigger } = useFetchWrapper<StatusData>();
    const { trigger: getMyMovies } = useFetchWrapper();

    // Watch for updates to movies list updates and refetch my movies list
    useEffect(() => {
        if(data?.ok) getMyMovies(() => GETUser({ username: Username }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setStatus(e.target.value as MovieStatus);
        trigger(() => PATCHUpdateStatus({ movieId: movie.id, movieStatus: status }))
    }

    function handleRemoveMovie() {
        trigger(() => DELETEUserMovie({ movieId: movie.id }));
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
                    {MovieStatuses.map((el) => (
                        <option key={el} value={el}>{el}</option>
                    ))}
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
