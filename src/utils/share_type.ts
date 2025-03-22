export type CycleItem = [number, string]

export interface Task {
  id: number
  name: string
  estimatedTime: number
  cycleList: CycleItem[]
  progress: number
  deadline: number | null
  completed: boolean,
  time_up: boolean
}
export const default_task:Task = {
  id: Date.now(),
  name: 'default',
  estimatedTime: 1,
  deadline: Date.now(),
  completed: false,
  cycleList: [[25, 'focus'], [5, 'rest'],[25, 'focus'], [5, 'rest'],[0, 'end']],
  progress: 0,
  time_up: false
}
