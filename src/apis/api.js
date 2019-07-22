import axios from "axios";

let serverUri = "http://localhost:8089";

export default {
    getMenu: (type) => axios.get(`${serverUri}/menu/${type}`),
    logout: _ => axios.post(`${serverUri}/logout`),

    getSolutionList: (id, page) => axios.get(`${serverUri}/solution/${id}`, {
        params: page
    }),
    deleteSolution: (boardId) => axios.delete(`${serverUri}/solution/${boardId}`),
    getSolutionDetail: (menuId, boardId) => axios.get(`${serverUri}/solution/${this.menuId}/${this.boardId}`),
    addSolution: (solution) => axios.post(`${serverUri}/solution`, solution),
    updateSolution: (solution) => axios.put(`${serverUri}/solution`, solution),

    getGroup: _ => axios.get(`${serverUri}/group`),
    getGroupChild: (activeId, page) => axios.get(`${serverUri}/group/child/${activeId}`, {
        params: page
    }),
    updateGroup: (group) => axios.post(`${serverUri}/group`, group),
    addGroup: (group) => axios.put(`${serverUri}/group`, group),
    deleteGroup: (groupId) => axios.delete(`${serverUri}/group/${groupId}`),

    getAclList: (page) => axios.get(`${serverUri}/acl`, page),
    addAcl: (acl) => axios.post(`${serverUri}/acl`, acl),
    updateAcl: (acl) => axios.put(`${serverUri}/acl`, acl),
    deleteAcl: (aclId) => axios.delete(`${serverUri}/acl/${aclId}`),

    getAceList: (aclId, page) => axios.get(`${serverUri}/ace/${aclId}`, {
        params: page
    }),
    deleteAce: (aclId, aceId) => axios.delete(`${serverUri}/ace/${aclId}/${aceId}`),
    addAce: (ace) => axios.put(`${serverUri}/ace`, ace),

    getUserList: (page) => axios.get(`${serverUri}/user`, {
        params: page
    }),
    deleteUser : (userId) => axios.delete(`${serverUri}/user/${userId}`),
    addUser : (user) => axios.put(`${serverUri}/user`, user),
    updateUser : (user) => axios.post(`${serverUri}/user`, user),
    addAvatar : (formData) => axios.post(`${serverUri}/user/avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }),
    
    addQna : (menuId, subject, content) => axios.post(`${serverUri}/qna/register/${menuId}`, {
      "subject": subject,
      contents: content
    }),
    getQnaList: (id,page) => axios.get(`${serverUri}/qna/${id}`, { params: page }),
    deleteQna: (boardId) => axios.delete(`${serverUri}/qna/delete/${boardId}`),

    getSiteDeatil : (menuId, siteId, projectId, boardId) => 
        axios.get(`${serverUri}/site/${menuId}/${siteId}/${projectId}/${boardId}`),
    updateSiteBoard : (site) => axios.put(`${serverUri}/site/edit`, site),
    addSiteBoard :  (site) => axios.post(`${serverUri}/site/add`, site),

    getSiteList : (siteId) => axios.get(`${serverUri}/site/${siteId}`),
    addSite : (site) => axios.put(`${serverUri}/site`, site),
    deleteSite : (siteId) => axios.delete(`${serverUri}/site/${siteId}`)
}

