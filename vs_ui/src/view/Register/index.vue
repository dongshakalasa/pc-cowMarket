<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a target="_blank" @click="$router.push('/login')" style="cursor: pointer;">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>邮箱:</label>
        <el-tooltip
          class="item"
          effect="dark"
          content="基本邮箱格式"
          placement="right"
        >
          <input
            type="text"
            placeholder="请输入你的邮箱"
            v-model="account"
            name="account"
            v-validate="{
              required: true,
              regex: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            }"
            :class="{ invalid: errors.has('account') }"
          />
        </el-tooltip>
        <span class="error-msg">{{ errors.first("account") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="code"
          name="code"
          v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ invalid: errors.has('code') }"
        />
        <el-button
          size="mini"
          type="danger" plain
          class="m-l4"
          style="width: 90px; height: 38px"
          @click="getCode"
          :disabled="abledBut"
          >{{title}}</el-button
        >
        <!-- <button style="width: 70px; height: 38px; cursor: pointer">
          获取验证码
        </button> -->
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <el-tooltip
          class="item"
          effect="dark"
          content="8-20位任意字符,不包含特殊字符"
          placement="right"
        >
          <input
            type="text"
            placeholder="请输入你的登录密码"
            v-model="password"
            name="password"
            v-validate="{ required: true, regex: /^[0-9A-Za-z]{8,20}$/ }"
            :class="{ invalid: errors.has('password') }"
          />
        </el-tooltip>
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          placeholder="请输入取人密码"
          v-model="password1"
          name="password1"
          v-validate="{ required: true, is: password }"
          :class="{ invalid: errors.has('password1') }"
        />
        <span class="error-msg">{{ errors.first("password1") }}</span>
      </div>
      <div class="btn">
        <button @click="sendRegister">完成注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      account: "",
      code: "",
      password: "",
      password1: "",
      abledBut: false, //暂存并保存,true为禁止，false为不禁止
      time: 0, //设置初始时间为0
      timer: null,
      title:'获取验证码'
    };
  },
  methods: {
    // 获取验证码
    async getCode(){
      // 邮箱正则
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      // 判断邮箱是否正确
      if(regEmail.test(this.account)){
        const result = await this.$API.user.reqGetCode(this.account)
        if(result.code == 200){
          this.abledBut = true; // 设置为禁止
          this.time = 60;
          this.timer1() 
        }else {
          this.$message.error(result.message)
        }
      }else {
        this.$message.error("邮箱格式不正确！")
      }
    },
    // 注册按钮
    async sendRegister(){
      const success = await this.$validator.validateAll();
      if (success) {
        try {
          // 整理参数
          const data = {account:this.account,password:this.password,code:this.code};
          // 发送请求
          const result = await this.$API.user.reqUserRegister(data)
          // 返回结果处理
          if(result.code == 200) {
            this.$message({message:result.message,type:"success"})
            this.$router.push('/login/code')
          }else {
            this.$message.error(result.message)
          }
        } catch (error) {
          this.$message(error.message)
        }
      }else {
        this.$message('输入存在错误！')
      }
    },
    // 点击获取按钮禁用60秒
    timer1() {
      //验证码60s内不能继续点击的函数
      if (this.time > 0) {
        this.title = this.time;
        this.time--;
        this.timer = setTimeout(this.timer1, 1000);
      } else {
        this.time = 0;
        this.title = '获取验证码';
        this.abledBut = false;
        clearTimeout(this.timer);
      }
    },
  },
};
</script>

<style lang="less">
  // .el-button--primary {
  //   background-color: #c72b41!important;
  //   border-color: #c72b41;
  // }
</style>

<style lang="less" scoped>
.register-container {
  padding-top: 40px;
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;
      

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 45px;
      margin: 17px 0 0 48px;

      button {
        outline: none;
        width: 270px;
        height: 45px;
        background: #7f2330;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
        border: 0;

        &:hover {
          background-color: #c72b41;
        }
      }
    }
  }
}
</style>