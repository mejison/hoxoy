<template>
    <div class="board-item">
        {{ description }}
    </div>
</template>
<script>
    export default {
        name: 'Task',
        props: [
            'description'
        ],
        data() {
            return {

            }
        },
        methods: {
            
        }
    }
</script>
<style>
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
</style>