<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" align="center" justify="center">
        <div class="font-weight-bold">誰でもできる</div>
        <img src="~/assets/img/lonly.jpg">
        <p>あなた自身が<span class="cyan--text text--darken-1 font-weight-bold">クリーナー</span>(掃除屋)となり、ゴミ拾いを<span class="orange--text font-weight-bold">プロジェクト</span>としてはじめることができます。マイページで日々のプロジェクトを気軽に投稿できます。</p>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" md="4" align="center" justify="center">
        <div class="font-weight-bold">みんなでできる</div>
        <img src="~/assets/img/people.jpg">
        <p><span class="orange--text font-weight-bold">イベント</span>を企画し、自分のプロジェクトに仲間を募ったり、誰かのプロジェクトに参加することもできます。</p>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" md="3" align="center" justify="center">
        <div class="font-weight-bold">誰かをサポートできる</div>
        <img src="~/assets/img/support.jpg">
        <p>誰かの日々のプロジェクトや企画したイベントに対して、「お疲れさま」の意味を込めて、金銭的な<span class="orange--text font-weight-bold">サポート</span>を施すことができます。</p>
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

p {
  white-space: pre-wrap;
}
</style>
