import s from "../../styles/SingleMovie.module.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchWrapper } from "../../api/useFetchWrapper";
import { GETMovie } from "../../api/api";
import {
    CircularProgress,
    Paper,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { MovieI } from "../../types/types";
import AddMovieToListBtn from "../user/AddMovieToListBtn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SingleMovie() {
    const { id } = useParams();
    const { loading, error, data: movie, trigger } = useFetchWrapper<MovieI>();

    useEffect(() => {
        if (id) trigger(() => GETMovie(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    let content;
    if (loading) {
        content = <CircularProgress />;
    } else if (error) {
        content = <p>{error}</p>;
    }
    // Main template
    else if (movie) {
        content = (
            <>
                <picture>
                    <source
                        srcSet={movie.images[0].image}
                        media="(width <= 400px)"
                    />
                    <source
                        srcSet={movie.images[1].image}
                        media="(width <= 600px)"
                    />
                    <img
                        src={movie.images[2].image}
                        alt="Not Found"
                    />
                </picture>

                <Paper
                    elevation={1}
                    className={s.description}
                >
                    <a
                        href={movie.link}
                        target="_blank"
                    >
                        <h1>
                            &#35;{movie.id.split("top")[1]}&nbsp;
                            {movie.title}
                        </h1>
                    </a>
                    <p className={s.year}>
                        Rating {movie.rating}
                        &nbsp; &#8226; &nbsp; 
                        Year {movie.year}
                        &nbsp; &#8226; &nbsp; 
                        <a href={movie.link} target="_blank">IMDB</a>
                    </p>
                    <div className={s.genres}>
                        {movie.genre.map((el) => (
                            <Chip
                                key={el}
                                label={el}
                                variant="outlined"
                            />
                        ))}
                    </div>
                    <AccordionGenerator
                        title="Director"
                        el={movie.Director}
                    />
                    <AccordionGenerator
                        title="Writes"
                        el={movie.Writers}
                    />
                    <AccordionGenerator
                        title="Main Actors"
                        el={movie.Stars}
                    />
                    <p className={s.synopsis}>{movie.description}</p>
                    <Divider />
                    <AddMovieToListBtn id={movie.id}/>
                </Paper>
            </>
        );
    }
    return <div className={s.SingleMovie}>{content}</div>;
}

function AccordionGenerator({ title, el }: { title: string; el: string[] }) {
    const theme = useTheme() as { palette: { divider: string } };
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <span style={{ fontWeight: "bold" }}>
                    {title}
                    {el.length === 1 && "s"}
                </span>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    borderTop: `1px solid ${theme.palette.divider};`,
                }}
            >
                {el.map((el) => (
                    <p
                        key={`${el}-${title}`}
                        style={{ margin: ".5rem 0" }}
                    >
                        {el}
                    </p>
                ))}
            </AccordionDetails>
        </Accordion>
    );
}
