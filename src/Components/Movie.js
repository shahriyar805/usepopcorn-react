import { MovieDetail } from "./MovieDetail";

export function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <MovieDetail emoji="🗓">{movie.Year}</MovieDetail>
      </div>
    </li>
  );
}
