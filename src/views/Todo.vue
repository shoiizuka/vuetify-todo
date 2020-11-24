<template>
  <div class="home">
 

    <!-- タスク小コンポに移動 -->
    <list-tasks 
      v-if="$store.state.tasks.length"
      />

    <!-- タスク無い時小コンポに移動 -->
     <no-tasks
      v-else
     />
    <!-- ボタン並び替え小コンポ -->
     <button-done-sorting
      v-if="$store.state.sorting"
     />
  </div>

</template>

<script>
import NoTasks from '../components/Todo/NoTasks.vue'
export default {
  name: 'Home',
  
  components:{

    'list-tasks' : require('@/components/Todo/ListTasks.vue').default,
    'no-tasks' : require('@/components/Todo/NoTasks.vue').default,
    'button-done-sorting' : require('@/components/Todo/ButtonDoneSorting.vue').default
    
  }
}
</script>

