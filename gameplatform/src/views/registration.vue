


<style scoped>
    .demo-upload-list{
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
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>


<template>
    <Form style="width:800px;margin:auto;margin-top:150px;" ref="formValidate" :rules="ruleCustom" :model="formValidate"  :label-width="100">
       <div style="text-align:center;font-size:16px;height:50px;">
           <h3>注  册</h3>
       </div>
        <FormItem label="用户名" prop="name">
            <Input v-model="formValidate.name" placeholder="请设置用户名"></Input>
        </FormItem>
        <FormItem label="手机号" prop="tel">
            <Input v-model="formValidate.tel" placeholder="请输入手机号"></Input>
        </FormItem>

        <FormItem label="输入密码" prop="passwd">
            <Input type="password" v-model="formValidate.passwd" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
            <Input type="password" v-model="formValidate.passwdCheck" placeholder="请再输一次密码"></Input>
        </FormItem>
        <FormItem style="text-align: center">
            <Button type="primary" @click="handleSubmit('formValidate')">注 册</Button>
        </FormItem>
    </Form>
</template>
<script>
    import util from '../libs/util';
    export default {
        name: "registration",
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formValidate.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formValidate.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再输入密码'));
                } else if (value !== this.formValidate.passwd) {
                    callback(new Error('密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                formValidate: {
                    name: '',
                    tel: '',
                    passwd: "",
                    passwdCheck:'',
                },
                ruleCustom: {
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate(function(valid){
                    if (valid) {
                        util.postJsonData('/manager/register',{openid:this.formValidate.name,password:this.formValidate.passwd,telPhone:this.formValidate.tel},this,(data)=>{
                            console.log(data);
                            this.$router.push('/');
                        });
                    } else {
                        this.$Message.error('验证失败!');
                    }
                }.bind(this));
            },



        },
    }
</script>
