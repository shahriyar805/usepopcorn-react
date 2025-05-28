import { useState } from "react";
import { NavBar } from "./NavBar";
import { Search } from "./Search-v2";
import { NumResults } from "./NumResults";
import { Main } from "./Main";
import { Box } from "./Box";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { MoviesList } from "./MoviesList";
import { SelectedMovieDetails } from "./SelectedMovieDetails-v2";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedList } from "./WatchedList";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = "";

export default function App() {
  const [query, setQuery] = useState(""),
    [selectedId, setSelectedId] = useState(null);

  // // const [watched, setWatched] = useState([]);
  // const [watched, setWatched] = useState(function () {
  //   const storedValue = localStorage.getItem("watched");
  //   return JSON.parse(storedValue);
  // });
  // // Don't do this; the value will be ignored and it'll be run on every render
  // // useState(localStorage.getItem("watched"));

  const handleSelectMovie = function (id) {
      setSelectedId((thisId) => (thisId === id ? null : id));
    },
    handleCloseMovie = function () {
      setSelectedId(null);
    },
    handleAddWatched = function (movie) {
      setWatched((watched) => [...watched, movie]);
      // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
    },
    handleDeleteWatched = function (id) {
      setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    };

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie),
    { watched, setWatched } = useLocalStorageState([], "watched");

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        {/* <Box element={<MoviesList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} />
            </>
          }
        /> */}
        <Box>
          {/* {isLoading ? <Loader /> : <MoviesList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovieDetails
              movieId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
