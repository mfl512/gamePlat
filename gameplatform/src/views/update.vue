<style scoped>
    .demo-upload-list {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>


<template>
    <Form style="width:800px;margin:auto;margin-top:150px;" ref="formValidate" :model="formValidate" :label-width="100">
        <FormItem label="平台" prop="plat">
            <Input v-model="formValidate.plat" placeholder="微信/QQ"></Input>
        </FormItem>
        <FormItem label="游戏名称" prop="gameName">
            <Input v-model="formValidate.gameName" placeholder="跳一跳"></Input>
        </FormItem>

        <FormItem label="游戏图标" prop="gameIcon">
            <div class="demo-upload-list" v-for="item in formValidate.gameIcon">
                <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleIconView(item.name)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleIconRemove(item)"></Icon>
                    </div>
                </template>
                <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
            </div>
            <Upload
                    ref="uploadIcon"
                    :show-upload-list="false"
                    :default-file-list="defaultIconList"
                    :on-success="handleIconSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleIconBeforeUpload"
                    type="drag"
                    action="http://10.0.0.24:81/upload"
                    style="display: inline-block;width:58px;"
                    v-if="isShowCamera(formValidate.gameIcon)">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20" ></Icon>
                </div>
            </Upload>
            <Modal title="View Image" v-model="formValidate.iconVisible">
                <img :src="imgUrl+ formValidate.IconName " v-if="formValidate.iconVisible" style="width: 100%">
            </Modal>
        </FormItem>
        <FormItem label="联系人">
            <Input v-model="formValidate.name" placeholder="李四"></Input>
        </FormItem>
        <FormItem label="联系电话">
            <Input v-model="formValidate.tel" placeholder=""></Input>
        </FormItem>
        <FormItem label="游戏二维码">
            <div class="demo-upload-list" v-for="item in formValidate.QRcode">
                <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                </template>
                <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
            </div>
            <Upload
                    ref="uploadQRCode"
                    :show-upload-list="false"
                    :default-file-list="defaultQRCodeList"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    type="drag"
                    action="http://10.0.0.24:81/upload"
                    style="display: inline-block;width:58px;"
                    v-if="isShowCamera(formValidate.QRcode)">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20" ></Icon>
                </div>
            </Upload>
            <Modal title="View Image" v-model="formValidate.QRCodeVisible">
                <img :src="imgUrl + formValidate.QRCodeName " v-if="formValidate.QRCodeVisible" style="width: 100%">
            </Modal>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">确认修改</Button>
            <Button to="/main/userGame" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
</template>
<script>
    import util from '../libs/util';
    export default {
        name: "update",
        created(param) {
            this.renderData();
        },
        data() {
            return {
                formValidate: {
                    plat: '',
                    gameName: '',
                    gameIcon: [],
                    name: '',
                    tel: '',
                    QRcode: [],
                    QRUrl:'',
                    iconUrl: '',
                    QRCodeVisible: false,
                    iconVisible:false,
                    QRCodeName:'',
                    IconName:'',
                },
                productId:'',
                iconImgStatus:0,
                codeImgStatu:0,
                defaultQRCodeList:[],
                defaultIconList:[],
                imgUrl:'http://10.0.0.24:8181/public/upload/img/',
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate(function (valid) {
                    if (valid) {
                        let data = {
                            productName: this.formValidate.gameName,
                            productPlatform: this.formValidate.plat,
                            productIcon:this.formValidate.QRcode[0].name,
                            productContact:this.formValidate.name,
                            productContactPhone:this.formValidate.tel,
                            productCodeImg:this.formValidate.gameIcon[0].name,
                            productId:this.productId,
                            iconImgStatus:this.iconImgStatus,
                            codeImgStatus:this.codeImgStatu,
                            openid: localStorage.getItem('OPENID')
                        };
                        console.log('点击了这里',data);
                        util.postJsonData('/manager/product/editProduct', data, this, (data) => {
                            this.$router.push('/main/userGame');
                        });
                    } else {
                        this.$Message.error('修改失败!');
                    }
                }.bind(this));
            },
            handleView(name) {
                this.formValidate.QRCodeName = name;
                this.formValidate.QRCodeVisible = true;
            },
            handleIconView(name) {
                this.formValidate.IconName = name;
                this.formValidate.iconVisible = true;
            },
            handleRemove(file) {
                const fileList = this.formValidate.QRcode;
                this.formValidate.QRcode.splice(fileList.indexOf(file), 1);
                const fileDefaultList = this.defaultQRCodeList;
                this.defaultQRCodeList.splice(fileDefaultList.indexOf(file), 1);

            },
            handleIconRemove(file) {
                const fileList = this.formValidate.gameIcon;
                this.formValidate.gameIcon.splice(fileList.indexOf(file), 1);
                const fileDefaultList = this.defaultIconList;
                this.defaultIconList.splice(fileDefaultList.indexOf(file), 1);
            },
            handleSuccess(res, file) {
                console.log('上传了文件',res,file);
                this.codeImgStatu = 1;
                file.name = res.fileName;
                file.url = this.imgUrl+res.fileName;
                this.formValidate.QRcode = this.$refs.uploadQRCode.fileList;

            },
            handleIconSuccess(res, file) {
                this.iconImgStatus = 1;
                file.name = res.fileName;
                file.url = this.imgUrl+res.fileName;
                this.formValidate.gameIcon = this.$refs.uploadIcon.fileList;
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload() {
                const check = this.formValidate.QRcode < 2;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            },
            handleIconBeforeUpload() {
                const check = this.formValidate.gameIcon < 2;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            },

            isShowCamera(array) {
                return !(array.length >= 1);
            },
            renderData() {
                let data = this.$router.history.current.params;
                this.formValidate.plat = data.productPlatform;
                this.formValidate.gameName = data.productName;
                this.formValidate.tel = data.productContactPhone;
                this.formValidate.name = data.productContact;
                this.formValidate.iconUrl = data.productIcon;
                this.formValidate.QRUrl = data.productCodeImg;
                this.productId = data.productId;
                this.defaultQRCodeList.push({
                    url: data.productIcon,
                    name: data.productIcon.split('/')[data.productIcon.split('/').length-1],
                    status: 'finished'
                });
                this.defaultIconList.push({
                    url: data.productCodeImg,
                    name: data.productCodeImg.split('/')[data.productCodeImg.split('/').length-1],
                    status: 'finished'
                });
                // this.formValidate.QRcode = this.defaultQRCodeList;
                // this.formValidate.gameIcon = this.defaultIconList;
            },
        },
        mounted () {
            console.log(this.$refs);
            this.formValidate.QRcode = this.$refs.uploadQRCode.fileList;
            this.formValidate.gameIcon = this.$refs.uploadIcon.fileList;
            // this.formValidate.gameIcon = this.$refs.uploadIcon?this.$refs.uploadIcon.fileList:[];
            // this.formValidate.QRcode = this.$refs.uploadIcon?this.$refs.uploadQRCode.fileList:[];
        },
    }
</script>
