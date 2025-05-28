import { average } from "./App-v1";
import { MovieDetail } from "./MovieDetail";

export function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating)),
    avgUserRating = average(watched.map((movie) => movie.userRating)),
    avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <MovieDetail emoji="#️⃣">{watched.length} movies</MovieDetail>
        <MovieDetail emoji="⭐️">{avgImdbRating.toFixed(2)}</MovieDetail>
        <MovieDetail emoji="🌟">{avgUserRating.toFixed(2)}</MovieDetail>
        <MovieDetail emoji="⏳">{avgRuntime.toFixed(2)} min</MovieDetail>
      </div>
    </div>
  );
}
