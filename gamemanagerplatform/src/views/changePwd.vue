<template>
    <Form style="width:500px;margin: auto;margin-top: 100px" ref="formCustom" :model="formCustom" :rules="ruleCustom"
          :label-width="80">
        <FormItem label="昵称">
            <span>{{userOpenid}}</span>
        </FormItem>
        <FormItem label="密码" prop="oldPassWord">
            <Input type="password" v-model="formCustom.oldPassWord"></Input>
        </FormItem>
        <FormItem label="新密码" prop="newPassWord">
            <Input type="text" v-model="formCustom.newPassWord" number></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">确认修改</Button>
            <Button to="/main/checkGame" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
</template>
<script>
    import util from '../libs/util';
    export default {
        created() {
            this.userOpenid = localStorage.getItem('LOGINID');
        },
        data() {

            const validatePass = (rule, value, callback) => {
                if (value === '' || value.length < 6) {
                    callback(new Error('请输入正确的密码'));
                } else {
                    if (this.formCustom.oldPassWord !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('newPassWord');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '' || value.length < 6) {
                    callback(new Error('请输入至少六位数的密码'));
                } else if (value === this.formCustom.oldPassWord) {
                    callback(new Error('新旧密码不能相同'));
                } else {
                    callback();
                }
            };

            return {
                userOpenid: '',
                formCustom: {
                    oldPassWord: '',
                    newPassWord: '',
                },
                ruleCustom: {
                    oldPassWord: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    newPassWord: [
                        {validator: validatePassCheck, trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            handleSubmit(name) {
                console.log('点击进入这里');
                this.$refs[name].validate(function(valid) {
                    util.postJsonData('/admin/changePwd', {
                        loginId: localStorage.getItem('LOGINID'),
                        oldPwd: this.formCustom.oldPassWord,
                        newPwd: this.formCustom.newPassWord,
                    }, this, (data) => {
                        this.$Notice.success({
                            title: 'Notification',
                            desc: '密码修改成功. '
                        });
                        this.$router.push('/index');
                    });
                }.bind(this))
            },
        }
    }
</script>
