<template>
<!-- 親taskMenu 小DialogDueDate -->
  <v-dialog
    ref="dialog"
    :value="true"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <v-date-picker
      v-model="date"
      scrollable
    >
      <v-spacer></v-spacer>
      <!-- キャンセルボタン -->
      <v-btn
        @click="$emit('close')"
        text
        color="primary"
      >
        Cancel
      </v-btn>
      <!-- 更新ボタン -->
      <v-btn
        @click="saveTask"
        text
        color="primary"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  props:['task'],//タスクを使えるようにする
  data(){
    return {
      date:null
    }
  },
  methods:{
    saveTask(){//OKボタンで選択デーを保存
    let payload ={//更新用データを入れとくストアプロパと同じ
      id: this.task.id,//現在のID
      dueDate: this.date
    }
    this.$store.dispatch('updateTaskDueDate',payload)//アクションで合成更新
    this.$emit('close')//タスクメニューのクローズイベント
    }
  },
  mounted(){//カレンダーとデータを選択構築
    if(this.task.dueDate){
      this.date = this.task.dueDate
    }
  }
}
</script>

<style>

</style>