<template>
  <div class="app">
    <button @click="triggerTransition" class="trigger-button">Trigger Transition</button>
    <!-- 新增：输入框和按钮测试 transitionTo 函数 -->
    <div class="transition-to-panel">
      <label>
        Transition Type:
        <select v-model="transitionType">
          <option value="left">left</option>
          <option value="right">right</option>
          <option value="up">up</option>
          <option value="down">down</option>
        </select>
      </label>
      <label>
        Target View:
        <input type="number" v-model.number="targetView" min="1" :max="slotCount" />
      </label>
      <button @click="triggerTransitionTo" class="trigger-button">Trigger TransitionTo</button>
    </div>

    <NintendoSwitchTransition
      ref="transitionRef"
      :switch2="cur_page"
      :slotCount="slotCount"
      :direction="direction"
    >
      <template #slot1>
        <div class="page page-1">
          <h1>First Page</h1>
          <p>This is the content of the first page</p>
        </div>
      </template>
      <template #slot2>
        <div class="page page-2">
          <h1>Second Page</h1>
          <p>This is the content of the second page</p>
        </div>
      </template>
    </NintendoSwitchTransition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NintendoSwitchTransition from './NintendoSwitchTransition.vue'

const cur_page = ref(1)
// 新增：组件 ref 用于调用 transitionTo
const transitionRef = ref(null)
const transitionType = ref('up') // 默认动画方向
const targetView = ref(1)
const slotCount = 2 // 与 NintendoSwitchTransition 的 slotCount 保持一致
const direction = 'up' // 默认初始方向

function triggerTransition() {
  cur_page.value = cur_page.value === 1 ? 2 : 1
}

function triggerTransitionTo() {
  if (transitionRef.value && typeof transitionRef.value.transitionTo === 'function') {
    transitionRef.value.transitionTo(transitionType.value, targetView.value)
  }
}
</script>

<style>
.app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.trigger-button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.page-1 {
  background-color: #f0f0f0;
}

.page-2 {
  background-color: #e0e0e0;
}

.transition-to-panel {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.transition-to-panel label {
  margin: 5px;
}
</style>
