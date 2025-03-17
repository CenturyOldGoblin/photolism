<template>
  <n-modal v-model:show="visible" title="添加任务">
    <n-card
      style="width: 600px"
      title="模态框"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-form label-placement="left" label-width="100">
      <n-form-item label="任务名称">
        <n-input v-model:value="taskName" placeholder="请输入任务名称" />
      </n-form-item>
      <n-form-item label="预估时间">
        <n-input-number v-model:value="estimatedTime" placeholder="请输入预估时间（分钟）" />
      </n-form-item>
      <n-form-item label="截止日期">
        <n-date-picker v-model:value="deadline" type="date" placeholder="请选择截止日期" />
      </n-form-item>
      <n-form-item>
        <n-button type="primary" @click="submitTask">确认</n-button>
      </n-form-item>
    </n-form>
    </n-card>

  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NForm, NFormItem, NInputNumber, NButton, NDatePicker, NModal,NInput,NCard } from 'naive-ui'

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:showModal', 'submitData'])

const taskName = ref<string>('')
const estimatedTime = ref<number | null>(null)
const deadline = ref<number | null>(null)

const visible = computed({
  get: () => props.showModal,
  set: (val: boolean) => emit('update:showModal', val),
})

function submitTask() {
  // 任务录入逻辑
  console.log('任务名称:', taskName.value)
  console.log('预估时间:', estimatedTime.value)
  console.log('截止日期:', deadline.value)
  const data = {
    taskName: taskName.value,
    estimatedTime: estimatedTime.value,
    deadline: deadline.value,
  }
  emit('submitData', data)
  // 重置表单
  taskName.value = ''
  estimatedTime.value = null
  deadline.value = null
}

</script>

<style scoped>
/* ...existing code... */
</style>
