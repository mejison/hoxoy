<template>
    <div class="creater">
        <textarea placeholder="Name board" v-model="value"></textarea>
        <div class="actions">
            <button class="btn success" @click="save()">Save</button>
            <button class="btn error" @click="cancel()">Cancel</button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Creater',
        props: [
            'toggle',
            'callback',
            'meta'
        ],
        data() {
            return {
                value: ''
            }
        },
        methods: {
            save() {
                this.callback(Object.assign({}, {value: this.value}, this.meta));
                this.value = "";
                this.cancel();
            },
            cancel() {
                this.$emit('update:toggle', false);
            }
        }
    }
</script>
<style scope>
    textarea {
        width: 100%;
        resize: none;
        min-height: 80px;
        border-radius: 3px;
        padding: 10px;
        font-family: Arial, Helvetica, sans-serif;
        border: none;
        margin-bottom: 4px;
    }

    .creater.board {
        padding: 8px;
    }

    .actions .btn.error {
        margin-left: 5px;
    }
</style>
