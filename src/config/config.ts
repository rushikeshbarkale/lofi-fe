export const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;

const isDevelopment = import.meta.env.MODE === "local";

// Set API base URL dynamically
const BASE_API_URL = isDevelopment
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL_PROD;

// Append `/api/music` dynamically
export const API_URL = `${BASE_API_URL}api/music`;