<template>
    <div class="container">
      <div class="center-box">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script setup>
  // 脚本逻辑保持不变
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #f5f5f5;
  }
  
  .center-box {
    /* 尺寸控制 */
    width: 50vw;         /* 视口宽度的50% */
    height: 80vh;        /* 视口高度的50% */
    min-width: 320px;    /* 最小宽度限制 */
    min-height: 400px;   /* 最小高度限制 */
    max-width: 90vw;     /* 最大宽度限制 */
    max-height: 90vh;    /* 最大高度限制 */
  
    /* 布局优化 */
    padding: 2rem;
    box-sizing: border-box; /* 包含padding在尺寸内 */
    
    /* 视觉样式 */
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    
    /* 内容布局 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: auto; /* 内容超出时显示滚动条 */
  }
  
  /* 响应式调整（可选） */
  @media (max-width: 768px) {
    .center-box {
      width: 90vw;
      height: 100vh;
      padding: 1.5rem;
    }
  }
  </style>