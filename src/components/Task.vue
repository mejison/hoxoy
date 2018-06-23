<template>
    <div>
        <div class="board-item" :data-task="hash" :style="{'left': positionX + 'px', 'top': positionY + 'px'}" :class="{'dragging': this.dragging, 'pointer': ! this.dragging}" @mouseup="this.dragAndDropEnd" @mousedown="dragAndDropBegin">
            {{ name }}
        </div>
        <Modal v-show="showModalToggle" :toggle.sync="showModalToggle" />
    </div>
</template>
<script>
    import Modal from './Modal'

    export default {
        name: 'Task',
        props: [
            'name',
            'moveTask',
            'hash'
        ],
        components: {
            Modal
        },
        data() {
            return {
                showModalToggle: false,
                dragging: false,
                positionX: 0,
                positionY: 0,
                widthTask: 0,
                heightTask: 0,
                bodyElement: null,
                boardsElement: null,
                taskDragging: null
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            showModal() {
                this.showModalToggle = true
            },
            init() {
                this.bodyElement = window.document.getElementById('app')
                this.boardsElement = window.document.getElementsByClassName('board')
    
                this.bodyElement
                    .addEventListener('mousemove', this.documentListenerMouseMove, false)
            
                this.bodyElement
                    .addEventListener('mouseup', this.documentListenerMouseUp, false)

                window.document.querySelectorAll('.empty-item').forEach((elm) => {
                    elm.remove();
                })
            },
            documentListenerMouseMove(e) {
               this.setWidthAndHeightTask();
                let {clientX, clientY} = e
                this.positionX = clientX - this.widthTask / 2
                this.positionY = clientY - this.heightTask / 2

                this.positionXold =  this.positionX;
                this.positionYold =  this.positionY;

                this.addEmptyElementWhenHover();
            },
            documentListenerMouseUp() {
                let boards = this.boardsElement
                for(var t in boards) {
                    var {offsetTop, offsetLeft, offsetWidth, offsetHeight} = boards[t]
                    if (this.positionX > offsetLeft && this.positionX <  offsetLeft + offsetWidth &&
                        this.positionY > offsetTop && this.positionY <  offsetTop + offsetHeight) {
                            
                            if (this.taskDragging) {
                                this.moveTask(this.taskDragging, boards[t].dataset.board)

                                this.bodyElement
                                    .removeEventListener('mouseup', this.documentListenerMouseUp)
                                this.bodyElement
                                    .removeEventListener('mousemove', this.documentListenerMouseMove)
                                this.taskDragging = null
                                this.dragging = false
                                this.init()
                            }
                    }
                }
            },
            addEmptyElementWhenHover() {
                let boards = this.boardsElement
                for(var t in boards) {
                    var {offsetTop, offsetLeft, offsetWidth, offsetHeight} = boards[t]
                    if (this.positionX > offsetLeft && this.positionX <  offsetLeft + offsetWidth &&
                        this.positionY > offsetTop && this.positionY <  offsetTop + offsetHeight) {
                        
                        if (this.dragging) {
                            window.document.querySelectorAll('.empty-item').forEach((elm) => {
                                elm.remove()
                            })
                            var div = window.document.createElement('div')
                            div.className = "empty-item"
                            var elm = window.document.querySelector("[data-board='" + boards[t].dataset.board + "'] div.board-body")
                            elm.appendChild(div)
                        }
                    }
                }
            },
            setWidthAndHeightTask() {
                this.widthTask = document.getElementsByClassName("board-item")[0].offsetWidth
                this.heightTask = document.getElementsByClassName("board-item")[0].offsetHeight
            },
            dragAndDropBegin(e) {
                let x = this.positionX,
                    y = this.positionY

                setTimeout(() => {
                    if (x != this.positionX && y != this.positionY) {
                        this.dragging = true
                        this.taskDragging = e.target.dataset.task
                        this.bodyElement
                                .addEventListener('mousemove', this.mouseMoveListener, false)
                    } else {
                        this.showModal(e)
                    }
                }, 300);
            },
            mouseMoveListener(e) {
                this.setWidthAndHeightTask()
                let {clientX, clientY} = e
                this.positionX = clientX - this.widthTask / 2
                this.positionY = clientY - this.heightTask / 2
            },
            dragAndDropEnd() {
                this.dragging = false
                this.bodyElement
                    .removeEventListener('mousemove', this.mouseMoveListener, false)
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