import axios from "axios";
const baseRoute = "http://localhost:3000";
const baseRouteLive = "https://tiny-lion-train.cyclic.app"
const api = axios.create({
  baseURL: baseRoute,
});
export { api, baseRoute };

export const useNetwork = (setRequireAuth) => {

  const setAuthHeader = (token) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  // Add a response interceptor
  api.interceptors.response.use(
    (response) => {
      // console.log("success intercept ", response);
      const payload = response.data;
      const token = payload?.data?.token;
      if (token) setAuthHeader(token);
      return response;
    },
    async (error) => {
      // console.log("error intercept ", error);
      const originalRequest = error.config;
      // console.log("original request ", originalRequest)

      // Check if the error is due to an expired access token
      if (error?.response?.status === 401 && !originalRequest?._retry) {

        // console.log("requesting new access token ");
        // console.log("401 block");
        originalRequest._retry = true;

        try {
          // Refresh the access token
          const newAccessToken = await refreshToken();
          // Update the original request with the new access token
          setAuthHeader(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          // Retry the original request with the new access token

          // console.log("oriinal request ", originalRequest)
          return api(originalRequest);
        } catch (refreshError) {
          // CATCH BLOCK IF THERE AN ERROR GETTING A NEW ACCESS TOKEN
          // console.error("Error getting new accessToken:");
          // console.error(refreshError);

          // Handle refresh token error
          // CHECK IF THE ERROR IS AN AXIOS ERROR
          if (!refreshError.response) return Promise.reject(refreshError);

          // IF THERES A 403
          // Check if the refreshToken API returned a 403  or not
          const status = refreshError.response.status;
          if (status === 403) {
            // Handle specific actions for a 403 error during token refresh
            // E.G Redirect the user to the login page
            // console.error("Refresh token API returned a 403 error.");
            return Promise.reject(refreshError);
          }



          // console.error("Refresh token API returned a generic error.");
          // Handle other types of errors
          // Create a geeraic error messgae saying request was not successful try again
          // THis is because i dont want it to say "error refreshing your access token"
          return Promise.reject(refreshError);
        }
      }

      // Check if the error is due to a forbidden access
      // if forbidden user needs to authenticate again
      // Trigger the forbidden event here
      if (error?.response?.status === 403) {
        // console.log("403 block Forbidden: User needs to signin again");
        setRequireAuth(true);
        // create a new error and reject it
        return Promise.reject(error);
      }

      console.log("other errors");
      // Handle other errors normally
      return Promise.reject(error);
    }
  );


};
