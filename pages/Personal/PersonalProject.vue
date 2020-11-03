<template>
  <v-app>
    <v-container v-for="personalData in personalDatas" :key="personalData.id">
      <v-card outlined class="mb-5">
        <v-row >
          <v-col align-self="start"  cols="2">
            <v-avatar class="profile" color="grey" size="100">
              <v-img :src="personalData.image"></v-img>
            </v-avatar>
          </v-col>
          <v-col>
            <v-list-item color="rgba(0, 0, 0, .4)">
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold title text-h4" dark>
                  {{ personalData.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="mb-5">Network Engineer</v-list-item-subtitle>
                <p>世界が綺麗になればいいなと思って日々活動しています。よろしくお願いいたします。</p>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card>
      <h2 class="mb-5">Johnさんのプロジェクト</h2>
      <v-card align="center" class="mb-10" v-for="personalData in personalDatas" :key="personalData.id">
        <v-row >
          <v-col cols="2">
            <p>{{ personalData.date}}</p>
          </v-col>
          <v-col class="font-weight-bold text-h5" cols="6">
            <p>{{ personalData.place }}</p>
          </v-col>
        </v-row>
        <v-img
          height="150"
          :src="personalData.image"
        ></v-img>
        <p>今日はいつも通る会社近くの神社のゴミ拾いをしました。あまりゴミ自体は多くなかったですが、綺麗になったので気持ちいいです。</p>
      </v-card>
      <v-card color="#E0F7FA" class="rounded-xl pa-5 mb-10" rounded>
        <h2 class="mx-10">クリーナーを応援しよう</h2>
        <v-row>
          <v-col cols="9">
            <v-avatar class="profile mx-10" color="grey" size="50">
              <v-img :src="personalData.image"></v-img>
            </v-avatar>
            <p class="mb-10 mx-10">Johnさんの行動に対してお金を送ってサポートすることが出来ます。</p>
            <v-btn color="#0D47A1" class="mx-10" rounded x-large dark>サポートする</v-btn>
          </v-col>
          <v-col cols="3">
            <v-avatar tile size="150" color="cyan" class="mx-5">
              <v-img :src="personalData.image" alt=""></v-img>
            </v-avatar>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'personalProject',
  layout: 'loggedIn',
  data() {
    return {
      image_src: require('@/assets/img/everyone.jpg'),
    }
  },
  computed: {
    personalDatas() {
      return this.$store.getters['project/personalDatas']
    }
  },
}
</script>

<style>

</style>
