<script setup lang="ts">
import { ref, reactive ,computed} from 'vue'
import { ElMessage } from 'element-plus'
import Identify from '@/components/login/IdentifyCode.vue'

type ValidateFields = 'email' | 'captcha' | 'emailCode' | 'password' | 'confirmPassword'
const validate=ref<Record<ValidateFields, boolean>>({
  email: false,
  captcha: false,
  emailCode: false,
  password: false,
  confirmPassword: false
})

const formRef = ref()
const isvalid = computed(() => {
  return !(validate.value.email &&
    validate.value.captcha &&
    
    validate.value.password &&
    validate.value.confirmPassword&&!isSending.value)
})
const ifRegister = computed(()=>{
  return !(validate.value.email&&validate.value.password&&validate.value.confirmPassword&&validate.value.emailCode&&isSending.value)
})
// 表单数据
const formData = reactive({
  email: '',
  captcha: '',
  emailCode: '',
  password: '',
  confirmPassword: ''
})

// 图形验证码相关
const captchaCode = ref('')

const updateCode = (code:string) => {
  captchaCode.value = code
  console.log(captchaCode.value)
}


// 邮箱验证码发送
const isSending = ref(false)
const sendBtnText = ref('获取验证码')

const validateFormItem= async(field:ValidateFields)=>{
    try {
        await formRef.value?.validateField(field)
        validate.value[field] = true

    }catch (err) {
        validate.value[field]=false
    }
}

const sendEmailCode = async () => {
    console.log('发送邮箱验证码')
  if (!formData.email) {
    ElMessage.error('请先输入邮箱')
    return
  }
  

  ElMessage.success('发送验证码成功')
  isSending.value = true
  let count = 60
  const timer = setInterval(() => {
    sendBtnText.value = `${count}秒后重发`
    if (count-- <= 0) {
      clearInterval(timer)
      isSending.value = false
      sendBtnText.value = '获取验证码'
    }
  }, 1000)

  // 调用后端API发送验证码
  try {
    // await api.sendEmailCode({ 
    //   email: formData.email,
    //   captcha: formData.captcha 
    // })
    ElMessage.success('验证码已发送')
  } catch (err) {
    ElMessage.error('发送失败，请重试')
  }
}

// 密码复杂度校验
const checkPassword = (rule:unknown, value:string, callback:Function) => {
  const hasNumber = /\d/.test(value)
  const hasLetter = /[a-zA-Z]/.test(value)
  const hasSpecial = /[!@#$%^&*]/.test(value)
  const validTypes = [hasNumber, hasLetter, hasSpecial].filter(Boolean).length
  

  if (value.length < 6 || value.length > 18) {
    callback(new Error('密码长度需为6-18位'))
  } else if (validTypes < 2) {
    callback(new Error('需包含数字、字母、特殊符号中的两种以上'))
  } else {
    callback()
  }
}


// 表单验证规则
const formRules = reactive({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入图形验证码', trigger: 'blur' },
    {validator:(rule:unknown, value:string, callback:Function)=>{ 
        value.toLowerCase() !==  captchaCode.value.toLowerCase() 
          ? callback(new Error('图形验证码错误')) 
          : callback()
      }
    }
  ],
  password: [
    { required: true,message:'请输入密码', trigger: 'blur' },
    { 
      validator: (rule:unknown, value:string) => {
        const hasNumber = /\d/.test(value)
        const hasLetter = /[a-zA-Z]/.test(value)
        const hasSpecial = /[!@#$%^&*]/.test(value)
        const validTypes = [hasNumber, hasLetter, hasSpecial].filter(Boolean).length
        return value.length >= 6 && 
               value.length <= 18 && 
               validTypes >= 2
      },
      message: '需包含数字、字母、特殊符号中至少两种',
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule:unknown,value:string ) => value === formData.password,
      message: '两次输入密码不一致',
      trigger: 'blur'
    }
  ],
  emailCode: [
    { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
    { validator:(rule:unknown, value:string, callback:Function)=>{ 
        value !== '123456' 
          ? callback(new Error('邮箱验证码错误')) 
          : callback()
      }
    }
  ]
})
const submitForm = () => { 
    //提交注册表单
}


// 初始化图形验证码

</script>


<template>
    <div class="register-container">
      <el-card class="register-card">
        <h2 class="register-title">用户注册</h2>
        <el-form 
          ref="formRef" 
          :model="formData" 
          :rules="formRules" 
          label-width="120px"
          label-position="top"
        >
          <!-- 邮箱输入 -->
          <el-form-item label="邮箱" prop="email">
            <el-input 
              v-model="formData.email" 
              @blur="validateFormItem('email')"
              placeholder="请输入邮箱"
              prefix-icon="Message"
            />
          </el-form-item>
  
       
  
        
          <!-- 密码输入 -->
          <el-form-item label="密码" prop="password">
            <el-input 
              v-model="formData.password" 
              type="password" 
              @blur="validateFormItem('password')"
              placeholder="6-18位，需包含两种以上字符类型"
              show-password
            />
          </el-form-item>
  
          <!-- 确认密码 -->
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input 
              v-model="formData.confirmPassword" 
              type="password"
              @blur="validateFormItem('confirmPassword')"
              placeholder="请再次输入密码"
              show-password
            />
          </el-form-item>

            <!-- 图形验证码 -->
             <!-- <el-form-item label="图形验证码" prop="captcha">
            <el-input 
              v-model="formData.captcha" 
              placeholder="请输入验证码"
              style="width: 60%"
            />
            <Identify 
              class="captcha-img"
              :identifyCode="captchaCode"
              @click="refreshCaptcha"
               </el-form-item>
            /> -->

         
          <el-form-item label="图形验证码" prop="captcha">
            <el-input 
              v-model="formData.captcha" 
              @blur="validateFormItem('captcha')"
              placeholder="请输入验证码"
              style="width: 60%"
            />
            <Identify 
              class="captcha-img"
              @updateCode="updateCode"
            />
          </el-form-item>
          



            <!-- 邮箱验证码 -->
            <el-form-item label="邮箱验证码" prop="emailCode">
            <el-input 
              v-model="formData.emailCode" 
              placeholder="请输入收到的验证码"
              @blur="validateFormItem('emailCode')"
              style="width: 60%"
            />
            <el-button 
              :disabled="isvalid" 
              @click="sendEmailCode"
                style="background-color: #42b983; color: white;"
            >
              {{ sendBtnText }}
            </el-button>
          </el-form-item>
  
  
          <el-button type="primary" :disabled="ifRegister" @click="submitForm">立即注册</el-button>
        </el-form>
      </el-card>
    </div>
  </template>

<style scoped lang="scss">
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;

  .register-card {
    width: 100%;
    max-width: 600px;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);

    ::v-deep .el-card__body {
      padding: 40px;
    }
  }

  .register-title {
    text-align: center;
    color: #2c3e50;
    font-size: 24px;
    margin-bottom: 30px;
    position: relative;
    
    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 3px;
      background: #409eff;
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .el-form {
    .el-form-item {
      margin-bottom: 22px;

      :deep(.el-form-item__label) {
        font-weight: 500;
        color: #5a5e66;
        padding-bottom: 8px;
      }

      .el-input {
        --el-input-height: 44px;
        --el-input-border-radius: 8px;
        
        &:hover :deep(.el-input__wrapper) {
          box-shadow: 0 0 0 1px #409eff inset;
        }
      }
    }

    .captcha-img {
      cursor: pointer;
      margin-left: 15px;
      border: 1px solid #e4e7ed;
      border-radius: 6px;
      transition: all 0.3s;

      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transform: translateY(-1px);
      }
    }

    .el-button {
      height: 44px;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.3s;

      &--primary {
        width: 100%;
        margin-top: 10px;
        background: #409eff;
        
        &:hover {
          background: #66b1ff;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
        }
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .register-container {
    padding: 10px;
    
    .register-card {
      width: 95%;
      
      ::v-deep .el-card__body {
        padding: 25px;
      }
    }

    .register-title {
      font-size: 20px;
    }

    .el-form {
      .el-form-item {
        margin-bottom: 18px;
      }

      .el-button--primary {
        margin-top: 5px;
      }
    }
  }
}

@media (max-width: 480px) {
  .el-form {
    :deep(.el-form-item__content) {
      flex-direction: column;
      
      > *:not(:first-child) {
        margin-top: 10px;
        margin-left: 0 !important;
      }
    }
    
    .captcha-img {
      width: 100%;
      margin-left: 0 !important;
    }
  }
}
</style>
