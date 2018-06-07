<template>
   <div class="wrap" id="app">
    <div class="board" v-for="(b, index) in baords" :key="index">
      <div class="board-title">
          {{ b.name }}
          <div>...</div>
      </div>
      <div class="board-body">
        <div class="board-item" v-for="(t, index) in getTasktsById(b.id)" :key="index">
          {{ t.description }}
        </div>
      </div>
      <div class="board-footer">
        Add task ...
      </div>
    </div>
    <div class="board add-board">
       Add board ...
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
    data: function() {
    return {
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
            board_id: 'todo',
            description: 'asdf asdf asdf asdf asdf asdf'
          },
          {
            board_id: 'todo',
            description: 'asdf asdf asdf asdf asdf asdf'
          },
          {
            board_id: 'todo',
            description: 'asdf asdf asdf asdf asdf asdf'
          },
          {
            board_id: 'inprogress',
            description: 'asdf asdf asdf asdf asdf asdf'
          },
          {
            board_id: 'inprogress',
            description: 'asdf asdf asdf asdf asdf asdf'
          },
          {
            board_id: 'done',
            description: 'asdf asdf asdf asdf asdf asdf'
          }
        ]
    }
  },
  methods: {
    addTask: function() {
        
    },
    addBoard: function() {
      
    },
    getTasktsById: function(board_id) {
      return this.tasks.filter(function(i) {
        return i.board_id == board_id;
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

.board {
  width: 250px;
  border-radius: 5px;
  border: 1px solid #fff;
  padding: 3px;
  background: rgba(255, 255, 255, 0.4);
  margin-left: 20px;
  position: relative;
  min-height: 70px;
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

.board .board-body .board-item {
  padding: 10px;
  border-radius: 3px;
  margin: 0 5px 0;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.8);
  margin-bottom: 10px;
}

.board .board-body .board-item:last-child {
  margin-bottom: 0;
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
  background-color: green;
}

.btn.error {
  background-color: red;
}

.btn:hover {
  cursor: pointer;
  opacity: 0.9;
}
</style>
