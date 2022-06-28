import { useState, useEffect, useCallback } from "react";

//Axios is a simple promise based HTTP client for the browser and node.js.
import axios from "axios";

// An interface is a syntactical contract that an entity should conform to.
interface UseFetchProps {
  url: string;
}

const useApiFetch = ({ url }: UseFetchProps) => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState(false);

  // function to fetch data

  //Think of memoization as caching a value so that it does not need to be recalculated.
  // The useCallback Hook only runs when one of its dependencies update.
  // The useCallback and useMemo Hooks are similar.
  // The main difference is that useMemo returns a memoized value and useCallback returns a memoized function.

  const fetch = useCallback(async () => {
    setError(false);
    try {
      const fetchedData = await axios.get(url);
      setData(fetchedData.data);
    } catch {
      setError(true);
    }
  }, [url]);

  //By default, useEffect will run on initial render as well as every future render (update) of your component.

  // If we want the effect to run in the same phase that componentDidUpdate does,
  // we can use useLayoutEffect instead.

  // The signature is identical to useEffect, but it fires synchronously after all DOM mutations.
  // Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside useLayoutEffect
  // will be flushed synchronously, before the browser has a chance to paint.

  // Prefer the standard useEffect when possible to avoid blocking visual updates.
  useEffect(() => {
    // on first load fetch data
    fetch();
  }, [fetch]);

  return {
    data,
    error,
    revalidate: fetch,
  };
};

export default useApiFetch;
