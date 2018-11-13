<template>
    <div>
        <Table stripe :columns="columns1" :data="data1"></Table>
        <Modal
                title="Title"
                v-model="isShowModal"
                class-name="vertical-center-modal">
            <Form style="width:800px;margin:auto;" ref="formValidate"  :model="formValidate" :label-width="100">
                <FormItem label="平台:" prop="productPlatform">
                    <span >{{formValidate.productPlatform}}</span>
                </FormItem>
                <FormItem label="游戏名称:" prop="productName">
                    <span >{{formValidate.productName}}</span>
                </FormItem>
                <FormItem label="游戏图标:" prop="productIcon">
                    <img :src="formValidate.productIcon"/>
                </FormItem>
                <FormItem label="联系人:">
                    <span>{{formValidate.productContact}}</span>
                </FormItem>
                <FormItem label="联系电话:">
                    <span >{{formValidate.productContactPhone}}</span>
                </FormItem>
                <FormItem label="游戏二维码:">
                    <img :src="formValidate.productCodeImg"/>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button  type="primary" @click="confirmFun('formValidate')">确认通过</Button>
                <Button type="error" @click="failFun('formValidate')">审核不通过</Button>
                <Button  @click="close()">取消</Button>
            <!--<Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button>-->
        </div>
        </Modal>
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
                formValidate: {
                    productName: '',
                    productPlatform: '',
                    productIcon: '',
                    productContact: '',
                    productContactPhone: '',
                    productCodeImg: '',
                    productId:''

                },
                imgUrl: 'http://10.0.0.24:8181/public/upload/img/',
                userOpenid: '',
                isShowModal: false,
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
                        title: '审核',
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
                                            this.check(params)
                                        }
                                    }
                                }, '审核')
                            ]);
                        }
                    }
                ],
                data1: [],
            }
        },
        methods: {
            check(params) {
                console.log(params);
                this.isShowModal = true;
                this.formValidate.productName = params.row.productName;
                this.formValidate.productPlatform = params.row.productPlatform;
                this.formValidate.productIcon = params.row.productIcon;
                this.formValidate.productContact = params.row.productContact;
                this.formValidate.productContactPhone = params.row.productContactPhone;
                this.formValidate.productCodeImg = params.row.productCodeImg;
                this.formValidate.productId = params.row.productId;
                console.log(this.formValidate.productPlatform);
            },
            loadConfigData() {
                util.postJsonData('/admin/productOpt/productList', {
                    loginId: localStorage.getItem('LOGINID'),
                    productStatus: 0
                }, this, (data) => {
                    console.log(data);
                    this.data1 = data.products;
                });
            },
            confirmFun(param){
                util.postJsonData('/admin/productOpt/dealApply', {
                    loginId:localStorage.getItem('LOGINID'),
                    productId:this.formValidate.productId,
                    productStatus: 1
                }, this, (data) => {
                    this.close();
                    this.$Notice.success({
                        title: 'Notification',
                        desc: '审核通过成功. '
                    });
                });
            },
            failFun(param){
                util.postJsonData('/admin/productOpt/dealApply', {
                    loginId:localStorage.getItem('LOGINID'),
                    productId:this.formValidate.productId,
                    productStatus: -1
                }, this, (data) => {
                    this.close();
                    this.$Notice.success({
                        title: 'Notification',
                        desc: '审核不通过. '
                    });
                });
            },
            close(){
                this.isShowModal = false;
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
