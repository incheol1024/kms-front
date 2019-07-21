import axios from "axios";

let serverUri = "http://localhost:8089";

export default{
    getMenu : (type) => axios.get(`${serverUri}/menu/${type}`),
    logout : axios.post(`${serverUri}/logout`)
}

