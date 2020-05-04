var path = require("path");
var fs = require("fs");
var express =require("./node_modules/express");
var app=express();
var bodyParser = require('./node_modules/body-parser');
var formidable = require('./node_modules/formidable');
const child_process = require('child_process');
var FormData = require('form-data');
var url = require('url');
var axios = require('axios');
var pic = 2;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get('/text', function (req, res) {
  res.render('index');
})
app.get('/textdetection', function (req, res) {
  //console.log("textdetection");
  res.setHeader("Access-Control-Allow-Origin", "*");  // 设置可访问的源
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 解析 url 参数
  var params = url.parse(req.url, true).query;
  hostServer = params.url;
  picnum=params.name;
  dest=params.destiation;

 //console.log(hostServer);
 //console.log(picnum);
 //console.log(__dirname+"/public/yzm/"+picnum+".png");
  var form = new FormData();
  form.append('upload', fs.readFileSync(__dirname+"/public/yzm/"+picnum+".png"), "yzm/"+picnum+".png");
  var formHeaders = form.getHeaders();
  var start_T = new Date().getTime();
  axios.post("http://"+hostServer+"/"+dest, form, {
    headers:formHeaders,
  }).then(function (response){
    //console.log("success");
    var end_T = new Date().getTime();
    cost = end_T-start_T;
    res.write(cost+":");
    res.write(response.data);
    res.end();
    //console.log(response.data);
  }).catch(function (error){
    //console.log("fail");
    var end_T = new Date().getTime();
    cost = end_T-start_T;
    res.write(cost+":");
    res.write("fail");
    res.end();
  })
})

app.listen(3001, function () {
  console.log('app listening on port 3001!')
})
