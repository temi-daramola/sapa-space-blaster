import { useState, useCallback, useEffect } from "react";

// Global cache object
const cache = {};

export const useRequest = (fetchFunction) => {
  const [data, setData] = useState(null);

  // const [cache, setCache] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false); // Success state
  const [isInitialized, setIsInitialized] = useState(false); // Request initialization state

  // Pagination-related states
  const [paginationData, setPaginationData] = useState([]);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [isPaginationSuccess, setIsPaginationSuccess] = useState(false);
  const [isPaginationError, setIsPaginationError] = useState(false);
  const [paginationError, setPaginationError] = useState(null);
  const [isPaginationInitialized, setIsPaginationInitialized] = useState(false); // Pagination request initialization state

  // Fetch data (initial and refetch)
  const init = useCallback(
    async (key, payload, ignoreCache = false) => {
      setIsLoading(true); // During initial load
      setIsError(false); // Reset error state
      setError(null);
      setIsSuccess(false); // Reset success state
      setIsInitialized(true); // Mark the request as initialized

      // If ignoreCache is false and cache exists, return cached data
      if (!ignoreCache && cache[key] !== undefined) {
        setData(cache[key]); // Use cached data
        setIsLoading(false);
        setIsSuccess(true); // Cached data is considered successful
        console.log("returning data from cache");
        return;
      }

      try {
        setIsLoading(true); // During initial load
        const result = payload
          ? await fetchFunction(payload)
          : await fetchFunction(); // Make API request
        cache[key] = result; // Cache the response
        setData(result); // Update data with the response
        setIsSuccess(true); // API call was successful
      } catch (err) {
        setIsError(true);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchFunction]
  );

  // Pagination method
  const paginate = useCallback(
    async (key, payload) => {
      setIsPaginationLoading(true);
      setIsPaginationSuccess(false);
      setIsPaginationError(false);
      setPaginationError(null);
      setIsPaginationInitialized(true); // Mark the pagination request as initialized

      try {
        const result = payload
          ? await fetchFunction(payload)
          : await fetchFunction(); // Fetch the next page
        const updatedData = [...(cache[key] || []), ...result];
        cache[key] = updatedData; // Cache the updated response
        setPaginationData(updatedData); // Append new data
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

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    isInitialized, // Added to return object
    error,
    init,
    pagination: {
      isLoading: isPaginationLoading,
      isError: isPaginationError,
      isSuccess: isPaginationSuccess,
      isInitialized: isPaginationInitialized, // Added to pagination return object
      error: paginationError,
      data: paginationData,
      paginate,
    },
  };
};
