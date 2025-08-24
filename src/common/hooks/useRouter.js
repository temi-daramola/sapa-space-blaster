import { useLocation, useNavigate, useParams } from "react-router";

// import { useLocation, useNavigate, useParams } from "react-router-dom
function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // Access query parameters using URLSearchParams
  const queryParams = new URLSearchParams(location.search);
  // Function to get query parameter by name
  const getQueryParam = (param) => queryParams.get(param);

  const redirect = (url, replace = false) =>  navigate(url, { replace });
  const goBack = () =>   navigate(-1);
  
  return {
    navigate: redirect,
    url: location.pathname || "/home",
    location: location.pathname || "/home",
    state: location.state,
    params,
    queryParams: { get: getQueryParam }, // Expose a getter for query parameters
    goBack,
  };
}

export default useRouter;
