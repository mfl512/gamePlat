<template>
    <div class="layout">
        <Layout>
            <Header>
                <div class="layout-nav-left">
                    <Icon type="md-git-compare"/>
                    游戏交换
                </div>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-nav" v-if="!isLogin">
                        <MenuItem name="1">
                            首页
                        </MenuItem>
                        <MenuItem name="2">
                            登录
                        </MenuItem>
                        <MenuItem name="3">
                            注册
                        </MenuItem>
                    </div>
                    <div class="layout-nav" v-else>
                        <MenuItem name="1">
                            首页
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-contact"/>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content class="content">
                <div class="content-top">
                    <div class="content-top-left">
                        <img class="content-img" src="../images/HDlogo.png"/>
                    </div>
                    <div class="content-text">
                        <div>
                            <span class="content-text-change">换</span>
                            无止境<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span class="content-text-change">换</span>
                            无限量
                        </div>
                    </div>
                    <div class="content-top-button">

                    </div>
                </div>
                <div class=content-center>
                    <div class="content-line"></div>
                    <i-input placeholder="Enter text" style="width: 400px;margin-right:100px;display:block;">
                        <icon type="ios-search" slot="suffix"/>
                    </i-input>
                </div>
                <div class="content-bottom">
                    <div class="game-list">
                        <div class="game-item" v-for="item in gameList"
                             v-on:mouseover="mouseroverFunc(item,this)" v-on:mouseout="item.isVisible = false">
                            <div v-if="!item.isVisible">
                                <img src='../images/HDlogo.png'
                                     style="width:80px;height:80px; border-radius: 100px;"/><br/>
                                <span class="content-bottom-text">{{item.name}}</span><br/>
                                <span class="content-bottom-text">{{item.productContact}}{{item.productContactPhone}}</span>
                            </div>
                            <div v-else class="QR-item">
                                <img src='../images/HDlogo.png' style="width:120px;height:120px;">
                            </div>
                        </div>
                    </div>

                </div>
            </Content>
            <Footer>Footer</Footer>
        </Layout>
    </div>
</template>
<script>
    import util from '../libs/util';

    export default {
        name: 'index',

        mounted() {
            this.loadConfigData();
        },
        data() {
            return {
                isLogin: false,
                gameList: [{
                    url: '',
                    name: '挑战荒岛',
                    productContact: '王先生',
                    productContactPhone: '15084744220',
                    isVisible: false
                }
                ],
                defaultGameList: []
            };
        },
        method: {
            mouseroverFunc(item, data) {
                console.log(item, data)
            },
            loadConfigData() {
                util.postJsonData('/home/show', function (data) {
                    console.log(data);
                })
            },
        },
        // mounted(){
        //
        // },

    }
</script>
<style scoped>
    .layout .ivu-layout {
        height: 100%;
        width: 100%;
        position: absolute;
    }

    .ivu-layout-header {
        display: flex;
        /*flex-direction: row;*/
        height: 7%;
    }

    .content.ivu-layout-content {
        height: 83%;
        width: 100%;
        background-color: #596277;
        /*position: absolute;*/
        /*margin-top: 64px;*/
    }

    .ivu-layout-footer {
        background-color: #373d41;
        /*position: absolute;*/
        width: 100%;
        height: 10%;

    }

    .ivu-menu.ivu-menu-dark.ivu-menu-horizontal {
    }

    span {
        color: #ffffff;
    }

    .layout-nav-left {
        width: 240px;
        margin: 0 auto;
        margin-left: 20px;
        color: #ffffff;
    }

    .layout-nav {
        width: 240px;
        margin: 0 auto;
        margin-right: 20px;
    }

    .content-top {
        text-align: center;
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 45%;
        /*position: ab;*/
    }

    .content-center {
        width: 100%;
        height: 7%;
    }

    .content-line {
        /*margin-top: 0px;*/
        width: 100%;
        height: 1px;
        background-color: #000000;
    }

    .content-bottom {
        width: 70%;
        height: 48%;
        margin: auto;
        background-color: #5b6270;
        overflow: auto;
    }

    .game-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        flex-direction: row;
    }

    .game-item {
        flex: 1;
        min-width: 214px;
        height: 180px;
        text-align: center;
        font-family: "Microsoft YaHei";
    }

    QR-item {
        width: 100%;
        height: 180px;
        background-color: #ffffff;
    }

    .content-bottom-text {
        text-align: center;
    }

    ::-webkit-scrollbar {
        width: 8px;
        height: 16px;
        background-color: #5b6270;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, .3);
        background-color: #6b6b6b;
    }

    .content-top-left {
        width: 50%;
    }

    .content-img {
        width: 200px;
        height: 200px;
        border-radius: 100px;
        opacity: 0.8;
    }

    .content-text {
        font-size: 50px;
        color: #ffffff;
    }

    .content-text-change {
        font-size: 80px;
        font-family: 楷体;
    }

</style>
