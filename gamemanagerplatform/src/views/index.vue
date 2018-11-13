<style scoped lang="less">
    .index {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1 {
            height: 150px;
            img {
                height: 100%;
            }
        }
        h2 {
            color: #666;
            margin-bottom: 200px;
            p {
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex {
            height: 100%;
        }
    }
</style>
<template>
    <Card style="width:450px;margin:300px auto;">
        <p slot="title">管理员登陆</p>
        <p>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user" label="管理员登陆" :label-width="120">
                <Input type="text" size="large" v-model="formInline.user" placeholder="登陆ID">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password" label="管理员密码" :label-width="120">
                <Input type="password" size="large" v-model="formInline.password" placeholder="密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem style="text-align: center">
                <Button type="primary" @click="handleSubmit('formInline')">登 陆</Button>
            </FormItem>
        </Form>
        </p>
    </Card>
</template>
<script>
    import util from '../libs/util';

    export default {
        created() {

        },
        data() {
            return {
                formInline: {
                    user: '',
                    password: '',
                    labelWidth: 120
                },
                ruleInline: {
                    user: [
                        {required: true, message: '请输入您的登陆ID', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入您的登陆密码.', trigger: 'blur'},
                        {type: 'string', min: 6, message: '登陆密码最少6位', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                // this.$router.push('/main');
                this.$refs[name].validate(function (valid) {
                    if (valid) {
                        util.postJsonData('/admin/checkLogin', {
                            loginId: this.formInline.user,
                            password: this.formInline.password
                        }, this, (data) => {
                            localStorage.setItem('LOGINID',this.formInline.user);
                            util.loginId = this.formInline.user;
                            this.$router.push('/main/checkGame');
                        });
                    } else {
                        this.$Message.error('验证失败!');
                    }
                }.bind(this));
            },
            userRegistration() {

            }
        }
    }
</script>
