import s from "../../styles/Profile.module.scss";
import { useEffect } from "react";
import { useFetchWrapper } from "../../api/useFetchWrapper";
import { GETMovies } from "../../api/api";
import { MovieI } from "../../types/types";

type Props = {
    tabValue: number;
    tabIndex: number;
};

export default function MyMoviesList({ tabValue, tabIndex }: Props) {
    const { loading, error, data, trigger } = useFetchWrapper<MovieI[]>();

    useEffect(() => {
        trigger(GETMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    

    return (
        <div
            className={s.MyMoviesList}
            hidden={tabValue !== tabIndex}
        >
            {tabValue === tabIndex && (
                <div>
                    <h1>My Movies List</h1>
                </div>
            )}
        </div>
    );
}
