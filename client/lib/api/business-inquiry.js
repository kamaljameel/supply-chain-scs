import axios from "axios";

import { businessinquiry } from "@/utils/apiRoutes";
const API_BASE_URL = businessinquiry;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const submitBusinessInquiry = async (formData) => {
  try {
    const response = await api.post(businessinquiry, formData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to submit business inquiry");
  }
};
