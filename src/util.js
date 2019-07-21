export { getJavaMaxPage, jsTojavaPage, copyObject};

let jsTojavaPage = function jsTojavaPage(pagination) {
    let str = "asc";
    if (pagination.descending) str = "desc";
    return {page: pagination.page-1, size: pagination.rowsPerPage, sort: pagination.sortBy + "," + str}
};

let getJavaMaxPage = function getJavaMaxPage() {
    return {page: 0, size: 9999999999}
};

let copyObject = function copyObject(source) {
    return JSON.parse(JSON.stringify(source));
};