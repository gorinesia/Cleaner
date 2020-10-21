<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-card class="mx-auto" outlined>
            <v-row align="end" class="fill-height">
              <v-col align-self="start"  cols="12">
                <v-avatar class="profile" color="grey" size="164">
                  <v-img :src="image_src"></v-img>
                </v-avatar>
              </v-col>
              <v-col class="py-0">
                <v-list-item color="rgba(0, 0, 0, .4)">
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold title" style="color: #00ACC1">
                      AKI
                    </v-list-item-title>
                    <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="10">
          <h2 style="color: #00ACC1; margin-bottom: 10px">プロジェクトをみる</h2>
          <v-card class="mb-5">
            <v-row>
              <v-col cols="2">
                <v-col align-self="start"  cols="12">
                <v-avatar tile size="120" color="cyan" :src="image_src" class="ml-5">
                  <img :src="image_src" alt="">
                </v-avatar>
                </v-col>
              </v-col>
              <v-col cols="10">
                <v-avatar class="profile" color="grey" size="80">
                  <v-img :src="image_src"></v-img>
                </v-avatar>
                    <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;" @click="$router.push('/personal/personalproject')">John</span>
                    <span class="overline mb-1 float-right grey--text">10分前</span>
                    <p class="ma-5">会社の近くの神社です。</p>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="mb-5">
            <v-row>
              <v-col cols="2">
                <v-col align-self="start"  cols="12">
                <v-avatar tile size="120" color="cyan" :src="image_src" class="ml-5">
                  <img :src="image_src" alt="">
                </v-avatar>
                </v-col>
              </v-col>
              <v-col cols="10">
                <v-avatar class="profile" color="grey" size="80">
                  <v-img :src="image_src"></v-img>
                </v-avatar>
                    <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;">John</span>
                    <span class="overline mb-1 float-right grey--text">10分前</span>
                    <p class="ma-5">会社の近くの神社です。</p>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="mb-5">
            <v-row>
              <v-col cols="2">
                <v-col align-self="start"  cols="12">
                <v-avatar tile size="120" color="cyan" :src="image_src" class="ml-5">
                  <img :src="image_src" alt="">
                </v-avatar>
                </v-col>
              </v-col>
              <v-col cols="10">
                <v-avatar class="profile" color="grey" size="80">
                  <v-img :src="image_src"></v-img>
                </v-avatar>
                    <span class="headline mb-3 font-weight-bold" style="color: #00ACC1;">John</span>
                    <span class="overline mb-1 float-right grey--text">10分前</span>
                    <p class="ma-5">会社の近くの神社です。</p>
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
  data() {
    return {
      image_src: require('@/assets/img/everyone.jpg'),
      messages: [
        {
          avatar: 'image_src',
          name: 'John Leider',
          title: 'Welcome to Vuetify!',
          excerpt: 'Thank you for joining our comminity...',
        }
      ]
    }
  }
}
</script>

<style>

</style>
