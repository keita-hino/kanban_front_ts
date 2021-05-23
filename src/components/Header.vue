<template>
  <v-app-bar
    color="blue lighten-1"
    dense
    dark
    app
  >

    <v-toolbar-title>
      <v-img alt="Vue logo" src="../assets/logo.png"/>
    </v-toolbar-title>

    <v-spacer></v-spacer>

      <!-- プロフィール周り -->
      <v-menu offset-y>
        <template v-if="isLogined" v-slot:activator="{ on }">
          <a v-on="on" class="profile-menu">
            <!-- TODO:後にプロフィール画像にする -->
            {{ fullName }}
            <i class="v-icon profile-menu notranslate hidden-sm-and-down mdi mdi-menu-down theme--light"></i>
          </a>
        </template>

        <v-list tag="a" dense>
          <v-list-item>
            <v-list-item-title @click="onProfileModalOpen">プロフィール編集</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    <v-tooltip v-if="isLogined" bottom>
      <template v-slot:activator="{ on }">
        <div v-on="on">
          <v-btn icon @click="onClickLogout">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
        </template>
      <span>ログアウト</span>
    </v-tooltip>

    <UserProfileModal
      @on-click-modal-cancel="onClickModalCancel"
      @update-user="onClickUpdateUser"
      :is-profile-modal-show="isProfileModalShow"
      :user="state.user"
    />

  </v-app-bar>
</template>

<script lang="ts">
  import _ from 'lodash';

  import { User } from '@/types/schema'

  import { defineComponent, reactive, ref, computed } from '@vue/composition-api'
  import UserProfileModal from './UserProfileModal.vue';
  import { updateUser} from '@/api/user'

  export default defineComponent({
    components: { UserProfileModal},

    setup(_props, context){
      const state = reactive<{ user: User }>({
        user: {}
      })

      const drawer = ref<boolean>( false )
      const isProfileModalShow = ref<boolean>( false )

      // ログアウトボタン押下時
      const onClickLogout = () => {
        context.root.$store.commit('auth/logout');
        context.root.$router.push({name: 'Login'})
      }

      // ユーザ設定モーダルでキャンセルボタンが押された時
      const onClickModalCancel = () => {
        isProfileModalShow.value = false;
      }

      // ユーザ設定モーダルで更新ボタンが押された時
      const onClickUpdateUser = async (user: User) =>  {
        await updateUser(state.user)

        isProfileModalShow.value = false;
        context.root.$store.commit('auth/logout');
        context.root.$router.push({name: 'Login'})
      }

      // フルネーム取得
      const fullName = computed(() => `${context.root.$store.state.auth.last_name} ${context.root.$store.state.auth.first_name}`);

      // ログインしているか
      const isLogined = computed(() => context.root.$store.state.auth.email != null);

      // プロファイル設定モーダルを開く
      const onProfileModalOpen = () => {
        isProfileModalShow.value = true;
        state.user = _.cloneDeep(context.root.$store.state.auth)
      }

      return {
        state,
        isProfileModalShow,
        drawer,
        onClickLogout,
        onClickModalCancel,
        onClickUpdateUser,
        fullName,
        isLogined,
        onProfileModalOpen
      }
    }
  })
</script>

<style>
  .profile-menu{
    color:#ffffff !important;
  }
</style>