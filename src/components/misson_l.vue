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
        <n-card
        v-for="task in uncompletedTasks"
        :key="task.id"
        class="task-item"
        embedded
        >
        <n-thing>
          <template #header>
            <n-text>{{ task.name }}</n-text>
            <!-- <div class="task-checkbox" @click="toggleTaskStatus(task.id)">
              <n-icon v-if="!task.completed"><ellipse-outline /></n-icon>
              <n-icon v-else class="completed"><checkmark-circle /></n-icon>
            </div> -->
          </template>
          <template #default>
            <div class="task-details">
              <span class="task-time">预估: {{ task.estimatedTime }}小时</span>
              <span class="task-deadline">截止: {{ formatDate(task.deadline) }}</span>
            </div>
          </template>
          <template  #action>
            <n-button   size="small" @click="deleteTask(task.id)" type="success">
              <template #icon>
                <n-icon><checkmark-outline /></n-icon>
              </template>
            </n-button>
            <!-- <n-button quaternary circle size="small">
              <template #icon>
                <n-icon><star-outline /></n-icon>
              </template>
            </n-button> -->
          </template>
        </n-thing>
      </n-card>
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

<script setup>
import { ref, reactive, computed } from 'vue'
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
} from 'naive-ui'
import {
  SearchOutline,
  SunnyOutline,
  StarOutline,
  CalendarOutline,
  PersonOutline,
  MailOutline,
  HomeOutline,
  EllipseOutline,
  CheckmarkCircle,
  AddOutline,
  TrashOutline,
  CheckmarkOutline,
  ChevronDownOutline,
  EllipsisHorizontal,
  PersonAddOutline,
  ImageOutline,
} from '@vicons/ionicons5'

// 消息提示
const message = useMessage()

// 任务列表
const tasks = ref([])

// 搜索文本
const searchText = ref('')

// 显示已完成任务
const showCompleted = ref(true)

// 表单引用
const formRef = ref(null)

// 控制弹窗显示
const showModal = ref(false)

// 新任务表单数据
const newTask = reactive({
  name: '',
  estimatedTime: 1,
  deadline: null,
})

// 计算未完成的任务
const uncompletedTasks = computed(() => {
  return tasks.value.filter((task) => !task.completed)
})

// 计算已完成的任务
const completedTasks = computed(() => {
  return tasks.value.filter((task) => task.completed)
})

// 表单验证规则
const rules = {
  name: {
    required: true,
    message: '请输入任务名称',
    trigger: 'blur',
  },
  estimatedTime: {
    required: true,
    message: '请输入预估时间',
    trigger: 'blur',
  },
  deadline: {
    required: true,
    message: '请选择截止日期',
    trigger: 'blur',
  },
}

// 格式化日期
const formatDate = (timestamp) => {
  if (!timestamp) return '未设置'
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

// 添加任务
const addTask = () => {
  const task = {
    id: Date.now(),
    name: newTask.name,
    estimatedTime: newTask.estimatedTime,
    deadline: newTask.deadline,
    completed: false,
  }

  tasks.value.push(task)
  message.success('任务添加成功')
  showModal.value = false

  // 重置表单
  newTask.name = ''
  newTask.estimatedTime = 1
  newTask.deadline = null
}

// 切换任务状态
const toggleTaskStatus = (id) => {
  const task = tasks.value.find((task) => task.id === id)
  if (task) {
    task.completed = !task.completed
    message.info(task.completed ? '任务已完成' : '任务已重新激活')
  }
}

// 删除任务
const deleteTask = (id) => {
  tasks.value = tasks.value.filter((task) => task.id !== id)
  message.success('任务已删除')
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

.task-details {
  font-size: 18px;
  display: flex;
  gap: 12px;
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
</style>
