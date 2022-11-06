<template>
    <div class="TodoApp">
        <div class="wrapper">
    </div>
        <NewTask/>
        <!-- <TaskList/> -->
    </div>
</template>

<script>
import NewTask from './ToDoList.vue'
// import TaskList from '../components/TaskList.vue'
export default {
    name: 'App',
    components: {
        NewTask,
        
    }
}
</script>

<style lang="scss" scoped>

</style>