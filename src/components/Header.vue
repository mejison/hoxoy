<template>
    <div class="header">
        <div class="sidebar-left">
            <a href="#" v-dropdown data-target="menu">
                boards
            </a>
            <div class="dropdown" data-target="menu">
                <div class="item">
                <a href="#">One #1</a>
                </div>
                <div class="item">
                <a href="#">One #2</a>
                </div>
                <div class="item">
                <a href="#">One #3</a>
                </div>
            </div>
        </div>
        <div class="logo">
            Hoxoy
        </div>
        <div class="sidebar-right relative">
            <a href="#" v-dropdown data-position="right" data-target="profile">profile</a>
            <div class="dropdown" data-target="profile">
                <div class="item">
                    <a href="#">Profile</a>
                </div>
                <div class="item">
                    <a href="#">Settings</a>
                </div>
                <div class="item">
                    <a href="#">Logout</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Header',
        data() {
            return {

            }
        }
    }
</script>
<style>
    .header {
        position: fixed;
        z-index: 2;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>
