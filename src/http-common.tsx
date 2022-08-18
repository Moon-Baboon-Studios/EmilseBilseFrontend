import axios from "axios";
export default axios.create({
    baseURL: process.env.REACT_APP_API !== undefined ? process.env.REACT_APP_API : "http://localhost:5121/",
    headers: {
        "autherization": "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json"
    }
});