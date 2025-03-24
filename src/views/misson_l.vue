<template>
  <div class="misson-container">
    <h2>任务列表</h2>

    <!-- 使用默认卡片，仅传入样式 -->
    <HoverCard :cardClass="cardStyle1" class="misson-card"> </HoverCard>

    <!-- 使用自定义卡片内容 -->
    <HoverCard :cardClass="cardStyle2" class="misson-card">
      <template #card>
        <n-card class="custom-card">
          <template #header>
            <div class="custom-title">自定义任务卡片</div>
          </template>
          <div class="custom-content">这是一个带有自定义样式的任务卡片示例</div>
          <template #footer>
            <div class="custom-footer">优先级：高</div>
          </template>
        </n-card>
      </template>
    </HoverCard>

    <!-- 使用自定义悬浮区域 -->
    <HoverCard class="misson-card">
      <template #hover-area="{ isHovered, onMouseEnter, onMouseLeave }">
        <div
          class="custom-hover-area"
          :class="{ hovered: isHovered }"
          @mouseenter="onMouseEnter"
          @mouseleave="onMouseLeave"
        >
          <n-card class="custom-card">
            <template #header>
              <div class="custom-title">完全自定义悬浮区域</div>
            </template>
            <div class="custom-content">这个卡片使用了自定义的悬浮区域和效果</div>
          </n-card>

          <!-- 自定义出现的内容 -->
          <div class="custom-action-area" v-show="isHovered">
            <div class="action-label">操作选项</div>
            <n-button type="primary" size="small">编辑</n-button>
            <n-button type="error" size="small">删除</n-button>
          </div>
        </div>
      </template>
    </HoverCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NButton } from 'naive-ui' // 添加NButton导入
import HoverCard from '../components/hover_card.vue'

// 定义不同的卡片样式
const cardStyle1 = {
  backgroundColor: '#f0f8ff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e8f4ff',
}

const cardStyle2 = {
  backgroundColor: '#fff8e1',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
  border: '1px solid #ffe082',
  borderRadius: '8px',
}
</script>

<style scoped>
.misson-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.misson-card {
  margin-bottom: 16px;
}

.custom-title {
  font-weight: bold;
  color: #ff6d00;
}

.custom-content {
  padding: 10px 0;
}

.custom-footer {
  font-size: 12px;
  color: #f57c00;
}

/* 自定义悬浮区域样式 */
.custom-hover-area {
  position: relative;
  display: inline-block;
  transition: all 0.3s;
  border-radius: 8px;
  padding: 2px;
}

.custom-hover-area.hovered {
  box-shadow: 0 0 20px rgba(0, 100, 255, 0.3);
  background-color: #f5f9ff;
}

.custom-action-area {
  position: absolute;
  bottom: -50px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  padding: 8px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-label {
  font-size: 12px;
  color: #666;
  margin-right: 8px;
}
</style>
