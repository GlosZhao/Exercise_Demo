<template>
    <div class="loginSheetForm">
      <!-- 登录模块 -->
      <el-form
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
          <el-link @click="changeInputShape()"> 立即注册 </el-link>
          <el-link> 忘记密码 </el-link>
        </div>
        <el-form-item label-width="0">
          <el-button type="info" plain @click="submitLoginForm('loginUser')"
            >LOGIN</el-button
          >
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import { admin } from "@/network/api";
export default {
  name: "loginSheet",
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
    return {
      loginUser: {
        username: "",
        password: "",
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
    };
  },
  methods: {
    // 登录提交
    submitLoginForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          admin
            .loginBlog(this.loginUser)
            .then((resolve) => {
              if (this.$cookies.get("token")) {
                // this.$store.commit(
                //   "changeIsAdmin",
                //   this.$cookies.isKey("token")
                // );
                this.$message.success(resolve.successMsg);
                this.$router.push({path:'/adminHome'})
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
    //输入框状态
    changeInputShape() {
      this.$store.commit("changeIsLogin");
    },
  },
};
</script>

<style>
.loginForm {
  margin: 10px 15px;
}
.loginControl {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px 15px;
}
</style>