import { useState, useCallback, useEffect } from "react";

// Global cache object
const cache = {};

export const useRequest = (fetchFunction) => {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const [paginationData, setPaginationData] = useState([]);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [isPaginationSuccess, setIsPaginationSuccess] = useState(false);
  const [isPaginationError, setIsPaginationError] = useState(false);
  const [paginationError, setPaginationError] = useState(null);
  const [isPaginationInitialized, setIsPaginationInitialized] = useState(false);

  // Fetch data (initial and refetch)
  const init = useCallback(
    async (key, payload, ignoreCache = false) => {
      setIsLoading(true);
      setIsError(false);
      setError(null);
      setIsSuccess(false);
      setIsInitialized(true);

      if (!ignoreCache && cache[key] !== undefined) {

        setTimeout(() => {
            setData(cache[key]);
            setIsLoading(false);
            setIsSuccess(true);
          }, 1); // 🔥 Allow React to process isLoading = true first
      
        // console.log("Returning data from cache", cache[key]);
        return;
      }

      try {
        const result = payload
          ? await fetchFunction(payload)
          : await fetchFunction();
        // console.log("useRequest result  ", result);
        if (result.error) throw result.error;
        cache[key] = result;
        setData(result);
        setIsSuccess(true);
  

        return { data };
      } catch (error) {
          console.log("error request ", error);
        setIsError(true);

        // first check if the error has a response from the server
        // if not then then it means its an axios error then return a custom response that
        // has the same structure as the one coming from the server
        setError(error.response?.data);
        return { error };
      } finally {
        setIsLoading(false);
      }
    },
    [fetchFunction]
  );
  
  // useEffect(() => {
  //   console.log("useRequest-v3 effect data", data);
  //   console.log("useRequest-v3 effect error", error);
  // }, [data, error]);

  // Pagination method
  const paginate = useCallback(
    async (key, payload) => {
      setIsPaginationLoading(true);
      setIsPaginationSuccess(false);
      setIsPaginationError(false);
      setPaginationError(null);
      setIsPaginationInitialized(true);

      try {
        const result = payload
          ? await fetchFunction(payload)
          : await fetchFunction();
        const updatedData = [...(cache[key] || []), ...result];
        cache[key] = updatedData;
        setPaginationData(updatedData);
        setIsPaginationSuccess(true);
      } catch (err) {
        setIsPaginationError(true);
        setPaginationError(err);
      } finally {
        setIsPaginationLoading(false);
      }
    },
    [fetchFunction]
  );

  // Manual methods to interact with the cache

  const removeCacheByKey = useCallback((key) => {
    if (cache[key]) delete cache[key];
  }, []);
  const setCacheByKey = useCallback((key, value) => {
    cache[key] = value;
  }, []);
  const getCacheByKey = useCallback((key) => {
    const data = cache[key] || null;
    return data;
  }, []);
  const setStateData = useCallback((data) => setData(data), []);

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    isInitialized,
    error,
    init,
 
    pagination: {
      isLoading: isPaginationLoading,
      isError: isPaginationError,
      isSuccess: isPaginationSuccess,
      isInitialized: isPaginationInitialized,
      error: paginationError,
      data: paginationData,
      paginate,
    },
    // Expose manual cache operations
    utils: {
      removeCacheByKey,
      setCacheByKey,
      setStateData,
      getCacheByKey,
    },
  };
};

// helpers. utils, managers,
