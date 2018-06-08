<template>
    <div class="board-item" :data-task="id" :style="{'left': positionX + 'px', 'top': positionY + 'px'}" :class="{'dragging': this.dragging, 'pointer': ! this.dragging}" @mouseup="this.dragAndDropEnd" @mousedown="this.dragAndDropBegin">
        {{ description }}
    </div>
</template>
<script>
    export default {
        name: 'Task',
        props: [
            'description',
            'moveTask',
            'id'
        ],
        data() {
            return {
                dragging: false,
                positionX: 0,
                positionY: 0,
                widthTask: 0,
                heightTask: 0,
                taskElement: null,
                taskDragging: null,
            }
        },
        mounted() {
            this.setWidthandHeightTask();
            this.taskElement = window.document.getElementById('app')
            
            this.taskElement
                .addEventListener('mousemove', (e) => {
                    let {clientX, clientY} = e
                    this.positionX = clientX - this.widthTask / 2;
                    this.positionY = clientY - this.heightTask / 2;    
                }, false);

            this.taskElement
                .addEventListener('mouseup', (e) => {
                    let {clientX, clientY} = e
                    let boards = window.document.getElementsByClassName('board')
                    for(var t in boards) {
                        var {offsetTop, offsetLeft, offsetWidth, offsetHeight} = boards[t]
                        if (this.positionX >= offsetLeft && this.positionX <=  offsetLeft + offsetWidth &&
                            this.positionY >= offsetTop && this.positionY <=  offsetTop + offsetHeight &&
                            this.taskDragging) {
                            this.moveTask(this.taskDragging, boards[t].dataset.board)
                        }
                    }
                }, false)            
        },
        methods: {
            setWidthandHeightTask() {
                this.widthTask = document.getElementsByClassName("board-item")[0].offsetWidth
                this.heightTask = document.getElementsByClassName("board-item")[0].offsetHeight
            },
            dragAndDropBegin(e) {
                this.dragging = true;
                this.taskDragging = e.target.dataset.task
                window.document.getElementById('app')
                    .addEventListener('mousemove', this.mouseMoveListener, false)
            },
            mouseMoveListener(e) {
                this.setWidthandHeightTask();
                let {clientX, clientY} = e
                this.positionX = clientX - this.widthTask / 2
                this.positionY = clientY - this.heightTask / 2
            },
            dragAndDropEnd(e) {
                this.dragging = false
                this.taskElement
                    .removeEventListener('mousemove', this.mouseMoveListener)
            }
        }
    }
</script>
<style>
    .board .board-body .board-item {
        padding: 10px;
        border-radius: 3px;
        margin: 0 5px 0;
        background-color: rgba(255, 255, 255, 0.8);
        margin-bottom: 10px;
    }

    .board-item.pointer:hover {
        cursor: pointer;
    }

    .board .board-body .board-item:last-child {
        margin-bottom: 0;
    }

    .board .board-body .board-item.dragging {
        transform: rotate(2deg);
        position: fixed;
        z-index: 2;
        -webkit-user-select: none;  /* Chrome all / Safari all */
        -moz-user-select: none;     /* Firefox all */
        -ms-user-select: none;      /* IE 10+ */
        user-select: none;          /* Likely future */      
    }
</style>