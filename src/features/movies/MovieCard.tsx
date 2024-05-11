import s from "../../styles/MoviesList.module.scss";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Paper, Skeleton } from "@mui/material";
import { MovieI } from "../../types/types";
import { ImgSizes } from "../../types/constants";
import AddMovieToListBtn from "../user/AddMovieToListBtn";

type Props = {
    movie: MovieI;
};

const imgIndex: 0 | 1 | 2 = 1;

const MovieCard = React.memo(({ movie }: Props) => {
    const navigate = useNavigate();
    const [imgLoaded, setImgLoaded] = useState(false);
    return (
        <Paper
            className={s["movie-card"]}
            elevation={4}
            sx={{ width: `${movie.images[imgIndex].width}px` }}
        >
            <div className={s["image"]}>
                {!imgLoaded && (
                    <Skeleton
                        className={s["skeleton"]}
                        variant="rectangular"
                        width={ImgSizes[imgIndex][0]}
                        height={ImgSizes[imgIndex][1]}
                    />
                )}
                <img
                    src={movie.images[imgIndex].image}
                    alt="Not Found"
                    loading="lazy"
                    onLoad={() => setImgLoaded(true)}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    style={{
                        visibility: imgLoaded ? "visible" : "hidden",
                        width: `${ImgSizes[imgIndex][0]}px`,
                        height: `${ImgSizes[imgIndex][1]}px`,
                        cursor: "pointer",
                    }}
                />
            </div>
            <div className={s["description"]}>
                <Link to={`/movie/${movie.id}`}>
                    <p>{movie.title}</p>
                </Link>
                <div>
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
                </div>
                <AddMovieToListBtn id={movie.id} />
            </div>
        </Paper>
    );
});

export default MovieCard;
