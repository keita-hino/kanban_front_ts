<template>
  <v-card
    app
    class="mx-auto"
    height="300"
    width="330"
  >
    <v-navigation-drawer
      app
      permanent
      width="100%"
    >
      <v-row class="fill-height" no-gutters>
        <v-navigation-drawer
          app
          dark
          mini-variant
          mini-variant-width="56"
          permanent
        >

          <v-divider></v-divider>

          <v-list
            dense
            nav
            class="pt-0"
          >

            <v-list-item-action>
              <v-avatar
                v-for="workspace in state.workspaces" :key="workspace.id"
                size="36"
                :tile="true"
                class="mb-4 avator"
                v-ripple
                @click="onClickWorkspace(workspace)"
              >
                <img
                  :src="imageUrl(workspace.image_url)"
                  alt="John"
                  @click="''"
                >
              </v-avatar>
            </v-list-item-action>

          </v-list>
        </v-navigation-drawer>
        <slot/>
      </v-row>
    </v-navigation-drawer>
  </v-card>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, onMounted } from "@vue/composition-api";
  import { Component, Vue } from 'vue-property-decorator';
  import { WorkspaceData } from '@/types/workspace'
  import { fetchWorkspaces } from '@/api/workspace'

  export default defineComponent ({
    setup(_props, context) {
      onMounted(() => {
        getWorkspaces();
      })

      const state = reactive<{ workspaces: WorkspaceData[] }>({
        workspaces: []
      });

      // ユーザーが所属しているワークスペースを取得する
      const getWorkspaces = async () => {
        const response = await fetchWorkspaces(context.root.$store.state.auth.email)

        state.workspaces = response.data.workspaces
      }

      // ワークスペースが選択された時
      const onClickWorkspace = (workspace: Object) => {
        context.root.$store.commit('workspace/setWorkspace', workspace);
      }

      const imageUrl = (url: String) => {
        return `${process.env.VUE_APP_BASE_URL}/${url}`
      }

      return {
        state,
        onClickWorkspace,
        imageUrl,
      };
    }
  })
</script>

<style>
  .avator{
    cursor: pointer;
    cursor: hand;
  }
</style>