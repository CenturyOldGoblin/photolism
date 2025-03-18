<template>
  <div class="nintendo-transition-container">
    <!-- The bars container -->
    <div v-if="isTransitioning" class="bars-container">
      <div
        v-for="i in 5"
        :key="i"
        class="bar"
        :class="{ 'bar-slide-out': barsSlidingOut }"
        :style="{
          animationDelay: `${(i - 1) * 0.1}s`,
          top: `${(i - 1) * 20}%`,
          height: '20%',
        }"
      ></div>
    </div>

    <!-- The content containers -->
    <div class="content-wrapper">
      <div v-if="currentView == '1'" class="content-container">
        <slot name="first"></slot>
      </div>
      <div v-if="currentView == '2'" class="content-container">
        <slot name="second"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  switch2: { type: Number, default: 1 },
})

const isTransitioning = ref(false)
const currentView = ref('1')
const barsSlidingOut = ref(false) // 新增：控制bars滑出动画

// 修改：始终在switch2变化时调用 transition
watch(
  () => props.switch2,
  (newVal) => {
    console.log('props.switch2 changed:', newVal)
    startTransition(newVal)
  },
)

function startTransition(newVal) {
  console.log('Start transition to', newVal)
  isTransitioning.value = true
  console.log('Transitioning: currentView =', newVal)
  setTimeout(() => {
    currentView.value = newVal
    barsSlidingOut.value = true // 触发滑出动画
    setTimeout(() => {
      isTransitioning.value = false
      barsSlidingOut.value = false
      console.log('Transition reset')
    }, 500) // 滑出动画持续500ms
  }, 2000)
}
</script>

<style scoped>
.nintendo-transition-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bars-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}

.bar {
  position: absolute;
  left: 0;
  width: 100%;
  background-color: #ff6600; /* Nintendo orange color */
  transform: translateX(-100%);
  animation: slideIn 0.5s forwards cubic-bezier(0.16, 1, 0.3, 1);
}

/* 新增：bars滑出动画 */
.bar-slide-out {
  animation: slideOut 0.5s forwards cubic-bezier(0.16, 1, 0.3, 1);
}

.content-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.content-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@keyframes slideIn {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slideOut {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
