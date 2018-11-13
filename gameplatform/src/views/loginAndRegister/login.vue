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
        <p slot="title">用户登陆</p>
        <p>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user" label="登陆用户" :label-width="120">
                <Input type="text" size="large" v-model="formInline.user" placeholder="登陆ID">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password" label="登陆密码" :label-width="120">
                <Input type="password" size="large" v-model="formInline.password" placeholder="密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem style="text-align: center">
                <Row>
                    <Col span="16">
                        <Button type="primary" @click="handleSubmit('formInline')">登 陆</Button>
                    </Col>
                    <Col span="6">
                        <Button type="primary" to="/registration">注 册</Button>
                    </Col>
                    <Col style="margin-left: 80px;" span="6">
                        <a >管理员登录</a>
                    </Col>
                </Row>
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
                        util.postJsonData('/manager/checkLogin', {
                            openid: this.formInline.user,
                            password: this.formInline.password
                        }, this, (data) => {
                            console.log(data);
                            localStorage.setItem('USERINFO',data);
                            localStorage.setItem('OPENID',data.openid);
                            util.openid = data.openid;
                            util.nickname = data.nickname;
                            util.info = data;
                            this.$router.push({path: '/main/userGame'});
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
