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
                v-for="workspace in workspaces"
                :key="workspace.id"
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
  import { defineComponent, ref, onMounted } from "@vue/composition-api";
  import { Workspace } from '@/types/schema'
  import { fetchWorkspaces } from '@/api/workspace'

  export default defineComponent ({
    setup(_, { root }) {
      onMounted(() => {
        getWorkspaces();
      })

      const workspaces = ref<Workspace[]>([])

      // ユーザーが所属しているワークスペースを取得する
      const getWorkspaces = async () => {
        const response = await fetchWorkspaces(root.$store.state.auth.email)

        workspaces.value = response.data.workspaces
      }

      // ワークスペースが選択された時
      const onClickWorkspace = (workspace: Object) => {
        root.$store.commit('workspace/setWorkspace', workspace);
      }

      const imageUrl = (url: String) => `${process.env.VUE_APP_BASE_URL}/${url}`;

      return {
        workspaces,
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