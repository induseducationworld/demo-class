const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://coaching-class.onrender.com"
    : "http://localhost:5000";

export default BASE_URL;
