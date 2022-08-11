import {ActionPanel, Action, getPreferenceValues, showToast, Toast} from "@raycast/api";
import {movieItem} from "./movieItem";
import fetch from "node-fetch";

function Actions(props: { movie: movieItem}) {
    const preferences = getPreferenceValues();
    return (
        <ActionPanel title={props.movie.title}>
            <ActionPanel.Section>
                {props.movie.title && <Action.OpenInBrowser url={`http://${preferences.host}:${preferences.port}/movie/${props.movie.tmdbId}`} />}
            </ActionPanel.Section>
        </ActionPanel>
    );
}

function findMovies(url: string, setMovieItems: (movieItems: movieItem[]) => void, setLoading: (loading: boolean) => void) {
    fetch(url)
        .then(res => res.json())
        .then((data) => {
                setMovieItems(data as movieItem[]);
            }
        ).catch(err => {
        console.log(err);
        showToast(
            {
                title: "Error",
                message: "Could not load movie list",
                style: Toast.Style.Failure
            }
        );
    }   ).finally(() => {
        setLoading(false);
    }   );
}

export {Actions, findMovies};