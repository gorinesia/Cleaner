<template>
  <v-app class="mx-10">
    <v-container v-for="personalProject in personalProject" :key="personalProject.id">
      <v-card outlined class="mb-10">
        <v-row  class="fill-height">
          <v-col align-self="start"  cols="2">
            <v-avatar class="profile ml-3 mt-3" color="grey" size="80">
              <v-img :src="personalProject.displayImage"></v-img>
            </v-avatar>
          </v-col>
          <v-col>
            <v-list-item color="rgba(0, 0, 0, .4)">
              <v-list-item-content>
                <v-list-item-title class="cyan--text text--darken-1 font-weight-bold title mb-2" dark>
                  {{ personalProject.displayName}}
                </v-list-item-title>
                <p class="grey--text mb-2">{{ personalProject.place }}</p>
                <div>
                  <!-- <p v-if="personalDatas[0].comment">{{ personalDatas[0].comment }}</p> -->
                  <!-- <p v-else>コメントはありません</p> -->
                </div>

              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card>

      <v-card>
        <v-tabs
          v-model="tabs"
          background-color="cyan darken-1"
          centered
          dark
          icons-and-text
        >
          <v-tab
            v-for="n in items"
            :key="n"
          >
          {{ n }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <v-card class="mb-5">
              <template >
                <v-divider />
                <v-hover v-slot="{ hover }">
                  <v-card :class="{ 'on-hover': hover }" @click="getPersonalProject(personalProject.id)">
                    <v-row>
                      <v-col cols="3">
                        <v-avatar tile size="100" class="ml-5">
                          <v-img :src="personalProject.image"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col cols="4">
                        <v-avatar class="profile" color="grey" size="60">
                          <v-img :src="personalProject.displayImage"></v-img>
                        </v-avatar>
                        <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;">{{ personalProject.displayName }}</span>
                        <p class="my-5 font-weight-bold">{{ personalProject.comment }}</p>
                      </v-col>
                      <v-col cols="5">
                        <span class="grey--text float-right">{{ personalProject.date}}</span>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-hover>
              </template>
          </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-1">1030日</div>
                  <div class="headline mb-3 font-weight-bold">渋谷の路上でゴミを拾います。</div>
                  <p class="mb-5">僕たちにできることを。人もゴミも多く、やりがいのある場所をみんなで綺麗にしませんか？</p>
                  <p class="font-weight-bold">日時： 10月3日  9:00~12:00</p>
                  <p class="font-weight-bold">場所： 東京都渋谷区</p>
                </v-list-item-content>

                <v-avatar tile size="200" color="cyan" :src="image_src" class="ml-5">
                  <img :src="image_src" alt="">
                </v-avatar>
              </v-list-item>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'profile',
  data() {
    return {
      tabs: null,
      items: [
        'プロジェクト', 'イベント',
      ],
      image_src: require('@/assets/img/everyone.jpg'),
    }
  },
  computed: {
    personalDatas() {
      return this.$store.getters['user/personalDatas']
    },
    articles() {
      return this.$store.getters['project/articles']
    },
    personalProject() {
      return this.$store.getters['project/personalProject']
    }
  },
  methods: {
    getPersonalProject(id) {
      this.$store.dispatch('project/getPersonalProject', {
        id
      })
    },
    getPersonalEvent(id) {
      this.$store.dispatch('event/getPersonalEvent', {
        id
      })
    }
  }
}
</script>

<style>

</style>
