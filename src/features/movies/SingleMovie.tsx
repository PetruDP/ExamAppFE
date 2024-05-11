import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchWrapper } from "../../api/useFetchWrapper";
import { GETMovie } from "../../api/api";
import { CircularProgress } from "@mui/material";
import { MovieI } from "../../types/types";

export default function SingleMovie() {
    const { id } = useParams();
    const { loading, error, data: movie, trigger } = useFetchWrapper<MovieI>();

    useEffect(() => {
        if (id) trigger(() => GETMovie(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    let content;
    if(loading) {
        content = <CircularProgress />
    }
    else if(error){
        content = <p>{error}</p>
    }
    else if(movie){
        content = <pre>{JSON.stringify(movie, null, 2)}</pre>
    }
    return (
        <div>
            <h1>Single Movie</h1>
            {content}
        </div>
    );
}
