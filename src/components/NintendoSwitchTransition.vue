<template>
  <div class="nintendo-transition-container">
    <!-- 修改：使用 currentDirection 判断水平或垂直转换 -->
    <div
      v-if="isTransitioning && (currentDirection === 'left' || currentDirection === 'right')"
      class="bars-container"
      :style="{ '--barAnimDuration': `${props.barAnimDuration}s` }"
    >
      <div
        v-for="i in barCount"
        :key="i"
        :class="barsSlidingOut ? outClass : barSlidingIn ? inClass : ''"
        :style="{
          animationDelay: `${(i - 1) * 0.1}s`,
          top: `${(i - 1) * (100 / barCount)}%`,
          height: `${100 / barCount}%`,
          backgroundColor: barBackground, // Nintendo orange color
        }"
      ></div>
    </div>
    <div
      v-if="isTransitioning && (currentDirection === 'up' || currentDirection === 'down')"
      class="bars-container-vertical"
      :style="{ '--barAnimDuration': `${props.barAnimDuration}s` }"
    >
      <div
        v-for="i in barCount"
        :key="i"
        :class="barsSlidingOut ? outClass : barSlidingIn ? inClass : ''"
        :style="{
          animationDelay: `${(i - 1) * 0.1}s`,
          left: `${(i - 1) * (100 / barCount)}%`,
          width: `${100 / barCount}%`,
          backgroundColor: props.barBackground, // 添加背景色
        }"
      ></div>
    </div>

    <!-- The content containers -->
    <div class="content-wrapper">
      <div
        v-for="n in props.slotCount"
        :key="n"
        class="content-container"
        v-show="currentView === n"
      >
        <slot :name="`slot${n}`"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { defineExpose } from 'vue'

const props = defineProps({
  switch2: { type: Number, default: 1 },
  barCount: { type: Number, default: 6 },
  barAnimDuration: { type: Number, default: 0.5 },
  direction: { type: String, default: 'up' },
  slotCount: { type: Number, default: 2 }, // 新增：自定义slot个数，默认为2
  barBackground: { type: String, default: '#ff6600' }, // 新增：自定义bar背景颜色，默认为Nintendo橙色
})

const isTransitioning = ref(false)
const currentView = ref(1)
const barsSlidingOut = ref(false) // 新增：控制bars滑出动画
const barSlidingIn = ref(false) // 新增：控制bars滑入动画

// 新增：当前动画方向，用于 transitionTo 函数
const currentDirection = ref(props.direction)

function getOpposite(direction : string) {
  switch (direction) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    case 'up':
      return 'down'
    case 'down':
      return 'up'
    default:
      return 'right'
  }
}

// 修改：使用 currentDirection 而非 props.direction
const inClass = computed(() => `bar-slide-in-${currentDirection.value}`)
const outClass = computed(() => `bar-slide-out-${getOpposite(currentDirection.value)}`)

// 修改：始终在switch2变化时调用 transition
watch(
  () => props.switch2,
  (newVal) => {
    console.log('props.switch2 changed:', newVal)
    startTransition(newVal)
  },
)

// 单独 watch props.direction 更新 currentDirection
watch(
  () => props.direction,
  (newVal) => {
    currentDirection.value = newVal
  },
)

function startTransition(newVal:number) {
  console.log('Start transition to', newVal)
  isTransitioning.value = true
  barSlidingIn.value = true // 触发滑入动画
  console.log('Transitioning: currentView =', newVal)
  const delay = props.barAnimDuration * 1000 + (props.barCount - 2) * 100
  setTimeout(() => {
    console.log('slide out')

    currentView.value = newVal
    barSlidingIn.value = false
    barsSlidingOut.value = true // 触发滑出动画

    setTimeout(() => {
      isTransitioning.value = false
      barsSlidingOut.value = false
      console.log('Transition reset')
    }, delay) // 滑出动画持续500ms
  }, delay)
}

// 新增：transitionTo 函数，指定动画方向和目标 view
function transitionTo(type:string, targetView:number) {
  currentDirection.value = type
  console.log('TransitionTo:', type, targetView)
  isTransitioning.value = true
  barSlidingIn.value = true
  const delay = props.barAnimDuration * 1000 + (props.barCount - 2) * 100
  setTimeout(() => {
    currentView.value = targetView
    barSlidingIn.value = false
    barsSlidingOut.value = true
    setTimeout(() => {
      isTransitioning.value = false
      barsSlidingOut.value = false
      console.log('Transition reset via transitionTo')
    }, delay)
  }, delay)
}

// 暴露 transitionTo 函数
defineExpose({ transitionTo })
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

/* 修改：更新水平动画 */
.bar-slide-in-left {
  position: absolute;
  left: 0;
  width: 100%;
  transform: translateX(-100%); /* 使用 translateX(-100%) 从左侧进入 */
  animation: right-mid var(--barAnimDuration) forwards cubic-bezier(0.16, 1, 0.3, 1);
}
.bar-slide-in-right {
  position: absolute;
  right: 0;
  width: 100%;

  transform: translateX(100%); /* 使用 translateX(100%) 从右侧进入 */
  animation: left-mid var(--barAnimDuration) forwards cubic-bezier(0.16, 1, 0.3, 1);
}

.bar-slide-out-left {
  position: absolute;
  left: 0;
  width: 100%;

  animation: mid-left var(--barAnimDuration) forwards cubic-bezier(0.16, 1, 0.3, 1);
}
.bar-slide-out-right {
  position: absolute;
  right: 0;
  width: 100%;

  animation: mid-right var(--barAnimDuration) forwards cubic-bezier(0.16, 1, 0.3, 1);
}

/* 修改：更新垂直动画 */
.bar-slide-in-up {
  position: absolute;
  top: 0;
  height: 100%;

  transform: translateY(100%); /* 反转 */
  animation: down-mid var(--barAnimDuration) forwards cubic-bezier(0.16, 1, 0.3, 1);
}
.bar-slide-in-down {
  position: absolute;
  bottom: 0;
  height: 100%;

  transform: translateY(-100%); /* 反转 */
  animation: up-mid var(--barAnimDuration) forwards cubic-bezier(0.16, 1, 0.3, 1);
}

.bar-slide-out-up {
  position: absolute;
  top: 0;
  height: 100%;

  animation: mid-down var(--barAnimDuration) forwards cubic-bezier(0.16, 1, 0.3, 1);
}
.bar-slide-out-down {
  position: absolute;
  bottom: 0;
  height: 100%;

  animation: mid-up var(--barAnimDuration) forwards cubic-bezier(0.16, 1, 0.3, 1);
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

.bars-container-vertical {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}

@keyframes right-mid {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes left-mid {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes down-mid {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes up-mid {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes mid-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes mid-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes mid-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}

@keyframes mid-down {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
