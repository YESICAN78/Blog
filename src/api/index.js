import axios from 'axios';
import BaseUrl from '../../utls/baseUrl'
const url = 'http://localhost:8989'
//配置参数
axios.defaults.baseURL = BaseUrl;//默认访问地址
axios.defaults.withCredentials = true; //跨域允许携带cookie
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"; //设置POST请求格式
export default {
  //获取Info
  getarticleifo() {
    return axios.post('/article/getInfo')//返回的是Promise
  },
  //获取热门文章接口
  /**
   * @parmas
   *  limit :Number ,一共请求的数据 默认是8 
   * @return 
   *   返回的是axios 请求的Promise 
   * */ 
  getarticlehot(limit=8) {
    return axios.post('/article/getHot',{limit})
  },
  //获取所有的文章
  getarticleShow: (function () {
    let skip = 0;
    let limit = 5;
    return function (index = 0, ifFresh=false) {
      if (ifFresh) {
        skip = 0;
        limit = 5;
      }
      let tag = ["", "HTML&CSS", "JavaScript", "Node", "Vue", "Other"][index]
      let data = { skip, limit, tag };
      skip += limit;
      limit += +2;
      return axios.post('/article/getShow', data)
    }
  })(),
 //获取单篇文章的信息
 getArticle(id){
   return axios.post('/article/',{id})
 },
  //点赞博主文章
  Pv(aid,userid){
    return axios.post('/article/postpv',{aid,userid})
  }, 
 //搜索接口
 getArticleSearch(keywords){
   return axios.post('/article/search',{keywords})
 },
  //获取验证码图片
  getregistervcode(){
    return axios.post('/register/vcode')
  },
  //验证码失去焦点时的验证码
  getCheckVcode(vcode){
    return axios.post('/register/CheckVcode',{vcode})
  },
  //注册提交
  /**
   * userdata : object  数据必须是 {user,password,vcode}
   * */ 
  postRegister(regstdata){
   return axios.post('/register/register',regstdata)
  },

  //登录的接口
  postLogin(logindata){
   return axios.post('/login/login',logindata)
  },
  //最近访客接口
  RecentVisitors(){
    return axios.post('/visitor')
  },
  //判断用户是否登录的接口
  postifLogin(){
    return axios.post('/login/iflogin')
  },
  //退出登录的接口
 postSingout(){
  return axios.post('/setuserdata/Signout')
},
  //获取手机验证码的接口
  postgetphonvcode(phone){
     return axios.post('/setuserdata/produce',{phone})
  },
  //提交修改的信息
  postSubmituserInfo(Setforminfo){
    return axios.post('/setuserdata/setinfo',Setforminfo)
  },
  //上传头像的接口
  postUploadphoto(){
   return axios.post('/setuserdata/uploadephoto')
  },
  //发表博主发表文章的详情页面的留言
  getArticleMassage({userid,content,aid}){
    return axios.post('/message/commitmassage',{userid,content,aid})
  },
  //发表文章留言的留言
  Postcomitsonmassage(options){
    return axios.post('/message/commitSonmassage',options)
  },
  //获取博主文章的留言
  getArticleMassages(aid,skip=0,limit=5){
    return axios.post('/message/getarticlemassage',{aid,skip,limit})
  },
  //留言相关的接口options：{user:"",content:""}
  CommitMassage(options){//提交留言
    return axios.post('/message/commit',options)
  },
  //提交留言的留言options:{parentId:"id",user:"id",content:"",usermin:""}
  Replymessage(options){
   return axios.post('/message/Replymessage',options)
  },
  //获取留言信息
  getMassageShow(skip=0,limit=5){
    return axios.post('/message/getList',{skip,limit})
  },





  //论坛相关的接口
  //发布文章
  PostArticle({title,content,forumface,userid}){
    return axios.post('/forum/postArticle',{title,content,forumface,userid})
  },
  //获取论坛文章
  PostgetArticle(skip=0,limit=5){
    return axios.post("/forum/getaricle",{skip,limit})
  },
  //评论论坛文章的留言
  PostArticleMsg(options){
    return axios.post("/articlemsg/massage",options)
  },
  //提交子留言的接口
  PostArticleMsgMin(options){
    return axios.post("/articlemsg/massagemin",options)
  },
  //获取该篇文章的留言信息
  getforumMsg({aid,skip=0,limit=0}){
    return axios.post('/articlemsg/getmassage',{aid,skip,limit})
  },
  
  //获取用户的信息
  getUserInfo(id){
    return axios.post("/articlemsg/userInfo",{id})
  },
  //获取用户自己发表的文章
  getForumArticle(userid,skip=0,limit=5){
    return axios.post("/articlemsg/getArticle",{userid,skip,limit})
  },
  //编辑文章
  PostEditArticle(id){
    return axios.post("/articlemsg/editarticle",{id})
  },
  //用户删除自己发表的文章
  deletefoorumarticle(id,userid){
  return axios.post("/articlemsg/deletearticle",{id,userid})
  },
  //点击收藏更新收藏的数量
  Updatacollarticle(aid,userid){
    return axios.post("/articlemsg/updataarticle",{aid,userid})
  },
  //收藏数据的接口
  PostCollectionArticle(userid,skip=0,limit=5){
    return axios.post('/articlemsg/getCoollarticle',{userid,skip,limit})
  },
  //删除收藏数据的接口
  PostDeleteCooletion(aid,userid){
    return axios.post("/articlemsg/deletecooletionarticle",{aid,userid})
  },
  //点赞量的接口
  Postpv(aid,userid){
    return axios.post("/articlemsg/addpv",{aid,userid})
  },
  //详情页面接口
  Postdetails(aid){
    return axios.post("/articlemsg/details",{aid})
  },
  PostArticleNum(aid){
    return axios.post("/articlemsg/postArticleNum",{aid})
  },
  //日记相关接口
  getDiray(skip=0,limit=5){
    return axios.post('/diray/getdiray',{skip,limit})
  },
//获取友链
getLinks(){
  return axios.get('/link/getlinks')
}
};

