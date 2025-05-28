import { useEffect, useRef } from "react";
import { useKey } from "./useKey";

export function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;

    inputEl.current.focus();
    setQuery("");
  });

  // useEffect(
  //   function () {
  //     const callback = function (e) {
  //       if (e.code === "Enter") {
  //         if (document.activeElement === inputEl.current) return;

  //         inputEl.current.focus();
  //         setQuery("");
  //       }
  //     };

  //     document.addEventListener("keydown", callback);
  //     return () => document.addEventListener("keydown", callback);
  //   },
  //   [setQuery]
  // );

  // useEffect(
  //   function () {
  //     const el = document.querySelector(".search");
  //     console.log(el);
  //     el.focus();
  //   },
  //   [query]
  // );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
