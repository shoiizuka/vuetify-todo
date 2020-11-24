<template>
  <v-app id="inspire">
    <!-- サイドビュー -->
    <v-navigation-drawer 
     v-model="drawer"
     :mobile-breakpoint="768"
     app
     >
     <!-- メインページと合わせる -->
        <v-img
          class="pa-4 pt-7"
          src="mountains.jpg"
          height="170"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        >
        <!-- アバター -->
        <v-avatar
          size="70"
          class="mb-2"
          >
          <img
            src="セミナー情報どっとこむ.jpg"
            alt="IIZUKA"
          >
        </v-avatar>
          <div class="white--text text-subtitle-1 font-weight-bold">
            飯塚翔
          </div>
          <div class="white--text text-subtitle-2">syo__iiduka</div>
        </v-img>

        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to='item.to'
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>

  <!-- 条件付き高さバインド -->
    <v-app-bar
      app
      color="primary"
      dark
      src="mountains.jpg"
      prominent
      :height="$route.path === '/' ? '238': '170'"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
        ></v-img>
      </template>

      <v-container class="header-container pa-0">
      <!-- ヘッダー上側のアイテム -->
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <!-- 検索窓 小 -->
          <search/>
        </v-row>
      <!-- ヘッダー下側のアイテム -->
        <v-row>
          <v-toolbar-title class="text-h4 ml-4">
            {{$store.state.appTitle}}
            </v-toolbar-title>
        </v-row>
        <v-row >
          <live-date-time/>
        </v-row>
        <v-row v-if="$route.path === '/'">
        <!-- 追加フォーム小コンポに移動 -->
          <field-add-task/>
        </v-row>
      </v-container>

      

    </v-app-bar>

    <v-main>
       <router-view></router-view>
       <snackbar/>
    </v-main>
  </v-app>
</template>

<script>

  export default {
    data: () => ({ 
      drawer: null,
      items: [
        { title: 'ToDo', icon: 'mdi-format-list-checks' ,to:'/'},
        { title: 'About', icon: 'mdi-help-box',to:'/about' },
      ],  
    }),
    mounted(){
      this.$store.dispatch('getTasks') //dbからタスクを取得
    },
    components:{
      'search':require('@/components/Tools/Search.vue').default,
      'live-date-time':require('@/components/Tools/LiveDate.vue').default,
      'field-add-task' : require('@/components/Todo/FieldAddTask.vue').default,
      'snackbar':require('@/components/Shared/Snackbar.vue').default,
    }
  }
</script>

<style lang="sass">
  .header-container
    max-width: none !important
</style>