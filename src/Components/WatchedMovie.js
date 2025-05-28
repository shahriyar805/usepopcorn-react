import { MovieDetail } from "./MovieDetail";

export function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <MovieDetail emoji="⭐️">{movie.imdbRating}</MovieDetail>
        <MovieDetail emoji="🌟">{movie.userRating}</MovieDetail>
        <MovieDetail emoji="⏳">{movie.runtime} min</MovieDetail>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
