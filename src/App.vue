<template>
  <div id="app">
      <section class="todoapp">

          <!--header-->
          <my-header></my-header>
          
          <!--body-->
          <router-view></router-view>
          <!-- <my-section></my-section> -->

          <!--footer-->
          <my-footer></my-footer>
      </section>
  </div>
</template>

<script>
    let index=require('./assets/css/index.css');
    let base=require('./assets/css/base.css');
    let util=require('./assets/js/base.js');
    import Vue from 'vue';
    import myHeader from './components/header.vue';
    import myFooter from './components/footer.vue';
    import Vuex from 'vuex';
    Vue.use(Vuex);
    

    // let todos=util.getTodosFromLocal();

    let store=new Vuex.Store({
      state:{
        todos:util.getTodosFromLocal(),
        newTodo:'',
        allDone:false,
        editedTodo:'',
        oldValue:'',
        visibility:'all'
      },
    });

    
    export default {
        name: 'app',
        data: function () {
            return {
                newTodo:this.$store.state.newTodo,
                todos:this.$store.state.todos,
                allDone:this.$store.state.allDone,
                editedTodo:this.$store.state.editedTodo,
                oldValue:this.$store.state.oldValue,
                visibility:'all'
            }
        },
        components:{
            'my-header':myHeader,
            'my-footer':myFooter
        },
        store:store,
        beforeRouteEnter: function (to, from, next) {
            alert("=======");
            next();
        },
    }
</script>

<style>
    #app{
        width: 800px;
        height: 600px;
    }
</style>
