import { host } from "./apiHost";
import axios from "axios";

const API_BASE_URL = `${host}/api/business`;
const api = axios.create({
  baseURL: API_BASE_URL,
});

const API_BASE_URL_inquiry = `${host}/api/inquiry`;
const apiInquiry = axios.create({
  baseURL: API_BASE_URL_inquiry, // ✅ Corrected key
});
// Function to get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("abisolToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
// API functions
export const createBusiness = async (businessData) => {
  return api.post("/create", businessData, { headers: getAuthHeaders() });
};

export const getBusinesses = async () => {
  return api.get("/", { headers: getAuthHeaders() });
};

export const getBusinessById = async (id) => {
  return api.get(`/${id}`, { headers: getAuthHeaders() });
};

export const updateBusiness = async (id, updatedData) => {
  return api.put(`/${id}`, updatedData, { headers: getAuthHeaders() });
};

export const deleteBusiness = async (id) => {
  return api.delete(`/${id}`, { headers: getAuthHeaders() });
};
// inquires
export const getInquiries = async () => {
  return apiInquiry.get("/", { headers: getAuthHeaders() });
};

export const editInquiryApi = async (inquiryId, updatedData) => {
  return apiInquiry.put(`/edit/${inquiryId}`, updatedData, {
    headers: getAuthHeaders(),
  });
};
export const getInquiryById = async (id) => {
  return apiInquiry.get(`/${id}`, { headers: getAuthHeaders() });
};

export const deleteInquiry = async (id) => {
  return apiInquiry.delete(`/${id}`, { headers: getAuthHeaders() });
};

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
export const portOfLoadingApi = `${host}/api/portOfLoading`;
export const portOfDischargeApi = `${host}/api/portOfDischarge`;
export const paymentTermsApi = `${host}/api/paymentTerms`;
export const paymentMethodApi = `${host}/api/paymentMethod`;
export const varianceTermsApi = `${host}/api/varianceTerms`;
export const shippingTermsApi = `${host}/api/shippingTerms`;
export const shippingMethodApi = `${host}/api/shippingMethod`;
export const pdfsApi = `${host}/api/pdfs`;
export const sendpdfToEmailApi = `${host}/api`;
export const checkEORIApi = `${host}/api/check-multiple-eori`;
export const savedFormApi = `${host}/api/save`;

export const addProductToListApi = `${host}/api/inquiry/add-product-to-list`;

// New route for updating a product
export const updateProductApi = `${host}/api/products`;

export const deletProductApi = `${host}/api/products`;

export const deletesaveFormApi = (inquiryId) =>
  `${host}/api/remove/${inquiryId}`;

export const deletExternalProductApi = (productId) =>
  `${host}/api/products/${productId}`;

export const getUserInquiryListApi = (userId) => `${host}/api/list/${userId}`;

// file list
export const uploadFileApi = `${host}/api/upload`;
export const fetchFileApi = `${host}/api/files`;
export const deleteFileApi = (id) => `${host}/api/delete/${id}`;

export const downloadFileApi = (id) => `${host}/api/download/${id}`;
// export const ApiINQUIRY = `${host}/api/inquiry`;

// export const tariffcodeApi = `${host}/api/commodity/${query}`;
