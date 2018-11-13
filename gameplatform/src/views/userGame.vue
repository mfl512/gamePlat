<template>
    <div>
        <Table stripe :columns="columns1" :data="data1"></Table>
        <div style="text-align: center;margin-top: 50px">
            <Button type="primary" long to="/addGame">添加游戏</Button>
        </div>
    </div>
</template>

<script>
    import util from '../libs/util';

    export default {
        created() {
            if(util.openid){
                this.userOpenid = util.openid;
            }else{
                let userInfo = localStorage.getItem('OPENID');
                if(userInfo && userInfo.openid){
                    this.userOpenid = userInfo.openid;
                    util.openid = userInfo.openid;
                }else{
                    this.$router.push({path:'/'});
                    return;
                }
            }
            this.loadConfigData();
        },
        data() {
            return {
                imgUrl: 'http://10.0.0.24:8181/public/upload/img/',
                userOpenid: '',
                columns1: [
                    {
                        title: '游戏名称',
                        key: 'productName'
                    },
                    {
                        title: '平台',
                        key: 'productPlatform'
                    },
                    {
                        title: '游戏图标',
                        key: 'productIcon',
                        render: (h, params) => {
                            return h('div', [
                                h('Img', {
                                    attrs: {
                                        src: params.row.productIcon,
                                    },
                                    style: {
                                        width: "80px"
                                    }
                                }),])
                        },
                    },
                    {
                        title: '联系人',
                        key: 'productContact'
                    },
                    {
                        title: '联系人电话',
                        key: 'productContactPhone'
                    },
                    {
                        title: '游戏二维码',
                        key: 'productCodeImg',
                        render: (h, params) => {
                            return h('div', [
                                h('Img', {
                                    attrs: {
                                        src: params.row.productCodeImg,
                                    },
                                    style: {
                                        width: "80px"
                                    }
                                }),])
                        },
                    },
                    {
                        title: '审核状态',
                        key: 'productStatus',
                        render: (h, params) => {
                            let status = params.row.productStatus
                            return h('div', [
                                h('span', {}, status == 0 ? '待审核' : (status == 1 ? "审核通过" : "审核未通过"))
                            ]);
                        }

                    },
                    {
                        title: '修改',
                        key: 'update',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                    },
                                    style: {
                                        marginRight: '10px',
                                        display: params.row.productStatus == 1 ? 'display' : 'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.update(params.index)
                                        }
                                    }
                                }, '修改'),
                                h('span', {
                                    style: {
                                        marginRight: '10px',
                                        display: params.row.productStatus != 1 ? 'display' : 'none'
                                    },
                                }, '--'),
                            ]);
                        }
                    },
                    {
                        title: '删除',
                        key: 'delete',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    style: {
                                        marginRight: '10px'
                                    },
                                    props: {
                                        type: 'error',
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }

                ],
                data1: [],
            }
        },
        methods: {
            remove(params) {
                console.log(params);
                let openidData = localStorage.getItem('OPENID');
                util.postJsonData('/manager/product/deleteProduct', {
                    productId: params.row.productId,
                    productOwner: openidData,
                    openid: openidData
                }, this, (data) => {
                    this.data1.splice(params.index, 1);
                });
            },
            update(index) {
                console.log(this.data1[index]);
                this.$router.push({path: '/update', name: 'update', params: this.data1[index]})
            },
            loadConfigData() {
                util.postJsonData('/manager/product/listProduct', {
                    openid: localStorage.getItem('OPENID')
                }, this, (data) => {
                    console.log(data);
                    this.data1 = data;
                });
            },
        }
    }
</script>

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
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
</style>
