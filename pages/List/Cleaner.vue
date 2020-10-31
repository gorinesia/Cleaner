<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <h2 style="color: #00ACC1; margin-bottom: 10px">クリーナーをみる</h2>
          <v-card class="mb-5">
            <v-row v-for="allUser in allUsers" :key="allUser.id">
              <v-col cols="2">
                <v-col align-self="start"  cols="12">
                  <v-avatar class="profile" color="grey" size="120">
                    <v-img :src="image_src"></v-img>
                  </v-avatar>
                </v-col>
              </v-col>
              <v-col cols="10">
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/profile')">{{ allUser.displayName }}</div>
                    <div class="overline mb-1">10月18日</div>
                    <p class="mb-5 font-weight-bold">ロンドンを綺麗にしましょう。</p>
                  </v-list-item-content>

                  <v-avatar tile size="200" color="cyan" :src="image_src" class="ml-5">
                    <img :src="image_src" alt="">
                  </v-avatar>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'cleaner',
  data() {
    return {
      image_src: require('@/assets/img/doing3.jpg'),
    }
  },
  computed: {
    allUsers() {
      return this.$store.getters['user/allUsers']
    },
  },
  mounted() {
    this.$store.dispatch('user/openTheApplication');
  },
}
</script>

<style>

</style>
