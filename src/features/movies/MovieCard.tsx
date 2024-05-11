import s from "../../styles/MoviesList.module.scss";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Paper, Skeleton } from "@mui/material";
import { MovieI } from "../../types/types";
import { ImgSizes } from "../../types/constants";
import StarRateIcon from "@mui/icons-material/StarRate";

type Props = {
    movie: MovieI;
};

const imgIndex: 0 | 1 | 2 = 1;

export default function MovieCard({ movie }: Props) {
    const navigate = useNavigate();
    const [imgLoaded, setImgLoaded] = useState(false);
    return (
        <Paper
            className={s["movie-card"]}
            elevation={4}
            sx={{ width: `${movie.images[imgIndex][0]}px` }}
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
                    src={movie.images[imgIndex][1]}
                    alt="Not Found"
                    loading="lazy"
                    onLoad={() => setImgLoaded(true)}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    style={{
                        visibility: imgLoaded ? "visible" : "hidden",
                        width: `${ImgSizes[imgIndex][0]}px`,
                        height: `${ImgSizes[imgIndex][1]}px`,
                        cursor: "pointer"
                    }}
                />
            </div>
            <div className={s["description"]}>
                <Link to={`/movie/${movie.id}`}>
                    <p>{movie.title}</p>
                </Link>
                <div>
                    <StarRateIcon />
                    <p>{movie.rating}</p>
                    <a href={movie.link}>IMDB</a>
                </div>
                <p>Your Stats:</p>
                <p>2 Buttons to change your rating/status</p>
                <p>- Rating: __</p>
                <p>- Status: (Watched | Not Watched | Plan to watch)</p>
            </div>
        </Paper>
    );
}
