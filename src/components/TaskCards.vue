<template>
  <div class='d-flex'>
    <template v-for="(status, key) in statuses">
      <TaskCard
        :key="key"
        :sub-title="status"
        :status-key="key"
        :tasks="filteredTasks(key)"
        @on-update-task-status="onUpdateTaskStatus"
        @on-draggable-end="draggableEnd"
        @on-detail-modal-open="onClickDetailModalOpen"
        @create-task="createTask"
      />
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from '@vue/composition-api'
  
  import { Task } from '@/types/schema'
  import { Statuses } from 'src/api/task';
  import TaskCard from '@/components/TaskCard.vue'
  
  export default defineComponent({
    components: { TaskCard },
    props: {
      statuses: {
        type: Object as PropType<Statuses>,
        required: true
      },
      tasks: {
        type: Array as PropType<Task[]>,
        required: true
      }
    },

    setup(props, { emit }){      
      const createTask = async(task: Task) =>{
        emit('create-task', task);
      }

      const onClickDetailModalOpen = (task: Task) =>{
        emit('on-detail-modal-open', task);
      }

      const onUpdateTaskStatus = (event: Event) =>  {
        emit('on-update-task-status', event)
      }

      const draggableEnd = (event: Event) => {
        emit('on-draggable-end', event);
      }

      // ステータスでフィルタリングしたタスクを返す
      const filteredTasks = (key: string) => props.tasks.filter( task => task.status == key );

      return{
        filteredTasks,
        onUpdateTaskStatus,
        draggableEnd,
        onClickDetailModalOpen,
        createTask
      }
    }
  });
</script>
