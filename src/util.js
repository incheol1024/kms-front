export { getJavaMaxPage, jsTojavaPage, copyObject};

let jsTojavaPage = function jsTojavaPage(pagination) {
    if(pagination.sortBy.length == 0)
        return {page: pagination.page-1, size: pagination.itemsPerPage}
    let str = "asc";
    if (pagination.sortDesc[0]) str = "desc";
    return {page: pagination.page-1, size: pagination.itemsPerPage, sort: pagination.sortBy[0] + "," + str}
};

let getJavaMaxPage = function getJavaMaxPage() {
    return {page: 0, size: 9999999999}
};

let copyObject = function copyObject(source) {
    return JSON.parse(JSON.stringify(source));
};