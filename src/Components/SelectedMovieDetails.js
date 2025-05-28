import { useState, useEffect } from "react";
import { KEY } from "./App-v1";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";
import StarRating from "./StarRating";

export function SelectedMovieDetails({
  movieId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({}),
    [isLoading, setIsLoading] = useState(true),
    [error, setError] = useState(""),
    [userRating, setUserRating] = useState(0);

  const {
      Title: title,
      Year: year,
      Poster: poster,
      Runtime: runtime,
      imdbRating,
      Plot: plot,
      Released: released,
      Actors: actors,
      Director: director,
      Genre: genre,
    } = movie,
    isWatched = watched
      .map((watchedMovie) => watchedMovie.imdbID)
      .includes(movieId),
    watchedUserRating = watched.find(
      (movie) => movie.imdbID === movieId
    )?.userRating;

  const handleAdd = function () {
    // if (watched.map((watchedMovie) => movieId === watchedMovie.imdbID)) {
    //   onCloseMovie();
    //   return;
    // }
    const newWatchedMovie = {
      imdbID: movieId,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          setError("");

          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${movieId}`
          );

          if (!response.ok)
            throw new Error(
              "Something went wrong with fetching movie details."
            );

          const data = await response.json();

          if (data.response === "false")
            throw new Error("Movie details not found.");

          setMovie(data);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      getMovieDetails();
    },
    [movieId]
  );

  useEffect(
    function () {
      if (!title) return;

      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useEffect(
    function () {
      const keydownFunction = function (e) {
          if (e.code === "Escape") {
            onCloseMovie();
            // console.log("CLOSING");
          }
        },
        removeListener = function () {
          document.removeEventListener("keydown", keydownFunction);
        };

      document.addEventListener("keydown", keydownFunction);

      return removeListener;
    },
    [onCloseMovie]
  );

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>
                  You rated this movie {watchedUserRating} <span>⭐</span>
                </p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
