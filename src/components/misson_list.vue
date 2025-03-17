<template>
  <div>
    <!-- 管理栏 -->
    <div>
      <n-button @click="showModal = true">添加任务</n-button>
    </div>
    <!-- 任务列表 -->
    <n-list>
      <n-list-item v-for="(task, index) in tasks" :key="index">
        <n-card>
          <!-- ...existing code... -->
          <div>任务名称: {{ task.name }}</div>
          <div>预估时间: {{ task.time }}</div>
          <div>截止日期: {{ task.deadline }}</div>
          <!-- ...existing code... -->
        </n-card>
      </n-list-item>
    </n-list>
    <!-- 添加任务的弹窗 -->
    <n-modal-provider>
      <misson_create v-model:show="showModal" />
    </n-modal-provider>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  NButton,
  NList,
  NListItem,
  NCard,
  NModalProvider,

} from 'naive-ui'
import misson_create from './misson_create.vue'
// ...existing code...
const showModal = ref(false)
const tasks = ref([])

const newTask = ref({
  name: '',
  time: '',
  deadline: '',
})

const addTask = () => {
  tasks.value.push({ ...newTask.value })
  newTask.value = { name: '', time: '', deadline: '' }
  showModal.value = false
}
// ...existing code...
</script>

<style scoped>
/* ...existing code... */
</style>
