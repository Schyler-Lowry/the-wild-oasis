import { useEffect, useRef } from "react";

// we pass in the handler function
// also created another parameter for the capturing/bubbling paramter in the addEventListener function
// we set the default to true
export default function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }
    // this is a vanilla javascript thing
    // there's a third parameter that you can optionally pass into document.addEventListener
    // this parameter controls whether or not the function executes in the capturing phase
    // by defautl it's false, so it'll be the bubbling phase normaly
    // by passing in 'true', you're telling it to call the funciton during the capturing phase instead
    // this is what solves hte problem of the modal not opening
    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, []); // apparently you're supposed to add "handler" as a dependency in the array

  return { ref };
}
