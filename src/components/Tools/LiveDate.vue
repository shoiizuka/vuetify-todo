<template>
  <div class="text-subtitle-1 ml-4">
  <!-- データの値を反映 -->
    {{date}}
  </div>
</template>

<script>
import {format} from 'date-fns'//日付処理のやつ前にnpmでインストールした

export default {
  data(){
    return{
      date:''//空にしとく
    }
  },
  methods:{
    getDate(){
      this.date = format(new Date(), 'MMMM d,H:mm:ss')//日付はメソッドに
      setTimeout(this.getDate,1000)//１秒毎
    }
  },
  mounted(){
    this.getDate()//メソッド呼び出す
  }
}
</script>

<style>

</style>