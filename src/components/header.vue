<template>
    <div>
        <header class="header">
            <h1>todos</h1>
            <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="headerNewTodo" @keyup.enter="addTodo">
        </header>
    </div>
</template>

<script>
    let index=require('../assets/css/index.css');
    let base=require('../assets/css/base.css');
    let util=require('../assets/js/base.js');

    export default {
        data:function(){
            return {
                headerNewTodo:this.$store.state.newTodo
            }
        },
        methods:{
           addTodo:function(){
                if(this.headerNewTodo.trim()!=''){
                    this.$store.state.todos.push({title:this.headerNewTodo,completed:false});
                    this.headerNewTodo='';
                    util.saveTodosTolocal(this.$store.state.todos);
                }
           } 
        },
    }
</script>
