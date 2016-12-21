<template>
	 <footer class="footer" v-show="todos.length" v-cloak>
         <span class="todo-count">
           <strong ></strong> {{remaining }} left
         </span>
         <ul class="filters">
             <router-link to="/all"><li> <a :class="{selected: visibility == 'all'}">All</a> </li></router-link>
             <router-link to="/active"><li> <a :class="{selected: visibility == 'active'}">Active</a> </li></router-link>
             <router-link to="/completed"><li> <a :class="{selected: visibility == 'completed'}">Completed</a> </li></router-link>
         </ul>
         <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
             Clear completed
         </button>
     </footer>
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
    			visibility:'all'
    		}
    	},
      watch:{
        '$route':function(to,from){   //监控路由的变化,将visibility改变
          if(to.path=="/all"){
            this.$data.visibility='all';
          }else if(to.path=="/active"){
            this.$data.visibility='active';
          }else if(to.path=="/completed"){
            this.$data.visibility='completed';
          }
        }
      },
    	computed:{
            remaining:function(){
              let num=0;
              let temTodos=this.$store.state.todos;
              for(let i=0;i<temTodos.length;i++){
                if(!temTodos[i].completed){
                  num++;
                }
              }
              return num;
            },
        },
    	methods:{
            removeCompleted:function(){
               let temTodos=this.$store.state.todos;
               for (var i = 0; i < temTodos.length; i++) {
                   if(temTodos[i].completed){
                       temTodos.splice(i,1);
                       i--;
                   }
               }
               util.saveTodosTolocal(temTodos);
            }
        },
    }
</script>