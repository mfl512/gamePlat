webpackJsonp([3],{50:function(t,e,o){o(60);var r=o(18)(o(56),o(67),"data-v-2dcabad0",null);r.options.__file="D:\\web\\gamemanagerplatform\\src\\views\\gameManager.vue",r.esModule&&Object.keys(r.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] gameManager.vue: functional components are not supported with templates, they should use render functions."),t.exports=r.exports},56:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=o(6);e.default={created:function(){console.log("进入这里"),this.userOpenid=localStorage.getItem("LOGINID"),this.loadConfigData()},data:function(){return{imgUrl:"http://10.0.0.24:8181/public/upload/img/",userOpenid:"",columns1:[{title:"游戏名称",key:"productName"},{title:"平台",key:"productPlatform"},{title:"游戏图标",key:"productIcon",render:function(t,e){return t("div",[t("Img",{attrs:{src:e.row.productIcon},style:{width:"80px"}})])}},{title:"联系人",key:"productContact"},{title:"联系人电话",key:"productContactPhone"},{title:"游戏二维码",key:"productCodeImg",render:function(t,e){return t("div",[t("Img",{attrs:{src:e.row.productCodeImg},style:{width:"80px"}})])}},{title:"审核状态",key:"productStatus",render:function(t,e){e.row.productStatus;return t("div",[t("span",{},"审核通过")])}}],data1:[]}},methods:{loadConfigData:function(){var t=this;r.a.postJsonData("/admin/productOpt/productList",{loginId:localStorage.getItem("LOGINID"),productStatus:1},this,function(e){console.log(e),t.data1=e.products})}},watch:{"$router.params.status":"loadConfigData",$route:"loadConfigData"}}},60:function(t,e){},67:function(t,e,o){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("Table",{attrs:{stripe:"",columns:t.columns1,data:t.data1}})],1)},staticRenderFns:[]},t.exports.render._withStripped=!0}});