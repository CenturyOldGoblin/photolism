<template>
  <div class="card-container">
    <!-- 将鼠标事件监听器移到外层包装器上 -->
    <div
      class="card-wrapper"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <n-card class="hover-card">
        <template #header>
          <div class="card-title">卡片标题</div>
        </template>
        <div class="card-content">
          这是一个居中显示的卡片，当鼠标悬浮时会从右侧展开操作按钮。
        </div>
        <template #footer>
          <div class="card-footer">最后更新：今天</div>
        </template>
      </n-card>

      <!-- 按钮容器不再使用v-if条件渲染整个容器 -->
      <div
        class="action-buttons"
        :class="{ 'buttons-visible': isHovered }"
      >
        <n-button circle secondary class="action-button">
          <template #icon>
            <n-icon><EditOutlined /></n-icon>
          </template>
        </n-button>
        <n-button circle secondary class="action-button">
          <template #icon>
            <n-icon><ShareAltOutlined /></n-icon>
          </template>
        </n-button>
        <n-button circle secondary class="action-button">
          <template #icon>
            <n-icon><DeleteOutlined /></n-icon>
          </template>
        </n-button>
        <n-button circle secondary class="action-button">
          <template #icon>
            <n-icon><MoreOutlined /></n-icon>
          </template>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { NCard, NButton, NIcon } from 'naive-ui'
import {
  EditOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  MoreOutlined
} from '@vicons/antd'

const isHovered = ref(false)
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.card-wrapper {
  position: relative;
  /* 添加内边距确保按钮区域包含在鼠标事件区域内 */
  padding-right: 60px;
}

.hover-card {
  width: 320px;
  transition: all 0.3s;
}

.card-title {
  font-weight: bold;
  font-size: 16px;
}

.card-content {
  padding: 8px 0;
}

.card-footer {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}

.action-buttons {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
  opacity: 0;
  transform: translateX(-20px);
  pointer-events: none; /* 默认情况下禁用鼠标事件 */
}

.buttons-visible {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto; /* 显示时启用鼠标事件 */
}

.action-button {
  transition: transform 0.2s;
}

.action-button:hover {
  transform: scale(1.1);
}
</style>

