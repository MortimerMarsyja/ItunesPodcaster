import useSWR from "swr";
import Card from "../../components/card";
import entriesReducer, {
  EntriesActionTypes,
  entriesInitialState,
} from "../../reducers/entriesReducer";
import { useEffect, useReducer } from "react";
import fetcher from "@helpers/fetcher";
import { Entries } from "@definitions/index";

const url =
  "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";
const PodCastList = () => {
  // SWR will cache data so that it loads faster next time
  const { data, error, isLoading } = useSWR(url, fetcher);
  const [state, dispatch] = useReducer(entriesReducer, entriesInitialState);
  useEffect(() => {
    if (data) {
      dispatch({ type: EntriesActionTypes.POPULATE, payload: data.feed.entry });
      localStorage.setItem("podcastData", JSON.stringify(state.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleShowContent = () => {
    if (state.filterValue !== "") {
      return state.filteredData.map((entry: Entries) => (
        <Card
          author={entry["im:artist"].label}
          imgData={{
            url: entry["im:image"][2].url,
            alt: entry["im:name"].label,
          }}
          title={entry["im:name"].label}
          key={entry.id.attributes["im:id"]}
          link={`/podcast/${entry.id.attributes["im:id"]}`}
        />
      ));
    }
    return state.data.map((entry: Entries) => (
      <Card
        author={entry["im:artist"].label}
        imgData={{
          url: entry["im:image"][2].url,
          alt: entry["im:name"].label,
        }}
        title={entry["im:name"].label}
        key={entry.id.attributes["im:id"]}
        link={`/podcast/${entry.id.attributes["im:id"]}`}
      />
    ));
  };
  return (
    <div className="flex row flex-wrap gap-24">
      <div className="w-full flex justify-end items-center">
        <div className="flex rounded-full mr-1 h-8 font-bold bg-blue-300 py-1 px-3">
          {state.dataLength}
        </div>
        <input
          className="border-2 border-gray-300 p-2 rounded-md w-1/4"
          onChange={(e) =>
            dispatch({
              type: EntriesActionTypes.FILTER,
              payload: e.target.value,
            })
          }
          type="text"
          placeholder="filter..."
        />
      </div>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && handleShowContent()}
    </div>
  );
};

export default PodCastList;
