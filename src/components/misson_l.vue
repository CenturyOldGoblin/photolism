<template>
  <div class="todo-app">
    <!-- 左侧导航栏 -->
    <!-- <div class="sidebar">
      <div class="user-profile">
        <div class="avatar">O</div>
        <div class="user-info">
          <div class="username">用户</div>
          <div class="email">user@example.com</div>
        </div>
      </div>

      <div class="search-container">
        <n-input
          placeholder="搜索"
          v-model:value="searchText"
          class="search-input"
        >
          <template #suffix>
            <n-icon><search-outline /></n-icon>
          </template>
        </n-input>
      </div>

      <div class="nav-items">
        <div class="nav-item">
          <n-icon><sunny-outline /></n-icon>
          <span>我的一天</span>
        </div>
        <div class="nav-item">
          <n-icon><star-outline /></n-icon>
          <span>重要</span>
        </div>
        <div class="nav-item">
          <n-icon><calendar-outline /></n-icon>
          <span>计划内</span>
        </div>
        <div class="nav-item">
          <n-icon><person-outline /></n-icon>
          <span>已分配给我</span>
        </div>
        <div class="nav-item">
          <n-icon><mail-outline /></n-icon>
          <span>标记的电子邮件</span>
        </div>
        <div class="nav-item active">
          <n-icon><home-outline /></n-icon>
          <span>任务</span>
          <span class="count">{{ tasks.length }}</span>
        </div>
      </div>
    </div> -->

    <!-- 主内容区 -->
    <div class="main-content">
      <div class="list-header">
        <div class="list-title"><span class="emoji">👋</span> 任务列表</div>
        <!-- <div class="list-actions">
          <n-button quaternary circle>
            <template #icon>
              <n-icon><person-add-outline /></n-icon>
            </template>
          </n-button>
          <n-button quaternary circle>
            <template #icon>
              <n-icon><image-outline /></n-icon>
            </template>
          </n-button>
          <n-button quaternary circle>
            <template #icon>
              <n-icon><ellipsis-horizontal /></n-icon>
            </template>
          </n-button>
        </div> -->
      </div>

      <!-- 未完成任务列表 -->
      <n-infinite-scroll class="task-list">

        <hover_card
        v-for="task in uncompletedTasks"
        :key="task.id"
      
        >
          <template #card>
            <n-card
            :hoverable="true"
            @click="onTaskClick(task)"
          >
            <n-thing>
              <template #header>
                <n-h3 prefix="bar" align-text>
                  <n-text type="">
                    {{ task.name }}
                  </n-text>
                </n-h3>
              </template>
              <template #default>
                <n-flex vertical>
                  <span class="task-time"
                    ><n-text strong>{{ task.estimatedTime }}</n-text> h</span
                  >
                  <span class="task-deadline" v-if="task.deadline">{{
                    formatDate(task.deadline)
                  }}</span>

                  <n-flex :size="3">
                    <span
                      v-for="(cycle, idx) in task.cycleList.slice(0, -1)"
                      :key="idx"
                      :style="boxStyle(task, cycle[1], idx)"
                    />
                  </n-flex>
                </n-flex>
              </template>
              <template #action>
                <n-button size="small" @click="toggleTaskStatus(task.id)" type="success">
                  <template #icon>
                    <n-icon><checkmark-outline /></n-icon>
                  </template>
                </n-button>
              </template>
            </n-thing>
          </n-card>
          </template>
        </hover_card>
        <!-- <n-card
          :hoverable="true"
          @click="onTaskClick(task)"
          style="width;"
        >
          <n-thing>
            <template #header>
              <n-h3 prefix="bar" align-text>
                <n-text type="">
                  {{ task.name }}
                </n-text>
              </n-h3>
            </template>
            <template #default>
              <n-flex vertical>
                <span class="task-time"
                  ><n-text strong>{{ task.estimatedTime }}</n-text> h</span
                >
                <span class="task-deadline" v-if="task.deadline">{{
                  formatDate(task.deadline)
                }}</span>

                <n-flex :size="3">
                  <span
                    v-for="(cycle, idx) in task.cycleList.slice(0, -1)"
                    :key="idx"
                    :style="boxStyle(task, cycle[1], idx)"
                  />
                </n-flex>
              </n-flex>
            </template>
            <template #action>
              <n-button size="small" @click="toggleTaskStatus(task.id)" type="success">
                <template #icon>
                  <n-icon><checkmark-outline /></n-icon>
                </template>
              </n-button>

            </n-button> -->
            <!-- </template> -->
          <!-- </n-thing>
        </n-card> -->

      </n-infinite-scroll>

      <!-- 已完成任务区域 -->
      <!-- <div class="completed-section" v-if="completedTasks.length > 0">
        <div class="completed-header" @click="showCompleted = !showCompleted">
          <n-icon class="toggle-icon" :class="{ rotated: showCompleted }">
            <chevron-down-outline />
          </n-icon>
          <span>已完成 {{ completedTasks.length }}</span>
        </div>

        <div class="completed-tasks" v-if="showCompleted">
          <div v-for="task in completedTasks" :key="task.id" class="task-item completed-task">
            <div class="task-checkbox" @click="toggleTaskStatus(task.id)">
              <n-icon class="completed"><checkmark-circle /></n-icon>
            </div>
            <div class="task-content">
              <div class="task-name">{{ task.name }}</div>
              <div class="task-details">
                <span class="task-time">预估: {{ task.estimatedTime }}小时</span>
                <span class="task-deadline">截止: {{ formatDate(task.deadline) }}</span>
              </div>
            </div>
            <div class="task-actions">
              <n-button quaternary circle size="small" @click="deleteTask(task.id)">
                <template #icon>
                  <n-icon><trash-outline /></n-icon>
                </template>
              </n-button>
            </div>
          </div>
        </div>
      </div> -->

      <!-- 添加任务按钮 -->
      <div class="add-task" @click="showModal = true">
        <n-icon><add-outline /></n-icon>
        <span>添加任务</span>
      </div>
    </div>

    <!-- 新增任务弹窗 -->
    <n-modal v-model:show="showModal" preset="card" title="新增任务" style="width: 500px">
      <n-form ref="formRef" :model="newTask" :rules="rules">
        <n-form-item label="任务名称" path="name">
          <n-input v-model:value="newTask.name" placeholder="请输入任务名称" />
        </n-form-item>

        <n-form-item label="预估时间 (小时)" path="estimatedTime">
          <n-input-number
            v-model:value="newTask.estimatedTime"
            :min="0.5"
            :step="0.5"
            placeholder="请输入预估时间"
          />
        </n-form-item>

        <n-form-item label="截止日期" path="deadline">
          <n-date-picker
            v-model:value="newTask.deadline"
            type="datetime"
            clearable
            placeholder="请选择截止日期"
          />
        </n-form-item>

        <n-space justify="end">
          <n-button @click="showModal = false">取消</n-button>
          <n-button type="primary" @click="addTask">确认</n-button>
        </n-space>
      </n-form>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { defineEmits, defineProps } from 'vue'
import {
  NButton,
  NSpace,
  NModal,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NDatePicker,
  NIcon,
  useMessage,
  NInfiniteScroll,
  NCard,
  NThing,
  NText,
  NFlex,
  NH3,
} from 'naive-ui'
import { AddOutline, CheckmarkOutline } from '@vicons/ionicons5'
import type { CycleItem, Task } from '@/utils/share_type'
import hover_card from './hover_card.vue'
// 修改：使用 v-model 传入 tasks
const props = defineProps<{
  tasks: Task[]
}>()
const emit = defineEmits(['taskClick', 'update:tasks'])
// 定义双向绑定 tasks
const tasksModel = computed({
  get: () => props.tasks,
  set: (val: Task[]) => emit('update:tasks', val),
})

// 消息提示
const message = useMessage()

// 修改计算属性，基于 tasksModel 过滤
const uncompletedTasks = computed(() => {
  return tasksModel.value.filter((task) => !task.completed)
})
const completedTasks = computed(() => {
  return tasksModel.value.filter((task) => task.completed)
})

// 表单相关代码
const formRef = ref(null)
const showModal = ref(false)
interface NewTask {
  name: string
  estimatedTime: number
  deadline: number | null
}
const newTask = reactive<NewTask>({
  name: '',
  estimatedTime: 1,
  deadline: null,
})

// 新增：补充 form 的校验规则
const rules = {
  name: {
    required: true,
    message: '任务名称不能为空',
    trigger: 'blur',
  },
  estimatedTime: {
    required: true,
    message: '预估时间不能为空',
    trigger: 'blur',
  },
}

// 修改：添加任务操作，从 tasksModel 更新任务数组（避免直接修改 props）
const addTask = () => {
  const task: Task = {
    id: Date.now(),
    name: newTask.name,
    estimatedTime: newTask.estimatedTime,
    deadline: newTask.deadline,
    completed: false,
    cycleList: [],
    progress: 0,
    time_up: false,
  }
  let min = task.estimatedTime * 60
  const timeArrange: CycleItem[] = []
  while (min > 0) {
    if (min >= 30) {
      timeArrange.push([25, 'focus'])
      timeArrange.push([5, 'rest'])
      min -= 30
    } else {
      timeArrange.push([min, 'focus'])
      min = 0
    }
  }
  task.cycleList = timeArrange.concat([[0, 'end']])
  tasksModel.value = [...tasksModel.value, task]
  message.success('任务添加成功')
  showModal.value = false
  // 重置表单
  newTask.name = ''
  newTask.estimatedTime = 1
  newTask.deadline = null
}

const toggleTaskStatus = (id: number) => {
  const updated = tasksModel.value.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed }
    }
    return task
  })
  tasksModel.value = updated
  const target = updated.find((task) => task.id === id)
  message.info(target?.completed ? '任务已完成' : '任务已重新激活')
}

const deleteTask = (id: number) => {
  tasksModel.value = tasksModel.value.filter((task) => task.id !== id)
  message.success('任务已删除')
}

const formatDate = (timestamp: number | null): string => {
  if (!timestamp) return '未设置'
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

const onTaskClick = (task: Task): void => {
  emit('taskClick', task)
}

const boxStyle = (task: Task, cycleType: string, index: number) => {
  const fillColor = cycleType === 'focus' ? 'orange' : 'green'
  const isFilled = task.progress > index
  return {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    marginRight: '4px',
    borderRadius: '2px',
    backgroundColor: isFilled ? fillColor : 'transparent',
    border: `1px solid ${fillColor}`,
  }
}
</script>

<style scoped>
.todo-app {
  display: flex;
  height: 100vh;
  width: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* 侧边栏样式 */
.sidebar {
  width: 280px;
  display: flex;
  flex-direction: column;
}

.user-profile {
  padding: 16px;
  display: flex;
  align-items: center;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: 500;
}

.email {
  font-size: 12px;
}

.search-container {
  padding: 12px 16px;
}

.search-input {
  border-radius: 4px;
}

.nav-items {
  padding: 8px 0;
}

.nav-item {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.nav-item i {
  margin-right: 12px;
  font-size: 18px;
}

.nav-item span {
  flex: 1;
}

.count {
  padding: 0 8px;
  font-size: 12px;
}

.main-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.list-header {
  padding: 24px 24px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-title {
  font-size: 24px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}

.emoji {
  margin-right: 8px;
  font-size: 28px;
}

.list-actions {
  display: flex;
  gap: 8px;
}

.task-list {
  padding: 0 24px;
  width: 100%;
}

.task-item {
  width: 40%;
  margin: 0 auto;
}

.task-checkbox {
  margin-right: 12px;
  cursor: pointer;
}

.task-content {
  flex: 1;
}

.task-name {
  font-size: 16px;
  margin-bottom: 4px;
}

.task-actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;
}

.task-item:hover .task-actions {
  opacity: 1;
}

.completed-section {
  padding: 0 24px;
  margin-top: 16px;
}

.completed-header {
  display: flex;
  align-items: center;
  padding: 8px 0;
  cursor: pointer;
}

.toggle-icon {
  margin-right: 8px;
  transition: transform 0.2s;
}

.toggle-icon.rotated {
  transform: rotate(-90deg);
}

.completed-tasks {
  margin-top: 8px;
}

.completed-task .task-name {
  text-decoration: line-through;
}

.add-task {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  cursor: pointer;
  transition: color 0.2s;
  margin-top: auto;
}

.add-task i {
  margin-right: 8px;
}

.cycle-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 4px;
  border-radius: 2px;
}
</style>
