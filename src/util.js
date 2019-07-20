const jsTojavaPage = function (pagination) {
    let str = "asc";
    if (pagination.descending) str = "desc";
    return {page: pagination.page-1, size: pagination.rowsPerPage, sort: pagination.sortBy + "," + str}
};

const getJavaMaxPage = function () {
    return {page: 0, size: 9999999999}
};

const catchPromise = function (error) {
    if(typeof error.response === 'undefined')
        openError(error.message);
    else if(typeof error.response.data !== 'undefined')
        openError(error.response.data);
    else
        openError(error.response);
};

const copyObject = function (source) {
    return JSON.parse(JSON.stringify(source));
};