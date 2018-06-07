<template>
    <div class="board">
      <div class="board-title">
          {{ name }}
          <div>...</div>
      </div>
      <div class="board-body">
        <Task :description="t.description"  v-for="(t, index) in tasks" :key="index" />
        <Creater :toggle.sync="showAddTask" :callback="this.createTask" :meta="{id}" class="board-item"  v-show="showAddTask" />
      </div>
      <div class="board-footer" v-show=" ! showAddTask" @click="toggleShowAddTask()">
        Add task ...
      </div>
    </div>
</template>
<script>
  import Task from './Task'
  import Creater from './Creater'

  export default {
    name: 'Board',
    props: ['name', 'tasks', 'id', 'createTask'],
    components: {
      Task,
      Creater
    },
    data() {
      return {
        showAddTask: false
      }
    },
    methods: {
      toggleShowAddTask() {
        this.showAddTask = ! this.showAddTask
      }
    }
  }
</script>
<style>
  .board {
    width: 250px;
    border-radius: 5px;
    border: 1px solid #fff;
    padding: 3px;
    background: rgba(255, 255, 255, 0.4);
    margin-left: 20px;
    position: relative;
    padding-bottom: 40px;
  }

  .board:first-child {
    margin-left: 0;
  }

  .board .board-title {
    font-size: 14px;
    padding: 10px 15px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .board .board-title div {
    color: #555;
    height: 20px;
    text-align: center;
    width: 20px;
    line-height: 15px;
    border-radius: 3px;
  }

  .board .board-title div:hover {
    cursor: pointer;
    background-color: #ddd;
  }

  .board .board-footer {
    position: absolute;
    padding: 10px;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 13px;
    color: #555;
  }

  .board .board-footer:hover {
    background-color: #eee;
    cursor: pointer;
  }
</style>

