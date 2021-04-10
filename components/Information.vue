<template>
  <v-container>
    <v-row class="box">
      <v-col class="border-box" cols="12" md="4" align="center" justify="center">
        <div class="title font-weight-bold">誰でもできる</div>
        <img src="~/assets/img/lonly.jpg" />
        <p class="text">あなた自身が<span class="cyan--text text--darken-1 font-weight-bold">クリーナー</span>(掃除屋)となり、ゴミ拾いを<span class="orange--text font-weight-bold">プロジェクト</span>としてはじめることができます。マイページで日々のプロジェクトを気軽に投稿できます。
        </p>
      </v-col>
      <v-col class="border-box" cols="12" md="4" align="center" justify="center">
        <div class="title font-weight-bold">みんなでできる</div>
        <img src="~/assets/img/people.jpg" />
        <p class="text"><span class="orange--text font-weight-bold">イベント</span>を企画し、自分のプロジェクトに仲間を募ったり、誰かのプロジェクトに参加することもできます。
        </p>
      </v-col>
      <v-col class="border-box" cols="12" md="4" align="center" justify="center">
        <div class="title font-weight-bold">誰かをサポートできる</div>
        <img src="~/assets/img/support.jpg" />
        <p class="text">誰かの日々のプロジェクトや企画したイベントに対して、「お疲れさま」の意味を込めて、金銭的な<span class="orange--text font-weight-bold">サポート</span>を施すことができます。
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.box {
  width: 100%;
}
.border-box {
  box-sizing: border-box;
  border-right: 1px solid #000;
}
.border-box:last-of-type {
  border-right: none;
}
.title {
  font-size: 18px;
}
.text {
  line-height: 1.6em;
}
</style>
