import { api, baseRoute } from "@common/hooks/useNetwork";

// import { api, baseRoute } from '@common/hooks/useNetwork';


// import { api, baseRoute } from "../../application/AppWrapper";
// console.log("base url ", baseRoute)
// console.log("api ", api)
const index = baseRoute + "/auth/user";

const route = {
  signup: index + "/signup",
  login: index + "/login",
  verify: index + "/verify",
  init: index + "/init-account",
  resendVerification: index + "/resend-verification",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
};

export const initAccount = async (payload) => {
  try {
    const append = route.init+"/"+payload
    let response = await api.get(append);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signupApi = async (payload) => {
  try {

    let response = await api.post(route.signup, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (payload) => {
  try {
  
    let result = await api.post(route.login, payload);
    // console.log("result ", result);
    return result.data;
  } catch (error) {
    // console.log("error ", error);
    throw error;
  }
};

export const verifyApi = async (payload) => {

  console.log("payload ", payload)
  console.log("router ", route.verify)


  try {
    let response = await api.post(route.verify, payload);
    return response.data;
  } catch (error) {
    // console.log("error ", error);
    throw error;
  }
};

export const resendVerificationApi = async (payload) => {
  console.log("payload is ", payload);
  const url = route.resendVerification + `/${payload}`
  try {
    let response = await api.post(url);
    return response.data;
  } catch (error) {
    // console.log("api error ", error);
    throw error;
  }
};

export const forgotPassword = async (payload) => {
  const {email} = payload
  const url = route.forgotPassword + `/${email}`
  try {
    let response = await api.post(url);
    return response.data;
  } catch (error) {
    // console.log("api error ", error);
    throw error;
  }
};

export const resetPassword = async (payload) => {
  try {
    let response = await api.post(route.resetPassword, payload);
    return response.data;
  } catch (error) {
    // console.log("api error ", error);
    throw error;
  }
};





