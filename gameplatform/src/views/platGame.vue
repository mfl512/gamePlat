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
            this.userOpenid = localStorage.getItem('OPENID');
            this.loadConfigData();
        },
        data() {
            return {
                imgUrl:'http://10.0.0.24:8181/public/upload/img/',
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
                        title: '查看',
                        key: 'productStatus',
                        render: (h, params) => {
                            let status = params.row.productStatus
                            return h('div', [
                                h('span', {}, status == 0 ? '待审核' : (status == 1 ? "审核通过" : "审核未通过"))
                            ]);
                        }

                    },
                ],
                data1: [],
            }
        },
        methods: {
            loadConfigData() {
                util.postJsonData('/manager/product/listAllProduct', {
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

</style>
