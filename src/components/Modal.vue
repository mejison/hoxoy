<template>
    <div class="modal">
        <div class="modal-title">
            Title
        <span @click="close" class="modal-close">x</span>
        </div>
        <div class="modal-body">
        <p>
            Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
        </p>
        </div>
        <div class="modal-footer">
            footer
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Modal',
        props: ['toggle'],
        data() {
            return {
                
            }
        },
        methods: {
            close() {
                this.$emit('update:toggle', false)
            }
        }
    }
</script>
<style scoped>
    .modal {
        width: 600px;
        border-radius: 5px;
        background-color: #eee;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-family: arial, sans-serif;
        font-size: 14px;
        box-shadow: 0 8px 6px -6px black;
        }

        .modal-title {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        font-weight: 600;
        }

        .modal-title .modal-close {
        cursor: pointer; 
        font-weight: 100;
        }

        .modal-body {
        overflow: auto;
        padding: 0 20px;
        }

        .modal-title {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        }

        .modal-footer {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        }

        .modal-title, .modal-footer {
        background-color: #ccc;
        padding: 20px
        }
</style>

