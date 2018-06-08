<template>
   <div class="wrap" id="app">
    <Board :moveTask="moveTask" :createTask="createTask" :tasks="getTasktsById(b.id)" :id="b.id" :name="b.name" v-for="(b, index) in baords" :key="index" />
   
    <div class="board add-board" @click="toggleShowAddBoard" v-show=" ! showAddBoard">
       Add board ...
    </div>

    <Creater :toggle.sync="showAddBoard" :callback="this.createBoard" class="board" v-show="showAddBoard" />
  </div>
</template>

<script>

import Board from './components/Board'
import Creater from './components/Creater'

export default {
  name: 'app',
  components: {
    Board,
    Creater
  },
  data() {
    return {
      showAddBoard: false,
      baords: [
        {
          id: 'todo',
          name: 'ToDo'
        },
        {
          id: 'inprogress',
          name: 'InProgress'
        },
        {
          id: 'done',
          name: 'Done'
        }
      ],
      tasks: [
          {
            id: 1,
            board_id: 'todo',
            description: 'asdf asdf asdf asdf asdf asdf'
          },
          {
            id: 2,
            board_id: 'todo',
            description: 'asdf asdf asdf asdf asdf asdf'
          },
          {
            id: 3,
            board_id: 'todo',
            description: 'asdf asdf asdf asdf asdf asdf'
          },
          {
            id: 4,
            board_id: 'inprogress',
            description: 'asdf asdf asdf asdf asdf asdf'
          },
          {
            id: 5,
            board_id: 'inprogress',
            description: 'asdf asdf asdf asdf asdf asdf'
          },
          {
            id: 6,
            board_id: 'done',
            description: 'asdf asdf asdf asdf asdf asdf'
          }
        ]
    }
  },
  methods: {
    getTasktsById(board_id) {
        return this.tasks.filter(function(i) {
          return i.board_id == board_id;
        })
    },
    toggleShowAddBoard() {
      this.showAddBoard = ! this.showAddBoard
    },
    createBoard(value) {
      this.baords.push({
        id: 'test',
        name: value.value
      });
    },
    createTask(task) {
      this.tasks.push({
        board_id: task.id,
        description: task.value
      })
    },
    moveTask(task_id, board_id) {
      let task;
      this.tasks.map((t) => {
        if (t.id == task_id) {
          t.board_id = board_id
        }
      })
    }
  }
}
</script>

<style>
  body {
    height: 100vh;
    position: relative;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .wrap {
    display: flex;
    align-items:flex-start;
    padding: 20px;
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    font-family: arial, sans-serif;
  }

  .board.add-board {
    font-size: 14px;
    padding: 10px;
    color: #555;
    cursor: pointer;
    min-height: auto;
  }

  .board.add-board:hover {
    background-color: #eee;
  }

  .btn {
    padding: 10px 15px;
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 3px;
  }

  .btn.success {
    background-color: #42b983;
    color: #fff;
  }

  .btn.error {
    background-color: #f66;
    color: #fff;
  }

  .btn:hover {
    cursor: pointer;
    opacity: 0.9;
  }
</style>
