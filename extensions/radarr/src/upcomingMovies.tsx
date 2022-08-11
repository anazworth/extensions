import {getPreferenceValues, Icon, List} from "@raycast/api";
import {useEffect, useState} from "react";
import {movieItem} from "./movieItem";
import {Actions, findMovies} from "./movieActions";

const preferences = getPreferenceValues();

export default function Command() {
  const [movieItems, setMovieItems] = useState<movieItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      setLoading(true);

      const currentDate = new Date();
      const oneYearFromNow = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1)).toISOString();

      const url = `http://${preferences.host}:${preferences.port}/api/v3/calendar?end=${oneYearFromNow}&apikey=${preferences.apikey}`;

      findMovies(url , setMovieItems, setLoading);

  } , [])

  return (
      <List searchBarPlaceholder="Radarr Calendar" isLoading={loading}>
          <List.Section title="Results">
                {movieItems.map(movieItem => (
                    <List.Item
                        key={movieItem.title}
                        icon={movieItem.images[0].url || ""}
                        title= {movieItem.title || ""}
                        subtitle={movieItem.studio ? movieItem.studio : ""}
                        accessories={[
                            {text: `Digital Release: ${movieItem.digitalRelease || "N/A"}`},
                            {icon: movieItem.hasFile ? Icon.Folder : ""},
                            {icon: movieItem.monitored ? Icon.Eye : ""}
                        ]}
                        actions= {
                            <Actions movie={movieItem} />
                        }
                    />
                ))}
          </List.Section>
      </List>
  );
}
