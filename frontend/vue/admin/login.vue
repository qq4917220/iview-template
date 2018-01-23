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
            <FormItem prop="phone">
              <Input v-model="form.phone" placeholder="请输入手机号">
              <span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="code">
              <Input v-model="form.code" placeholder="请输入验证码">
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem style="text-align:center;">
              <Button @click="handleSubmit" type="primary">登　录</Button>
              &nbsp;
              <Button @click="handleGetCode" type="primary">验证码</Button>
              &nbsp;
              <Button @click="handleDingding" type="info">钉　钉</Button>
            </FormItem>
          </Form>
          <p class="login-tip">使用手机号登录请先获取验证码</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped>
@import url("/admin/css/global.css");
.login {
  width: 100%;
  height: 100%;
  background-image: url("/admin/images/login_bg.jpg");
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
import Axios from "axios";

@Component
export default class App extends Vue {
  form = {
    phone: "13286408883",
    code: "1234"
  };
  phoneRegx = new RegExp(/^\d{11}$/);
  rules = {
    phone: [
      {
        required: true,
        message: "请输入正确手机号",
        trigger: "blur",
        pattern: this.phoneRegx
      }
    ],
    code: [{ required: true, message: "验证码不能为空", trigger: "blur" }]
  };

  mounted() {}

  //手机号码登录
  handleSubmit() {
    let obj: any = this;
    obj.$refs.loginForm.validate((valid: any) => {
      if (valid) {
        this.handleVerifyCode();
      } else {
        this.$Message.error({ content: "请检查输入" });
        return;
      }
    });
  }

  async handleVerifyCode() {
    let data = await Axios.post("./login/verify", {
      phone: this.form.phone,
      code: this.form.code
    });
    if (!data!.data.status) {
      this.$Message.error({
        content: this.form.phone + "登录失败！" + data.data.err
      });
      return;
    }
    this.$Message.success({
      content: this.form.phone + "登录成功！正在跳转到管理页面..."
    });
    setTimeout(function() {
      location.href = baseUrl + "/admin/home";
    }, 2000);
  }

  //获取验证码
  handleGetCode() {
    this.$Message.error({
      content: "功能建设中.."
    });
  }

  handleDingding() {
    this.$Message.error({
      content: "功能建设中.."
    });
  }
}
</script>
