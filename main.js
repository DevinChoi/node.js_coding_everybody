var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id; // 의미 있는 이름
    // console.log(title);
    if(_url == '/'){
      // _url = '/index.html';
      title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
      // 2021 변경된 코드
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200);
    // console.log(__dirname + url);
    fs.readFile(`data/${title}`,'utf8', function(err, description){
      var template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ol>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ol>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
      response.end(template);
      // response.end(fs.readFileSync(__dirname + url));
                    // 여기 어떤 것을 넣냐에 따라 사용자에게 전송되는 것이 바뀐다!
                    // 아파치는 할 수 없고,
                    // nodejs,php,django,ruby는 할 수 있는.
    });

});
app.listen(3000); // localhost:3000
