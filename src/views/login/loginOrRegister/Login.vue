
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { View, Hide } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// 表单数据
const loginForm = reactive({
  email: '',
  password: '',
  rememberMe: false
})

// 密码可见状态
const passwordVisible = ref(false)

// 表单验证规则
const loginRules = reactive({
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] }
  ],
  password: [
  { 
    required: true, 
    message: '请输入密码', 
    trigger: 'blur',
    whitespace: true // 防止纯空格输入
  },
  { 
    min: 6, 
    max: 18, 
    message: '密码长度需在6到18位之间', 
    trigger: 'blur' 
  }
]
})

// 登录处理
const handleLogin = () => {
  // 这里添加实际的登录逻辑
  console.log('登录数据:', loginForm)
}

// 忘记密码处理
const handleForgetPassword = () => {
  // 这里添加忘记密码逻辑
  console.log('跳转忘记密码流程')
}

// 切换注册
const switchToRegister = () => {
  // 这里可以触发注册组件切换
  console.log('切换到注册界面')
  router.push('/login/register')
}
</script>



<template>
    <div class="login-container">
      <el-card class="login-card">
        <template #header>
          <h2 class="login-title">用户登录</h2>
        </template>
  
        <el-form 
          :model="loginForm" 
          :rules="loginRules" 
          ref="loginFormRef"
          label-position="top"
        >
          <!-- 邮箱输入 -->
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="loginForm.email"
              placeholder="请输入邮箱"
              clearable
              type="email"
            />
          </el-form-item>
  
          <!-- 密码输入 -->
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              :type="passwordVisible ? 'text' : 'password'"
              placeholder="请输入密码"
              show-password
            >
              <template #suffix>
                <el-icon @click="passwordVisible = !passwordVisible">
                  <View v-if="passwordVisible" />
                  <Hide v-else />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
  
          <!-- 记住密码和忘记密码 -->
          <div class="flex-between">
            <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
            <el-link type="primary" @click="handleForgetPassword">忘记密码？</el-link>
          </div>
  
          <!-- 登录按钮 -->
          <el-button 
            type="primary" 
            class="login-btn" 
            @click="handleLogin"
          >
            立即登录
          </el-button>
  
          <!-- 注册引导 -->
          <div class="register-guide">
            没有账号？
            <el-link type="primary" @click="switchToRegister">立即注册</el-link>
          </div>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <style scoped>
  .login-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }
  
  .login-card {
    width: 420px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  }
  
  .login-title {
    text-align: center;
    margin: 0;
    color: #2c3e50;
  }
  
  .flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;
  }
  
  .login-btn {
    width: 100%;
    margin-top: 10px;
    height: 45px;
  }
  
  .register-guide {
    text-align: center;
    margin-top: 20px;
    color: #666;
  }
  
  .el-icon {
    cursor: pointer;
    color: #999;
    &:hover {
      color: #409eff;
    }
  }
  </style>