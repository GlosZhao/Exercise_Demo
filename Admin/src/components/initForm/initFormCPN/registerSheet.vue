<template>
    <div class="registerSheetForm" >
      <!-- 注册模块 -->
      <el-form
        :model="registerUser"
        ref="registerUser"
        :rules="registerRule"
        label-position="right"
        label-width="70px"
        class="registerForm"
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
          <el-link @click="changeInputShape()"> 已有账号，立即登录 </el-link>
        </div>
        <el-form-item label-width="0">
          <el-button
            type="info"
            plain
            @click="submitRegisteForm('registerUser')"
            >CONFIRM</el-button
          >
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import { admin } from "@/network/api";
export default {
  name: "registerSheet",
  data() {
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
      // 用于延迟加载组件的标识符
      showSymbol:false,
      registerUser: {
        username: "",
        password: "",
        confirmPSW: "",
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
    //输入框状态
    changeInputShape() {
      this.$store.commit("changeIsLogin");
    },
  },
  beforeMount() {
    if(!this.$store.state.isLogin){
     setTimeout(() => {
       this.showSymbol = true
     }, 860);
    }
  },
};
</script>

<style>
.registerForm {
  margin: 10px 15px;
}
.registerControl {
  display: flex;
  justify-content: center;
  margin: 10px 15px;
}


</style>