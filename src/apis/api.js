import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8089';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default {
    getMenu: (type) => axios.get(`menu/${type}`),
    login : (bodyFormData) => axios.post(`login`,bodyFormData),
    logout: _ => axios.post(`logout`),

    getSolutionList: (id, page) => axios.get(`solution/${id}`, {
        params: page
    }),
    deleteSolution: (boardId) => axios.delete(`solution/${boardId}`),
    getSolutionDetail: (menuId, boardId) => axios.get(`solution/${this.menuId}/${this.boardId}`),
    addSolution: (solution) => axios.post(`solution`, solution),
    updateSolution: (solution) => axios.put(`solution`, solution),

    getGroup: _ => axios.get(`group`),
    getGroupChild: (activeId, page) => axios.get(`group/child/${activeId}`, {
        params: page
    }),
    updateGroup: (group) => axios.post(`group`, group),
    addGroup: (group) => axios.put(`group`, group),
    deleteGroup: (groupId) => axios.delete(`group/${groupId}`),

    getAclList: (page) => axios.get(`acl`, page),
    addAcl: (acl) => axios.post(`acl`, acl),
    updateAcl: (acl) => axios.put(`acl`, acl),
    deleteAcl: (aclId) => axios.delete(`acl/${aclId}`),

    getAceList: (aclId, page) => axios.get(`ace/${aclId}`, {
        params: page
    }),
    deleteAce: (aclId, aceId) => axios.delete(`ace/${aclId}/${aceId}`),
    addAce: (ace) => axios.put(`ace`, ace),

    getUserList: (page) => axios.get(`user`, {
        params: page
    }),
    deleteUser: (userId) => axios.delete(`user/${userId}`),
    addUser: (user) => axios.put(`user`, user),
    updateUser: (user) => axios.post(`user`, user),
    addAvatar: (formData) => axios.post(`user/avatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    }),

    addQna: (menuId, subject, content) => axios.post(`qna/register/${menuId}`, {
        "subject": subject,
        contents: content
    }),
    getQnaList: (id, page) => axios.get(`qna/${id}`, { params: page }),
    deleteQna: (boardId) => axios.delete(`qna/delete/${boardId}`),

    getSiteDeatil: (menuId, siteId, projectId, boardId) =>
        axios.get(`site/${menuId}/${siteId}/${projectId}/${boardId}`),
    updateSiteBoard: (site) => axios.put(`site/edit`, site),
    addSiteBoard: (site) => axios.post(`site/add`, site),

    getSiteList: (siteId) => axios.get(`site/${siteId}`),
    addSite: (site) => axios.put(`site`, site),
    deleteSite: (siteId) => axios.delete(`site/${siteId}`),
    getSiteProjectList: (menuId, siteId, page) => axios.get(`site/${menuId}/${siteId}`, {
        params: page
    }),
    addSiteProject: (siteId, project) => axios.put(`site/${siteId}`, project),
    deleteSiteProject: (siteId, projectId) => axios.delete(`site/${siteId}/${projectId}`),
    getSiteProjectBoardList: (menuId, siteId, projectId, page) => axios.get(`site/${menuId}/${siteId}/${projectId}`, {
        params: page
    }),
    deleteSiteProjectBoard: (siteId,projectId,boardId) => axios.delete(`site/${siteId}/${projectId}/${boardId}`),

    getCommentList: (qid, pageNumber, size, sort) => axios.get(`comment/list/${qid}`, {
        params: {
            page: pageNumber - 1,
            "size": size,
            "sort": sort
        }
    }),
}

