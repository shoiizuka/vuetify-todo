import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db')
db.config.debug = false


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle:process.env.VUE_APP_TITLE,//環境変数env
    search:null,
    tasks:[   
      // {id:1,
      //   title:'Wake up',
      //   done:false,
      //   dueDate:'2020-10-16'
      // },
      // {id:2,
      //   title:'get banana',
      //   done:false,
      //   dueDate:'2020-10-16'
      // },
      // {id:3,
      //   title:'eat banana',
      //   done:false,
      //   dueDate:null
      // },
    ],
    snackbar:{
      show:false,
      text:''
    },
    sorting:false
  },
  mutations: {
    setSearch(state,value){
      state.search = value
 
    },
    addTask(state,newTask){//アクションから送られてくる？
      state.tasks.push(newTask)//タスク配列に変数newtaskを追加
    },
    doneTask(state,id){
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },
    deleteTask(state,id){
      state.tasks = state.tasks.filter(task => task.id !==id)
    },
    updateTaskTitle(state,payload){
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.title = payload.title
   
    },
    updateTaskDueDate(state,payload){
      let task = state.tasks.filter(task => task.id === payload.id)[0]//IDと一致
      task.dueDate = payload.dueDate//ステートをペイロードに更新
   
    },
    setTasks(state,tasks){//タスクすをステートにいれる処理
      state.tasks = tasks
    },
    showSnackbar(state,text){
      let timeout = 0
      if(state.snackbar.show){
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout(() =>{
        state.snackbar.show = true
        state.snackbar.text =  text
      },timeout)
    },
    hideSnackbar(state){
      state.snackbar.show = false
    },
    toggleSorting(state){
      state.sorting = !state.sorting//タスク並べ替え　逆転させる
    }
  },
  actions: {
    addTask({commit},newTaskTitle){
      let newTask={
        id:Date.now(),//日付順
        title:newTaskTitle,//空のデータに
        done:false,
        dueDate:null
      }
      db.collection('tasks').add(newTask).then(()=>{
        commit('addTask',newTask)//letをいれる
        commit('showSnackbar','Task Added')
      })//タスクすはコレクション名
    },
    doneTask({state,commit},id){
      let task = state.tasks.filter(task => task.id === id)[0]//ミューテーションUpdateのときの一致
      db.collection('tasks').doc({ id:id }).update({//idはミューテーションからきてる
        done: !task.done//これはステートのデータを持ってきて逆にする
      }).then(()=>{
        commit('doneTask',id)//ミューテーションのタスクを使うのと
      })
    },
    deleteTask({commit},id){
      db.collection('tasks').doc({ id: id }).delete().then(()=>{
        commit('deleteTask',id)
        commit('showSnackbar','Task Deleted')
      })
    },
    updateTaskTitle({commit},payload){
      db.collection('tasks').doc({ id:payload.id }).update({
        title: payload.title
      }).then(()=>{
        commit('updateTaskTitle',payload)
        commit('showSnackbar','Task Updeted')
      })
    },
    updateTaskDueDate({commit},payload){//カレンダー更新
      db.collection('tasks').doc({ id:payload.id }).update({
        dueDate: payload.dueDate
      }).then(()=>{
        commit('updateTaskDueDate',payload)//ミューテーションと
        commit('showSnackbar','Date Updeted')//スナックバー合成
      })
    },
    setTasks({commit},tasks){
      db.collection('tasks').set(tasks)
        commit('setTasks',tasks)
    },
    getTasks({commit}){
      db.collection('tasks').get().then(tasks => {
        commit('setTasks',tasks)//タスクをセットする関数を合成
      })
    }
  },
  getters:{
    tasksFiltered(state){
      if(!state.search){//stateが空なら
        return state.tasks//タスク全部返す
      }
      return state.tasks.filter(task => 
        task.title.toLowerCase().includes(state.search.toLowerCase())
      )//＝＞はタスクループ処理 タイトルインクルーズメソ含むメソ
    }
  }
 
})
