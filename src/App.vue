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

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import Header from '@/components/Header.vue'
  import SideBar from '@/components/SideBar.vue'

  @Component({
    components: {
      Header,
      SideBar
    }
  })

  export default class App extends Vue {
    isLogined() {
      return this.$store.state.auth.email != null
    }

    mounted(){
      if(this.$store.state.auth.email == null && this.$route.name != 'Login'){
        this.$router.push({name: 'Login'})
      }
    }
  }
</script>