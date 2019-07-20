export {getJavaMaxPage, jsTojavaPage, copyObject};

jsTojavaPage = function (pagination) {
    let str = "asc";
    if (pagination.descending) str = "desc";
    return {page: pagination.page-1, size: pagination.rowsPerPage, sort: pagination.sortBy + "," + str}
};

getJavaMaxPage = function () {
    return {page: 0, size: 9999999999}
};

const copyObject = function (source) {
    return JSON.parse(JSON.stringify(source));
};