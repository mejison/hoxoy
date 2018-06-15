<template>
  <div>
      <Header />
      <div class="wrap" id="app" :style="{width}">
      
      <Board :moveTask="moveTask" :removeBoard="removeBoard" :createTask="createTask" :tasks="getTasktsById(b.id)" :id="b.id" :name="b.name" v-for="(b, index) in baords" :key="index" />

      <div class="board add-board" @click="toggleShowAddBoard" v-show=" ! showAddBoard">
        Add board ...
      </div>

      <Creater :toggle.sync="showAddBoard" :callback="this.createBoard" class="board" v-show="showAddBoard" />
    </div>
  </div>
</template>

<script>

import Board from './components/Board'
import Creater from './components/Creater'
import Header from './components/Header'

export default {
  name: 'app',
  components: {
    Board,
    Creater,
    Header
  },
  data() {
    return {
      showAddBoard: false,
      width: 'auto',
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
        id: value.value.toLowerCase(),
        name: value.value
      })

      this.checkExpansion()
    },
    createTask(task) {
      this.tasks.push({
        id: this.tasks[this.tasks.length - 1].id + 1,
        board_id: task.id,
        description: task.value
      })
    },
    moveTask(task_id, board_id) {
      this.tasks.map((t) => {
        if (t.id == task_id) {
          t.board_id = board_id
        }
      })
    },
    checkExpansion() {
      if ((this.baords.length * 300) > document.body.offsetWidth) {
        this.width = 300 * this.baords.length + 'px'
        return
      }
      this.width = 'auto'
    },
    removeBoard(board_id) {
      this.baords = this.baords.filter(function(b) {
          return b.id != board_id;
      })
      this.checkExpansion()
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
    overflow: auto;
    padding-top: 50px;
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

  /* dropdown */

.dropdown {
  font-size: 14px;
  font-family: arial;
  background-color: #ccc;
  color: #333;
  width: 200px;
  border-radius: 5px;
  padding: 15px;
  display: none;
  position: absolute;  
  top: 0;
  box-shadow: 0 1px #FFFFFF inset, 0 1px 3px rgba(34, 25, 25, 0.4);
}

.dropdown .item {
  margin-bottom: 15px;
  
}

.dropdown .item a {
  color: #333;
  display: inline-block;
  width: 100%;
  text-decoration: none;
  font-weight: normal;
  font-size: 14px;
}

.dropdown .item a:hover {
  text-decoration: underline;
}


.dropdown .item:last-child {
  margin-bottom: 0;
}

.dropdown.active {
  display: block;
  z-index: 2;
}

.relative {
  position: relative;
}
</style>
