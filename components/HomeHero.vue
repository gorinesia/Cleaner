<template>
  <section class="home-hero">
    <v-container fluid fill-height class="home-hero__content">
      <v-row>
        <v-col class="home-hero__content-text">
          <p>世界を綺麗にしよう</p>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
.home-hero__content {
  background: url('../assets/img/top-background.jpg');
  background-size: cover;
  background-position: center;
  width: 500px;
  height: 300px;
  float: right;
  margin-right: 20px;
  border-radius: 20%;

  &-text {
    color: orange;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
  }
}
</style>
