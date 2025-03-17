<template>
  <n-config-provider :theme="darkTheme">
    <!-- <div class="fullscreen-container"> -->
    <div class="pomodoro-content">
      <!-- <div class="pomodoro-header">
          <h1 class="pomodoro-title">Pomodoro Timer</h1>
        </div> -->

      <div class="timer-display">
        <div :style="timerContainerStyle">
          <n-progress
            type="circle"
            :percentage="progressPercentage"
            :color="modeColor"
            :rail-style="{ stroke: '#18181b' }"
            :stroke-width="strokeWidth"
            :style="`transform: scale(${timerSize});transform-origin: center center;`"
          >
            <div class="timer-text">
              <span class="time">{{ formatTime(timeRemaining) }}</span>
              <!-- <span class="mode-label">{{ modeLabel }}</span> -->
            </div>
          </n-progress>
        </div>
      </div>

      <div class="controls-container">
        <div class="mode-buttons">
          <n-space>
            <n-button
              :type="currentMode === 'focus' ? 'primary' : 'default'"
              @click="setMode('focus')"
              size="large"
            >
              Focus
            </n-button>
            <n-button
              :type="currentMode === 'shortBreak' ? 'primary' : 'default'"
              @click="setMode('shortBreak')"
              size="large"
            >
              Short Break
            </n-button>
            <n-button
              :type="currentMode === 'longBreak' ? 'primary' : 'default'"
              @click="setMode('longBreak')"
              size="large"
            >
              Long Break
            </n-button>
          </n-space>
        </div>

        <div class="timer-controls">
          <n-space>
            <n-button
              type="primary"
              size="large"
              @click="toggleTimer"
              :disabled="timeRemaining <= 0"
              class="control-button"
            >
              {{ isRunning ? 'Pause' : 'Start' }}
            </n-button>
            <n-button type="default" size="large" @click="resetTimer" class="control-button">
              Reset
            </n-button>
          </n-space>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </n-config-provider>
</template>

<script setup>
import { ref, computed, onBeforeUnmount, onMounted } from 'vue'
import { NButton, NSpace, NProgress, NConfigProvider } from 'naive-ui'
import { darkTheme } from 'naive-ui'

// Timer modes and durations (in seconds)
const modes = {
  focus: { duration: 25 * 60, label: 'Focus Time', color: '#0ea5e9' },
  shortBreak: { duration: 5 * 60, label: 'Short Break', color: '#10b981' },
  longBreak: { duration: 15 * 60, label: 'Long Break', color: '#8b5cf6' },
}

// State
const currentMode = ref('focus')
const timeRemaining = ref(modes.focus.duration)
const isRunning = ref(false)
const timerInterval = ref(null)
const timerSize = ref(2)
const strokeWidth = ref(5)
const progressRef = ref(null)
const baseSize = ref(120) // 默认初始值，将在挂载后更新为实际尺寸

// Computed properties
const modeLabel = computed(() => modes[currentMode.value].label)
const modeColor = computed(() => modes[currentMode.value].color)
const progressPercentage = computed(() => {
  const totalDuration = modes[currentMode.value].duration
  return Math.round(((totalDuration - timeRemaining.value) / totalDuration) * 100)
})

const timerContainerStyle = computed(() => {
  // 计算原始元素的基础宽度和高度（假设是200px）
  // 计算缩放后的尺寸
  const scaledSize = baseSize.value * timerSize.value

  return {
    width: `${scaledSize}px`,
    height: `${scaledSize}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

// Methods
const setMode = (mode) => {
  if (isRunning.value) {
    clearInterval(timerInterval.value)
    isRunning.value = false
  }

  currentMode.value = mode
  timeRemaining.value = modes[mode].duration
}

const toggleTimer = () => {
  if (isRunning.value) {
    clearInterval(timerInterval.value)
    isRunning.value = false
  } else {
    isRunning.value = true
    timerInterval.value = setInterval(() => {
      if (timeRemaining.value > 0) {
        timeRemaining.value--
      } else {
        clearInterval(timerInterval.value)
        isRunning.value = false
        // Play sound or notification here if needed
      }
    }, 1000)
  }
}

const resetTimer = () => {
  clearInterval(timerInterval.value)
  isRunning.value = false
  timeRemaining.value = modes[currentMode.value].duration
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const updateTimerSize = () => {
  // Adjust timer size based on viewport to make it occupy most of the screen
  const viewportHeight = window.innerHeight
  const viewportWidth = window.innerWidth
  const minDimension = Math.min(viewportHeight, viewportWidth)

  // Make timer size responsive - aim for 70-80% of the available space
  timerSize.value = (minDimension * 0.7) / 100
  // Adjust stroke width based on timer size
  strokeWidth.value = timerSize.value * 0.7
}

// Set up responsive sizing
onMounted(() => {
  updateTimerSize()
  window.addEventListener('resize', updateTimerSize)

})

// Clean up
onBeforeUnmount(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
  }
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
