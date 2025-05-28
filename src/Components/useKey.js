import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      const keydownFunction = function (e) {
          if (e.code.toLowerCase() === key.toLowerCase()) {
            action();
            // console.log("CLOSING");
          }
        },
        removeListener = function () {
          document.removeEventListener("keydown", keydownFunction);
        };

      document.addEventListener("keydown", keydownFunction);

      return removeListener;
    },
    [key, action]
  );
}
