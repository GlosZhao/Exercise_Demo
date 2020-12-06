<template>
  <div id="loginItem">
    <transition name="loginAction">
      <div v-if="stutas" class="loginLink-action" @click="clickTranslateX">
        <h5 class="loginText">login</h5>
        <div class="loginGraph"></div>
      </div>
    </transition>
    <div v-if="showLogin" class="loginLink-stop" @click="clickTranslateX">
      <h5 class="loginText">login</h5>
      <div class="loginGraph"></div>
    </div>

    <el-dialog
      title="用户登录"
      :visible.sync="showLogin"
      :before-close="closeForm"
      width="30%"
      :modal-append-to-body="false"
    >
      <div v-if="isLogin">
        <p>
          <strong ref="loginUser">{{loginName}}</strong>,你已经登录,是否确定重新登录
        </p>
        <div style="text-align: right;">
          <el-button size="mini" type="primary" @click="closeForm">取消</el-button>
          <el-button type="text" size="mini" @click="exitLogin">确定</el-button>
        </div>
      </div>

      <el-form
        v-if="!isLogin"
        :model="loginForm"
        status-icon
        :rules="loginRules"
        ref="loginForm"
        class="demo-ruleForm"
        size="small"
      >
        <el-form-item label="username" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button type="primary" @click="loginOnSubmit('loginForm')">login</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
          <el-button type="infor" @click="closeForm">cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "loginItem",
  data() {
    let checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    let validatePSW = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      stutas: true,
      showLogin: false,
      isLogin: false,
      loginName: "",
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { validator: checkUsername, trigger: "blur" },
          {
            max: 12,
            message: "名字字符长度不可以大于12位",
            trigger: "blur",
          },
        ],
        password: [{ validator: validatePSW, trigger: "blur" }],
      },
    };
  },
  methods: {
    clickTranslateX() {
      this.stutas = !this.stutas;
      this.judgeBeforeLogin();
      setTimeout(() => {
        this.showLogin = !this.showLogin;
      }, 710);
    },
    // 在弹窗之前判断是否已经登录
    judgeBeforeLogin() {
      if (this.$cookies.isKey("loginName")) {
        this.loginName = this.$cookies.get("loginName");
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    // 关闭弹窗
    closeForm() {
      this.stutas = !this.stutas;
      this.showLogin = !this.showLogin;
    },
    // 提交表单以及处理
    loginOnSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("http://localhost:3000/api/user/login", this.loginForm)
            .then((res) => {
              // 判断是否存在错误信息
              if (res.data.hasOwnProperty("errorMsg")) {
                throw res.data.errorMsg;
              } else {
                // 如果没有错误就将token存储在cookies以便评论备用
                //注意：chrome 不支持本地地址即127.0.0.1设置cookies需要设置samesite(有待考证)
                this.$message({
                  message: res.data.successMSG,
                  type: "success",
                  showClose: true,
                });
                // console.log(res.data.isAdmin);
                setTimeout(() => {
                  // 关闭弹窗
                  this.closeForm();
                  // 改变登录状态
                  this.isLogin = true;
                  // 修改登录后的数据
                  this.loginName = this.$cookies.get("loginName");
                  this.$store.commit(
                    "changeIsAdmin",
                    this.$cookies.isKey("isAdmin")
                  );
                }, 500);
              }
            })
            .catch((err) => {
              this.$message.error(err);
            });
        } else {
          this.$message.error("error submit!!!");
          return false;
        }
      });
    },
    // 重新登录
    exitLogin() {
      if (this.$cookies.isKey("isAdmin")) {
        this.$cookies.remove("isAdmin");
      }
      this.$store.dispatch("actChangeIsAdmin", false);
      this.$cookies.remove("loginName");
      return (this.isLogin = !this.isLogin);
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.loginLink-action {
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: 100%;
  width: 50%;
  cursor: pointer;
}
.loginLink-stop {
  position: absolute;
  left: 100%;
  bottom: 0px;
  height: 100%;
  width: 50%;
}

.loginGraph {
  border-left: 70px solid lightgreen;
  border-top: 70px solid transparent;
  border-bottom: 70px solid transparent;
}

.loginText {
  position: absolute;
  bottom: 0px;
  z-index: 2;
  color: black;
  line-height: 52px;
  font-size: 28px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.loginAction-enter-active,
.loginAction-leave-active {
  transition: transform 0.7s linear 0s;
}

.loginAction-enter,
.loginAction-leave-to {
  transform: translateX(200%);
}
</style>