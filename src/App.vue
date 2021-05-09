<template>
  <v-app id="inspire">
    <template v-if="isLogined">
      <SideBar>
        <Header/>
        <div class="container">
          <router-view/>
        </div>
      </SideBar>
    </template>

    <template else>
      <Header/>
      <div class="container">
        <router-view/>
      </div>
    </template>
  </v-app>
</template>

<script lang="ts">
  import { defineComponent, computed, onMounted } from "@vue/composition-api";

  import Header from '@/components/Header.vue'
  import SideBar from '@/components/SideBar.vue'

  export default defineComponent({
    components: { Header, SideBar },

    setup(_, { root }){
      onMounted(() => {
        if(root.$store.state.auth.email == null && root.$route.name != 'Login'){
          root.$router.push({name: 'Login'})
        }
      })
      const isLogined = computed(() => root.$store.state.auth.email != null);

      return { isLogined }      
    }
  })
</script>
