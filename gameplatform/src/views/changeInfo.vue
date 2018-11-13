<template>
    <Form style="width:500px;margin: auto;margin-top: 100px" ref="formCustom" :model="formCustom"
          :label-width="80">
        <FormItem label="昵称">
            <Input type="text" v-model="formCustom.nickname"></Input>
        </FormItem>
        <FormItem label="性别">
            <RadioGroup v-model="formCustom.sex">
                <Radio label='1'>男</Radio>
                <Radio label='0'>女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="联系方式" prop="telPhone">
            <Input type="text" v-model="formCustom.telPhone" number></Input>
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
            this.loadConfigData();
        },
        data() {
            return {
                formCustom: {
                    nickname: '',
                    sex: '1',
                    telPhone: ''
                },
            }
        },
        methods: {
            handleSubmit(name) {
                console.log('用户性别',this.formCustom.sex);
                this.$refs[name].validate(function (valid) {
                    util.postJsonData('/manager', {
                        router: "editInfo",
                        openid: localStorage.getItem('OPENID'),
                        nickname: this.formCustom.nickname,
                        sex: this.formCustom.sex,
                        telPhone: this.formCustom.telPhone,
                    }, this, (data) => {
                        util.nickname = this.formCustom.nickname;
                        util.info = data.userData;
                        this.$Notice.success({
                            title: 'Notification',
                            desc: '信息修改成功. '
                        });
                        this.$router.push('/main/userGame');
                    });
                }.bind(this))
            },
            loadConfigData() {
                this.formCustom.nickname = util.nickname;
                this.formCustom.sex = util.info.sex.toString();
                this.formCustom.telPhone = util.info.telPhone;
            },
        }
    }
</script>
