<template>
	<section class="main" v-show="todos.length" v-cloak>
        <input class="toggle-all" type="checkbox" v-model="allDone" @click="selectAll">
        <ul class="todo-list">
            <li class="todo" v-for="(todo,index) in todos" :class="{completed: todo.completed, editing: todo == editedTodo}">
                <div class="view">
                    <input class="toggle" type="checkbox" v-model="todo.completed" @click="select(index)">
                    <label @dblclick="editTodo(todo)">{{todo.title}}</label>
                    <button class="destroy" @click="removeTodo(index)"></button>
                </div>
                <input class="edit" type="text" v-model="todo.title"  v-todo-focus="todo == editedTodo" @blur="doneEdit(index,todo)" @keyup.enter="doneEdit(index,todo)" @keyup.esc="cancelEdit(todo)">
             </li>
        </ul>
    </section>
</template>

<script type="text/javascript">
	let index=require('../assets/css/index.css');
    let base=require('../assets/css/base.css');
    let util=require('../assets/js/base.js');

    export default{
    	data:function(){
    		return {
                todos:this.$store.state.todos,
    			allDone:this.$store.state.allDone,
    			editedTodo:this.$store.state.editedTodo,
    		}
    	},
    	methods:{
    		selectAll: function () {
                let tem=this.$data.todos;
                for(let i=0;i<tem.length;i++){
                    tem[i].completed=!this.allDone;
                }
                this.allDone=!this.allDone;
                util.saveTodosTolocal(tem);
            },
            removeTodo: function (index) {
                this.todos.splice(index,1);
                util.saveTodosTolocal(this.todos);
            },
            editTodo: function (todo) {
                this.oldValue=todo.title;
                this.editedTodo=todo;
                util.saveTodosTolocal(this.todos);
            },
            doneEdit: function (index,todo) {
                this.todos[index].title=todo.title;
                this.editedTodo='';
                util.saveTodosTolocal(this.todos);
            },
            cancelEdit: function (todo) {
                todo.title=this.oldValue;
                this.editedTodo='';
                this.oldValue='';
            },
            select: function (index) {
                this.todos[index].completed=!this.todos[index].completed;
                util.saveTodosTolocal(this.todos);
            }
    	},
    	directives:{
            'todo-focus':{
                update: function (el) {
                    // 聚焦元素
                    el.focus();
                }
            }
        },
        beforeRouteEnter: function (to, from, next) {
            if(to.path==='/all'){ //显示全部
                next(function(vm){
                    vm.$data.todos=vm.$store.state.todos;
                    console.log(vm.$data.todos);
                });
            }else if(to.path==='/active'){  //显示没有完成的
                next(function(vm){
                    vm.$data.todos=vm.$store.state.todos.filter(function(x){
                        return x.completed ==true ? false:true;
                    });
                    console.log(vm.$data.todos);
                });
            }else if(to.path==='/completed'){  //显示已经完成的
                next(function(vm){
                    vm.$data.todos=vm.$store.state.todos.filter(function(x){
                        return x.completed ==true ? true:false;
                    });
                    console.log(vm.$data.todos);
                });
            }
        },
    }
</script>