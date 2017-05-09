function http_post(_url,data) {
    $.ajax({
        type: "post",
        contentType: "application/json",
        url: _url.indexOf("?") > 0 ? (_url + "&s=" + Math.random()) : _url + "?s=" + Math.random(), 
        data: JSON.parse(data),
        dataType: 'jsonp',
        success: function(result) {
            console.log(result);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
           console.error("post request error...");
        },
        complete: function(XMLHttpRequest, textStatus) {}
    })
}


function http_get(_url,_callback) {
    let result;
    $.ajax({
        async: true,
        type: "get",
        contentType: "application/json",
        url: _url.indexOf("?") > 0 ? (_url + "&s=" + Math.random()) : _url + "?s=" + Math.random(), 
        dataType: 'jsonp',
        success: function(result) {
           _callback(result);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.error("get request error...");
        },
        complete: function(XMLHttpRequest, textStatus) {}
    })
}