<template>
  <v-app>
    <v-container>
      <h2 style="color: #00ACC1; margin-bottom: 10px">プロジェクトをみる</h2>
      <v-row v-for="article in articles" :key="article.id">
        <v-col>
          <v-card class="mb-5">
            <v-row>
              <v-col cols="2">
                <v-col align-self="start"  cols="12">
                <v-avatar tile size="100" color="cyan" :src="image_src" class="ml-5">
                  <img :src="image_src" alt="">
                </v-avatar>
                </v-col>
              </v-col>
              <v-col cols="10">
                <v-avatar class="profile" color="grey" size="60">
                  <v-img :src="image_src"></v-img>
                </v-avatar>
                    <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/personalproject')">{{ article.name }}</span>
                    <span class="overline mb-1 float-right grey--text">{{ article.date }}</span>
                    <p class="ma-5">{{ article.comment }}</p>
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
  name: 'project',
  layout: 'logggedIn',
  data() {
    return {
      name: this.$store.state.project.name,
      place: this.$store.state.project.place,
      date: this.$store.state.project.date,
      messageComment: this.$store.state.project.messageComment,
      image_src: require('@/assets/img/doing3.jpg'),
    }
  },
  computed: {
    articles() {
      return this.$store.getters['project/articles']
    },
    image: {
      get() {
        return this.$store.getters['project/image']
      },
      set(value) {
        this.$store.commit('project/setImage', value)
      }
    },
  },
  mounted() {
    this.$store.dispatch('project/getMessage');
  }
}
</script>

<style>

</style>
