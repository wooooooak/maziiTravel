const express = require('express');
const router = express.Router();

const url = require('url');

module.exports = function(app){
    app.use('/',router);
    
  }
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
      title: '여행',
      user : req.user
    });
});
/* GET test page. */
router.get('/test', function(req, res, next) {
  res.render('test', { 
      title: '여행',
      user : req.user
    });
});

router.get('/cities', function(req, res, next) {
  let title = '여행';
  if (!req.user) {
      console.log('사용자 인증 안된 상태임.');
      res.render('cities.ejs',{user:null,title:title});
    }else{
      if (Array.isArray(req.user)) {
        res.render('cities.ejs', {user: req.user[0]._doc,title:title});
    } else {
        res.render('cities.ejs', {user: req.user,title:title});
    }
  }
});

router.get('/:city',(req,res,next)=>{
  //url에서 도시 이름 구하기
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  let curUrl = url.parse(fullUrl);
  let cityName = removeSlash(curUrl.path);  //"HongKong"과 같은 도시 이름저장
  console.log(cityName);
  let title = '여행';
  if (!req.user) {
    console.log('사용자 인증 안된 상태임.');
    res.render('city_feed.ejs',{
      user : null,
      title : title,
      city : cityName
    });

  }else{
    if (Array.isArray(req.user)) {
      res.render('city_feed.ejs', {user: req.user[0]._doc,
        title : title,
        city : cityName
      });
  } else {
      res.render('city_feed.ejs', {user: req.user,
        title : title,
        city : cityName
      });
  }
}
});


// url의 pathname이 /seoul 으로 나오는 것을 seoul로 파싱
function removeSlash(pathname){
  let pathArr = Array.from(pathname).splice(1);
  let index = pathArr.indexOf('%');
  console.log(index);
  if(index===-1){
    return pathArr.join('');
  }else{
    pathArr.splice(index,3);
    return pathArr.join('');
  }

}
