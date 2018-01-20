<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>

        <div class="form-con">

          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input v-model="form.userName" placeholder="请输入手机号">
              <span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input v-model="form.password" placeholder="请输入验证码">
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem style="text-align:center;">
              <Button @click="handleSubmit" type="primary">登　录</Button>
              &nbsp;
              <Button @click="handleSubmit" type="primary">验证码</Button>
              &nbsp;
              <Button @click="handleDingding" type="info">钉　钉</Button>
            </FormItem>
          </Form>
          <p class="login-tip">使用手机号登录请先获取验证码</p>
          <!-- <Form ref="formInline">
            <FormItem style="text-align:center;">

            </FormItem>
          </Form> -->
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped>
@import url("/static/admin/css/global.css");
.login {
  width: 100%;
  height: 100%;
  background-image: url("/static/admin/images/login_bg.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
}
.login-con {
  position: absolute;
  right: 160px;
  top: 50%;
  -webkit-transform: translateY(-60%);
  transform: translateY(-60%);
  width: 300px;
}
.login-con-header {
  font-size: 16px;
  font-weight: 300;
  text-align: center;
  padding: 30px 0;
}
.login-con .form-con {
  padding: 10px 0 0;
}
.login-con .login-tip {
  font-size: 10px;
  text-align: center;
  color: #c3c3c3;
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
  form = {
    userName: "",
    password: ""
  };
  rules = {
    userName: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
    password: [{ required: true, message: "验证码不能为空", trigger: "blur" }]
  };

  mounted() {}

  handleSubmit() {
    let obj: any = this;
    obj.$refs.loginForm.validate((valid: any) => {
      if (valid) {
        // Cookies.set("user", this.form.userName);
        // Cookies.set("password", this.form.password);
        // this.$router.push({
        //   name: "home_index"
        // });
      } else {
        this.$Message.error({ content: "请检查输入" });
      }
    });
  }

  handleDingding() {
    location.href = "dingding";
  }
}
</script>
