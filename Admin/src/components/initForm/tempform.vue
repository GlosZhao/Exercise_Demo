<template>
  <div class="adminForm">
    <h1 style="padding-top: 20px; margin-bottom: 40px">Blog's Admin</h1>
    <!-- 登录模块 -->
    <el-form
      v-if="controlForm"
      :model="loginUser"
      ref="loginUser"
      :rules="loginRule"
      label-position="right"
      label-width="70px"
      class="loginForm"
    >
      <!-- 账号 -->
      <el-form-item label="账号" prop="username">
        <el-input
          v-model="loginUser.username"
          placeholder="请输入登录账号"
          type="text"
          clearable
        ></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginUser.password"
          placeholder="请输入登录密码"
          type="password"
          show-password
          clearable
        ></el-input>
      </el-form-item>
      <div class="loginControl">
        <el-link @click="changeShape()"> 立即注册 </el-link>
        <el-link> 忘记密码 </el-link>
      </div>
      <el-form-item label-width="0">
        <el-button type="info" plain @click="submitLoginForm('loginUser')"
          >LOGIN</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 注册模块 -->

    <el-form
      v-if="!controlForm"
      :model="registerUser"
      ref="registerUser"
      :rules="registerRule"
      label-position="right"
      label-width="70px"
      class="loginForm"
    >
      <!-- 账号 -->
      <el-form-item label="账号" prop="username">
        <el-input
          v-model="registerUser.username"
          placeholder="请输入账号"
          type="text"
          clearable
        ></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="registerUser.password"
          placeholder="请输入密码"
          type="password"
          clearable
          show-password
        ></el-input>
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item label="确认密码" prop="confirmPSW">
        <el-input
          v-model="registerUser.confirmPSW"
          placeholder="请输入确认密码"
          type="password"
          clearable
          show-password
        ></el-input>
      </el-form-item>
      <div class="registerControl">
        <el-link @click="changeShape()"> 已有账号，立即登录 </el-link>
      </div>
      <el-form-item label-width="0">
        <el-button type="info" plain @click="submitRegisteForm('registerUser')"
          >CONFIRM</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { admin } from "../../network/api";
export default {
  name: "adminForm",
  data() {
    /*
    登录校验
    */
    //登录账号
    var checkLoginUser = (rule, value, callback) => {
      if (!value) {
        callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    // 登录密码
    var validateLoginPSW = (rule, value, callback) => {
      if (!value) {
        callback(new Error("登录密码不能为空"));
      } else {
        callback();
      }
    };

    /*
    注册校验
    */
    //  注册账号
    var checkRegisterUser = (rule, value, callback) => {
      if (!value) {
        callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    // 注册密码
    var validateRegisterPSW = (rule, value, callback) => {
      if (!value) {
        callback(new Error("注册密码不能为空"));
      } else {
        if (this.registerUser.confirmPSW !== "") {
          this.$refs.registerUser.validateField("confirmPSW");
        }
        callback();
      }
    };
    // 校验注册密码
    var validateConfirmPSW = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      controlForm: true,
      loginUser: {
        username: "",
        password: "",
      },
      registerUser: {
        username: "",
        password: "",
        confirmPSW: "",
      },
      loginRule: {
        username: [
          { validator: checkLoginUser, trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "账号长度在6-10个字符之间",
            trigger: "blur",
          },
        ],
        password: [{ validator: validateLoginPSW, trigger: "blur" }],
      },
      registerRule: {
        username: [
          { validator: checkRegisterUser, trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "账号长度在8-12个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { validator: validateRegisterPSW, trigger: "blur" },
          {
            min: 8,
            max: 12,
            message: "账号长度在8-12个字符之间",
            trigger: "blur",
          },
        ],
        confirmPSW: [{ validator: validateConfirmPSW, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 改变登录框
    changeShape() {
      return (this.controlForm = !this.controlForm);
    },
    // 登录提交
    submitLoginForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          admin
            .registerBlog(this.loginUser)
            .then((resolve) => {
              if (this.$cookies.get("token")) {
                // this.$store.commit(
                //   "changeIsAdmin",
                //   this.$cookies.isKey("token")
                // );
                this.$message.success(resolve.successMsg);
              } else {
              }
              console.log(resolve);
            })
            .catch((reject) => {
              this.$message.error(reject.errorMsg);
            });
        } else {
          return false;
        }
      });
    },
    // 注册提交
    submitRegisteForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.registerUser);
          admin
            .registerBlog(this.registerUser)
            .then((resolve) => {
              console.log(resolve);
              this.$message.success(resolve.successMsg);
              setTimeout(() => {
                this.changeShape();
              }, 1000);
            })
            .catch((reject) => {
              this.$message.error(reject.errorMsg);
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
.adminForm {
  position: relative;
  width: 360px;
  height: 50vh;
  top: 100px;
  left: calc(50vw - 180px);
  background-color: gainsboro;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.loginForm {
  margin: 10px 15px;
}
.loginControl {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px 15px;
}
.registerControl {
  display: flex;
  justify-content: center;
  margin: 10px 15px;
}
</style>