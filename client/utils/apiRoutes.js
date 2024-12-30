import { host } from "./apiHost";

// export const studentapi = `${host}/api/student`;
export const contactApi = `${host}/api/contact`;
export const signupApi = `${host}/api/signup`;
export const loginApi = `${host}/api/login`;
export const validateToken = `${host}/api/validateToken`;
export const businessinquiry = `${host}/api/business-inquiries`;
export const profile = `${host}/api/profile`;
export const verifyEmailApi = `${host}/api/verify-email`;
export const forgotPasswordApi = `${host}/api/forgot-password`;
export const resetPasswordApi = `${host}/api/reset-password`;
export const addProductApi = `${host}/api/products`;
export const inquiryApi = `${host}/api/inquiry/submit`;
export const profileApi = `${host}/api/userRoutes/profile`;

export const addProductToListApi = `${host}/api/inquiry/add-product-to-list`;

// New route for updating a product
export const updateProductApi = `${host}/api/products`;

export const deletProductApi = `${host}/api/products`;

export const deletExternalProductApi = (productId) =>
  `${host}/api/products/${productId}`;

// export const tariffcodeApi = `${host}/api/commodity/${query}`;
