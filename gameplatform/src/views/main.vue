<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }

    .layout-nav {
        width: 700px;
        margin: 0 auto;
        margin-right: 20px;
    }
</style>
<template>
    <Layout>
        <Header>
            <Menu mode="horizontal" theme="dark" active-name="1">
                <!--<div class="layout-logo"></div>-->
                <div class="layout-nav">
                    <MenuItem name="1">
                        <Icon type="ios-navigate"></Icon>
                        欢迎您：{{this.userOpenid}}
                    </MenuItem>
                    <MenuItem name="2" to="/changePwd">
                        <Icon type="ios-keypad"></Icon>
                        修改密码
                    </MenuItem>
                    <MenuItem name="3" to="/changeInfo">
                        <Icon type="ios-paper"></Icon>
                        信息修改
                    </MenuItem>
                    <MenuItem name="4"  to="/">
                        <Icon type="ios-analytics"></Icon>
                        退出
                    </MenuItem>
                    <!--<MenuItem name="4">-->
                    <!--<Icon type="ios-paper"></Icon>-->
                    <!--Menu 4-->
                    <!--</MenuItem>-->
                </div>
            </Menu>
        </Header>
        <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
                <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']">
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>

                        </template>
                        <MenuItem name="1-1" to='/main/userGame'>用户游戏信息</MenuItem>
                        <MenuItem name="1-2" to="/main/platGame">平台游戏信息</MenuItem>
                    </Submenu>
                </Menu>
            </Sider>
            <Layout :style="{padding: '0 24px 24px'}">
                <Breadcrumb :style="{margin: '24px 0'}">
                    <BreadcrumbItem>游戏管理</BreadcrumbItem>
                </Breadcrumb>
                <Content :style="{padding: '24px', minHeight: '770px', background: '#fff'}">
                    <router-view/>
                </Content>
            </Layout>
        </Layout>
    </Layout>
</template>
<script>
    import util from '../libs/util';

    export default {
        name: 'gameManager',
        data(){
            return {
                userOpenid:''
            }
        } ,
        created() {
            this.userOpenid = util.nickname;
        },

    }

</script>
