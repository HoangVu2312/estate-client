import axios from "axios";

const instance = axios.create({
    baseURL: "https://estate-utopia-server.onrender.com",
});

export default instance;
