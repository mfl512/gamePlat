import axios from 'axios';
import qs from 'qs';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let util = {
    rootUrl:'http://10.0.0.24:81',
    openid:'',
    token:'',
    nickname:'',
    info:{}
};
util.title = function (title) {
    title = title ? title + ' - 游戏资源交流' : '游戏资源交流';
    window.document.title = title;
};
util.get=function(router,params,cb){
    axios.get(`${this.rootUrl}${router}`, {params: params}).then(res=>{
        cb(res.data);
    }).catch(function (error) {
        console.error(error);
    });
};
util.post=function(router,params,cb){
    axios.post(`${this.rootUrl}${router}`, qs.stringify(params), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res=>{
        cb(res.data);
    }).catch(function (error) {
        console.error(error);
    });
};
//自动处理服务端post返回的code数据
util.postJsonData=function(router,params,_this,cb){
    this.post(router,params,(data)=>{
        console.log(data);
        if(data.code===200){
            cb(data.data);
        }else{
            _this.$Message.error(data.msg);
        }
    });

};
//自动处理服务端get返回的code数据
util.getJsonData=function(router,params,_this,cb){
    this.get(router,params,(data)=>{
        if(data.code===200){
            cb(data.data);
        }else{
            _this.$Message.error(data.msg);
        }
    });
};
util.postAdminJsonData=function(router,params,_this,cb){
    this.postJsonData(router,Object.assign(params,{openid:this.openid,token:this.token}),_this,cb);
};

util.getAdminJsonData=function(router,params,_this,cb){
    this.getJsonData(router,Object.assign(params,{openid:this.openid,token:this.token}),_this,cb);
};
export default util;
