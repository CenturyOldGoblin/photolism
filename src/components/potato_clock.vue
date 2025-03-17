<template>
  <n-config-provider :theme="darkTheme">
    <!-- <div class="fullscreen-container"> -->
    <div class="pomodoro-content">
      <!-- <div class="pomodoro-header">
          <h1 class="pomodoro-title">Pomodoro Timer</h1>
        </div> -->

      <div class="timer-display">
        <div :style="timerContainerStyle">
          <vue-countdown
            ref="countdownRef"
            :time="currentModeTime"
            @end="onEnd"
            v-slot="{ totalMilliseconds, minutes, seconds }"
          >
            <n-progress
              type="circle"
              :percentage="
                Math.round(
                  (1 - totalMilliseconds / (props.cycleList[currentCycleIndex][0] * 60 * 1000)) *
                    100,
                )
              "
              :color="modeColor"
              rail-style="{ stroke: '#18181b' }"
              :stroke-width="strokeWidth"
              :style="`transform: scale(${timerSize});transform-origin: center center;`"
            >
              <div class="timer-text">
                <span class="time"
                  >{{ minutes.toString().padStart(2, '0') }}:{{
                    seconds.toString().padStart(2, '0')
                  }}</span
                >
              </div>
            </n-progress>
          </vue-countdown>
        </div>
      </div>

      <div class="controls-container">

        <div class="timer-controls">
          <n-space>
            <n-button type="primary" size="large" @click="toggleTimer" class="control-button">
              {{ isRunning ? 'Pause' : 'Start' }}
            </n-button>
            <n-button type="default" size="large" @click="resetTimer" class="control-button">
              Reset
            </n-button>
            <n-button type="default" size="large" @click="debugEndTimer" class="control-button">
              Debug End
            </n-button>
          </n-space>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, onMounted } from 'vue'
import { NButton, NSpace, NProgress, NConfigProvider } from 'naive-ui'
import { darkTheme } from 'naive-ui'
import VueCountdown from '@chenfengyuan/vue-countdown'

type CycleItem = [number, string]

// 新增：从父组件接收cycleList，格式为 [[25, "focus"], [5, "rest"], [25, "focaus"]]
const props = withDefaults(
  defineProps<{
    cycleList: CycleItem[]
    infinite?: boolean
  }>(),
  {
    cycleList: () => [
      [25, 'focus'],
      [5, 'rest'],
      [25, 'focus'],
    ],
    infinite: false,
  },
)
const emit = defineEmits(['cycleComplete'])

// 新状态：使用cycleList进行周期遍历
const currentCycleIndex = ref(0)
const isRunning = ref(false)
const timerSize = ref(2)
const strokeWidth = ref(5)
const baseSize = ref(120)
const countdownRef = ref<InstanceType<typeof VueCountdown> | null>(null)

// 计算属性：当前周期时间（毫秒）、标签及颜色
const currentModeTime = computed(() => {
  // cycleList中第一个元素为分钟数
  return props.cycleList[currentCycleIndex.value][0] * 60 * 1000
})
const currentModeLabel = computed(() => props.cycleList[currentCycleIndex.value][1])
const modeColor = computed(() => {
  const label = currentModeLabel.value.toLowerCase()
  if (label === 'focus' || label === 'focaus') return '#0ea5e9'
  if (label === 'rest') return '#10b981'
  return '#8b5cf6'
})

const timerContainerStyle = computed(() => {
  const scaledSize = baseSize.value * timerSize.value
  return {
    width: `${scaledSize}px`,
    height: `${scaledSize}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

// 修改后的onEnd：遍历cycleList，遍历完毕后emit事件并重置序号

// First add this function at the top level of the script setup
const nextStage = () => {
  if (props.infinite) {
    // 无限模式下在 focus 和 rest 之间切换
    currentCycleIndex.value = currentCycleIndex.value === 0 ? 1 : 0
  } else {
    if (currentCycleIndex.value < props.cycleList.length - 1) {
      currentCycleIndex.value++
    } else {
      emit('cycleComplete')
      console.log('Cycle complete!')
      currentCycleIndex.value = 0
    }
  }
  countdownRef.value?.restart()
  isRunning.value = true
}

// Then modify the onEnd function to simply call nextStage
const onEnd = () => {
  nextStage()
}

const toggleTimer = () => {
  // 确保 countdownRef 不为 null
  if (!countdownRef.value) {
    console.warn('倒计时引用为空，无法控制计时器');
    return;
  }

  if (isRunning.value) {
    try {
      countdownRef.value.pause();
      isRunning.value = false;
      console.log('计时器已暂停');
    } catch (error) {
      console.error('暂停计时器失败:', error);
    }
  } else {
    try {
      countdownRef.value.start();
      isRunning.value = true;
      console.log('计时器已启动');
    } catch (error) {
      console.error('启动计时器失败:', error);
    }
  }
}

const resetTimer = () => {
  countdownRef.value?.restart()
  isRunning.value = true
}

const debugEndTimer = () => {
  countdownRef.value?.pause()
  onEnd()
}

const updateTimerSize = () => {
  const viewportHeight = window.innerHeight
  const viewportWidth = window.innerWidth
  const minDimension = Math.min(viewportHeight, viewportWidth)
  timerSize.value = (minDimension * 0.7) / 100
  strokeWidth.value = timerSize.value * 0.7
}

// 响应式尺寸调整
onMounted(() => {
  updateTimerSize()
  window.addEventListener('resize', updateTimerSize)
  // nextStage()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTimerSize)
})
</script>

<style scoped>
.fullscreen-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #121214;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.pomodoro-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 1rem;
}

.pomodoro-header {
  width: 100%;
  text-align: center;
  padding-top: 1rem;
  flex-shrink: 0;
}

.pomodoro-title {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  color: #ffffff;
  margin: 0;
  opacity: 0.8;
}

.timer-display {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
}

.timer-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.time {
  font-size: clamp(0.5rem, 5vw, 1rem);
  font-weight: bold;
  line-height: 1;
}

.mode-label {
  font-size: clamp(1.2rem, 3vw, 2rem);
  margin-top: 1rem;
  opacity: 0.8;
}

.controls-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1.5rem;
  flex-shrink: 0;
}

.mode-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.timer-controls {
  display: flex;
  justify-content: center;
}

.control-button {
  font-size: 1.2rem;
  padding: 0.5rem 1.5rem;
}

/* Responsive adjustments */
@media (max-height: 700px) {
  .pomodoro-header {
    padding-top: 0.5rem;
  }

  .controls-container {
    padding-bottom: 0.5rem;
  }

  .time {
    font-size: clamp(2rem, 8vw, 5rem);
  }

  .mode-label {
    font-size: clamp(1rem, 2vw, 1.5rem);
    margin-top: 0.5rem;
  }
}

@media (max-width: 600px) {
  .mode-buttons .n-space {
    flex-direction: column;
    gap: 0.5rem;
  }

  .control-button {
    font-size: 1rem;
    padding: 0.4rem 1.2rem;
  }
}
</style>
