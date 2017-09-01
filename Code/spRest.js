console.log("spRest.js");

var spRest = (function() {
    var restPath = _spPageContextInfo.webAbsoluteUrl + "/_api/web/";

    function restGetCall(path, callback) {
        console.log("Get: " + path);
        $.ajax({
            url: path,
            type: "Get",
            xhrFields: { withCredentials: true },
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) { callback(data); },
            error: function (data) { console.log("Error: " + data.responseText); }
        });
    }
    function getLists(callback) {
        var path = restPath + "Lists";
        restGetCall(path, callback);
    }
    function getListItems(listName, callback) {
        var path = restPath + `Lists/GetByTitle('${listName}')/items`;
        restGetCall(path, callback);
    }
    function getListItemsSelectColumns(listName, columns, callback) {
        var path = restPath + `Lists/GetByTitle('${listName}')/items?$select=` + columns.join();
        restGetCall(path, callback);
    }
    function getListItem(listName, listItemId, callback) {
        var path = restPath + `Lists/GetByTitle('${listName}')/items(${listItemId})`;
        restGetCall(path, callback);
    }
    function getListItemSelectColumns(listName, listItemId, columns, callback) {
        var path = restPath + `Lists/GetByTitle('${listName}')/items(${listItemId})?$select=` + columns.join();
        restGetCall(path, callback);
    }

    function restPostCall(path, item, callback) {
        console.log("Post: " + path);
        $.ajax({
            url: path,
            type: "Post",
            xhrFields: { withCredentials: true },
            headers: { "Accept": "application/json;odata=verbose", "X-RequestDigest": $("#__REQUESTDIGEST").val() },
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(item),
            success: function (data) { callback(data); },
            error: function (data) { console.log("Error: " + data.responseText); }
        });
    }
    function postListItem(listName, item, callback) {
        var path = restPath + `Lists/GetByTitle('${listName}')/items`;
        restPostCall(path, item, callback);
    }  

    return {
        getLists: getLists,
        getListItems: getListItems,
        getListItemsSelectColumns: getListItemsSelectColumns,
        getListItem: getListItem,
        getListItemSelectColumns: getListItemSelectColumns,
        postListItem: postListItem
    }
}());