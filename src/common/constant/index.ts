export const roles = {
  admin: "admin",
  superAdmin: "super-admin",
  customer: "customer",
};

export const appRoutes = {
  home: "/",
  landing: "/landing",

  signup: "/auth/signup",
  login: "/auth/login",
  confirmation: "/auth/confirmation/:email?",
  verify: "/auth/verify-email/:token?",

  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password/:token",
  resetPasswordSuccess: "/auth/reset-password/success",

    snake: "/snake",
};

export const appRoutesAppend = {
  home: "/",
  landing: "/landing",

  signup: "/auth/signup",
  login: "/auth/login",
  confirmation: "/auth/confirmation",
  verify: "/auth/verify-email",

  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  resetPasswordSuccess: "/auth/reset-password/success",
  productInfo: "/product/info",

  // management routes
  dashboard: "/dashboard",
};

export const navLinks = [
  { name: "Home", url: appRoutes.home },
];

const navItems = {
  home: { name: "Home", url: appRoutes.home },
};

export const constants = {
  appRoutesAppend,
  appRoutes,
  roles,
  navLinks,
  navItems,
};
