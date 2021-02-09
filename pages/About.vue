<template>
  <v-app align="center" justify="center">
    <v-container>
      <div class="cyan--text text--darken-1 text-h4 font-weight-bold ma-10">To Re-Create The Beautiful Earth</div>
      <p class="grey--text ma-10">世界を綺麗にするために、小さなことから行動を起こしていきましょう。</p>
      <p class="ma-10">一人ひとりが綺麗にするのも素晴らしい。<br>
      みんなでやればもっと綺麗になる。<br>
      地球を想っている誰かの行動に価値を見出そう。</p>
      <div class="font-weight-bold ma-10"><span class="blue--text text-h5 font-weight-bold">Cleaner</span>は、<span class="orange--text text-h6 font-weight-bold">「ゴミのない世界」</span>を望む人達が集うコミュニティ。</div>
      <div class="ma-10">今、世界は深刻な環境問題を抱えています。その中でも一際深刻なのが<span class="font-weight-bold">ゴミ問題</span>です。
      <p>(以下、2019年分の日本のデータ)</p>
      </div>
      <v-row class="text-h6">
        <v-col cols="12" md="4">
          <div>
            <v-icon color="blue">mdi-account</v-icon>
              ごみ排出量
          <p><span class="cyan--text text-darken-1 font-weight-bold">4,289</span>万トン</p>
        </div>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="12" md="3">
          <div>
            <v-icon color="blue">mdi-account</v-icon>
            東京ドーム
            <p><span class="cyan--text text-darken-1 font-weight-bold">115</span>杯分</p>
          </div>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="12" md="4">
          <div>
            <v-icon color="blue">mdi-account</v-icon>
            一人一日あたり
            <p><span class="cyan--text text-darken-1 font-weight-bold">920</span>グラム</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <div class="cyan--text text--darken-1 text-h4 font-weight-bold ma-10">Cleanerにかける想い</div>
        <v-row class="ma-10">
          <v-col cols="12" md="8">
            <div class="ma-10">何もかもが変わっていくこの時代、<br>
            <span class="orange--text">「ゴミ拾いはボランティア」</span>そんな考えを改めてもいいのではないのでしょうか。</div>
          <div>ゴミ拾いをイメージするとき、そこにはボランティアという意識がついてまわります。ボランティアとは、無償作業です。つまり一円ももらえません。それゆえ多くの人はやりたがらず、捨てられたゴミはそのまま環境を汚染していきます。</div>
          </v-col>
          <v-col cols="12" md="4">
            <v-img :src="picture1" width="200" height="200" class="ma-10"></v-img>
          </v-col>
        </v-row>
        <v-row class="ma-10">
          <v-col cols="12" md="4">
            <v-img :src="picture2" width="200" height="200"></v-img>
          </v-col>
          <v-col cols="12" md="8">
            <div>しかし、地球が汚れていく中、動けるのは我々人間しかいません。</div>
            <div class="ma-10">ゴミを拾う行為は、どんな人でもできる<span class="cyan--text text--darken-1">地球への思いやり</span>です。</div>
          </v-col>
        </v-row>
        <v-row class="ma-10">
          <v-col cols="12" md="8">
            <div>環境のことを考えてゴミを拾う、その想い・行動に価値はついてもいいのではないでしょうか。</div>
            <div class="ma-10">むしろ、そんな想いにこそ価値がつくべきではないでしょうか。</div>
          </v-col>
          <v-col cols="12" md="4">
            <v-img :src="picture3" width="200" height="200"></v-img>
          </v-col>
        </v-row>
    </v-container>
    <v-divider class="ma-10"></v-divider>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <div class="text-h5 grey--text text--darken-1 font-weight-bold ma-5">
          環境のことを考えて<br>
          ゴミを拾う人が対価を<br>
          得られるように
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="ma-5">ゴミ拾いをイメージするとき、誰もがそれでお金がもらえるとは思わないでしょう。</div>
          <div class="ma-5">このままでは誰も地球を綺麗にしていきたいとは思えない世の中になっていきます。</div>
          <div class="ma-5">環境問題がどんどん深刻化していく現代において、これから先もこれまでと同じような文化でいいのでしょうか。</div>
          <div class="ma-5">地道に活動する心優しい人たちの元に1円も届かない事実は、変えていく必要があるのではないでしょうか。</div>
          <div class="ma-5">「未来のことを想って、意義のあることをする人には対価が得られる」そんな文化こそ今の時代に必要なのではないでしょうか。</div>
        </v-col>
      </v-row>

      <div class="mt-10"><span class="blue--text text-h6 font-weight-bold">Cleaner</span>では誰かの行動に対して、「お疲れさま^^」の気持ちを【ジュースをプレゼントする(100円)】として、気軽に送れる仕組みを作っています。</div>
      <div class="ma-2">ジュース代くらいならもらう側も受け取りやすいし、渡す側も気軽に渡せるかと思います。</div>
      <div class="ma-2">大切なのは、「自分ひとりだけでやっている訳ではない」気持ちです。</div>
      <div class="mb-10">誰もが進んでゴミを拾って、この先の未来を明るいものにしていきましょう。</div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      picture1: require('../assets/img/garbage.jpg'),
      picture2: require('../assets/img/crow.jpg'),
      picture3: require('../assets/img/litter.jpg'),
    }
  }
}
</script>
