import axios from "axios";

let serverUri = "http://localhost:8089";

export default {
    getMenu: (type) => axios.get(`${serverUri}/menu/${type}`),
    logout: axios.post(`${serverUri}/logout`),
    getSolutionList: (id, page) => axios.get(`${serverUri}/solution/${id}`, {
        params: page
    }),
    deleteSolution: (boardId) => axios.delete(`/solution/${boardId}`),
    getGroup: axios.get(`${serverUri}/group`),
    getGroupChild: (activeId, page) => axios.get(`${serverUri}/group/child/${activeId}`, {
        params: page
    }),
    updateGroup : (group) => axios.post(`${serverUri}/group`, group),
    addGroup : (group) => axios.put(`${serverUri}/group`, group),
    deleteGroup : (groupId) => axios.delete(`${serverUri}/group/${groupId}`)
}

