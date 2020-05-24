<template>
  <v-app id="inspire">
    <template v-if="!isLogined()">
      <Header/>
      <div class="container">
        <router-view/>
      </div>
    </template>

    <SideBar v-else-if="isLogined()">
      <Header/>
      <div class="container">
        <router-view/>
      </div>
    </SideBar>
  </v-app>
</template>

<script>
  import Header from '@/components/Header'
  import SideBar from '@/components/SideBar'
  import Store from '@/store'

  export default {
    data: function () {
      return {
      }
    },
    components: {
      Header,
      SideBar
    },

    methods:{
      // ログインしているか
      isLogined() {
        return Store.state.auth.email != null
      },
    },

    mounted(){
      if(Store.state.auth.email == null && this.$route.name != 'Login'){
        this.$router.push({name: 'Login'})
      }
    },

  }
</script>