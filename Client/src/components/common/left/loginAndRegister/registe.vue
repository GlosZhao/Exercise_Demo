<template>
  <div id="registeItem">
    <transition name="registerAction">
      <div v-if="stutas" class="registerLink-action" @click="clickRotateZ()">
        <h5 class="registerText">register</h5>
        <div class="registerGraph"></div>
      </div>
    </transition>
    <transition name="registerStop">
      <div
        v-if="showRegister"
        class="registerLink-stop"
        @click="clickRotateZ()"
      >
        <h5 class="registerText">register</h5>
        <div class="registerGraph"></div>
      </div>
    </transition>

    <el-dialog
      title="用户登录"
      :visible.sync="showRegister"
      :before-close="closeForm"
      width="30%"
      :modal-append-to-body="false"
    >
      <el-form
        :model="registeForm"
        status-icon
        :rules="registeRules"
        ref="registeForm"
        class="demo-ruleForm"
        size="small"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registeForm.username"></el-input>
        </el-form-item>
        <el-form-item label="注册的邮箱" prop="email">
          <el-input v-model="registeForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registeForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input
            type="password"
            v-model="registeForm.checkPassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="registerOnSubmit('registeForm')"
            >register</el-button
          >
          <el-button @click="resetForm('registeForm')">重置</el-button>
          <el-button type="infor" @click="closeForm">cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "registeItem",
  data() {
    // 定义反馈的错误信息
    let checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (!this.validateEmail(value)) {
          callback(new Error("邮箱地址必须符合规范"));
        } else {
          callback();
        }
      }, 1000);
    };
    let validatePSW = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registeForm.checkPassword !== "") {
          this.$refs.registeForm.validateField("checkPassword");
        }
        callback();
      }
    };
    let validatePSW2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registeForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      stutas: true,
      showRegister: false,
      registeForm: {
        username: "",
        email: "",
        password: "",
        checkPassword: "",
      },
      registeRules: {
        username: [
          { validator: checkUsername, trigger: "blur" },
          {
            min: 8,
            max: 12,
            message: "账号长度在8-12个字符之间",
            trigger: "blur",
          },
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
        password: [{ validator: validatePSW, trigger: "blur" }],
        checkPassword: [{ validator: validatePSW2, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 邮箱校验
    validateEmail(val) {
      let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      let domains = [
        "qq.com",
        "163.com",
        "vip.163.com",
        "263.net",
        "yeah.net",
        "sohu.com",
        "sina.cn",
        "sina.com",
        "eyou.com",
        "gmail.com",
        "hotmail.com",
        "42du.cn",
      ];
      if (pattern.test(val)) {
        let domain = val.substring(val.indexOf("@") + 1);
        for (let i = 0; i < domains.length; i++) {
          if (domain == domains[i]) {
            return true;
          }
        }
      }
      return false;
    },

    clickRotateZ() {
      this.stutas = !this.stutas;
      setTimeout(() => {
        this.showRegister = !this.showRegister;
      }, 710);
    },
    // 关闭表单
    closeForm() {
      this.showRegister = !this.showRegister;
      setTimeout(() => {
        this.stutas = !this.stutas;
      }, 710);
    },
    registerOnSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("http://localhost:3000/api/user", this.registeForm)
            .then((res) => {
              if (res.data.hasOwnProperty("errorMsg")) {
                throw res.data.errorMsg;
              } else {
                this.$message({
                  message: res.data,
                  type: "success",
                });
                setTimeout(() => {
                  this.closeForm();
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.registerLink-action {
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: 50%;
  width: 100%;
  cursor: pointer;
}
.registerLink-stop {
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: 50%;
  width: 100%;
  transform: rotate(90deg);
  transform-origin: right bottom;
}

.registerGraph {
  border-bottom: 70px solid lightseagreen;
  border-left: 70px solid transparent;
  border-right: 70px solid transparent;
}

.registerText {
  position: absolute;
  bottom: 0px;
  left: 18%;
  z-index: 2;
  color: black;
  margin: 0;
  line-height: 40px;
  font-size: 25px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
.registerAction-enter-active,
.registerAction-leave-active {
  transition: transform 0.7s linear 0s;
}
.registerStop-enter-active,
.registerStop-leave-active {
  transition: transform 0.7s linear 0s;
}
/* 设置进入动画 */
.registerStop-leave-to {
  transform: rotate(0deg);
}

/* 设置离开动画 */
.registerAction-leave-to {
  transform-origin: right bottom;
  transform: rotate(90deg);
}
</style>