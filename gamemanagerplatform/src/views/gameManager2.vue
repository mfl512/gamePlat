<template>
    <div>
        <Table stripe :columns="columns1" :data="data1"></Table>
    </div>
</template>

<script>
    import util from '../libs/util';

    export default {
        created() {
            console.log('进入这里');
            this.userOpenid = localStorage.getItem('LOGINID');
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
                                h('span', {
                                    style:{
                                        color:'red',
                                    }
                                }, "审核未通过")
                            ]);
                        }

                    },


                ],
                data1: [],
            }
        },
        methods: {
            loadConfigData() {
                util.postJsonData('/admin/productOpt/productList', {
                    loginId: localStorage.getItem('LOGINID'),
                    productStatus: -1
                }, this, (data) => {
                    console.log(data);
                    this.data1 = data.products;
                });
            },
        },
        watch: {
            '$router.params.status':'loadConfigData',
            '$route': 'loadConfigData'
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
