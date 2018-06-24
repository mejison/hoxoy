<template>
  <div>
      <Header />
      <div class="wrap" id="app" :style="{width}">
      
      <Board :moveTask="moveTask" :removeBoard="removeBoard" :createTask="createTask" :tasks="getTasktsById(b.hash)" :id="b.hash" :name="b.name" v-for="(b, index) in baords" :key="index" />

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
import  api from './api'

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
      baords: [],
      tasks: []
    }
  },
  created() {
    this.getAllBoards();
    this.getAllTasks();
  },
  methods: {
    getAllBoards() {
      let self = this;
      api.getAllBoards().then((data) => {
        self.baords = data;
      })
    },
    getAllTasks() {
      let self = this;
      api.getAllTasks().then((data) => {
        self.tasks = data;
      })
    },
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

      api.createBoard(value).then(() => {
        this.getAllBoards();
      })

      this.checkExpansion()
    },
    createTask(task) {
      
      let data = {
        board_id: task.id,
        name: task.value
      }, self = this

      api.createTask(data)
        .then(() => {
          self.getAllTasks();
        })
    },
    moveTask(task_id, board_id) {
      this.tasks.map((t) => {
        if (t.hash == task_id) {
          t.board_id = board_id
        }
      })

      api.updateTask(task_id, {board_id});
    },
    checkExpansion() {
      if ((this.baords.length * 300) > document.body.offsetWidth) {
        this.width = 300 * this.baords.length + 'px'
        return
      }
      this.width = 'auto'
    },
    removeBoard(board_id) {
      let self = this;
      this.baords = this.baords.filter(function(b) {
          return b.hash != board_id;
      })

      api.deleteBoard(board_id)
        .then(() => {
          self.getAllBoards();
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
