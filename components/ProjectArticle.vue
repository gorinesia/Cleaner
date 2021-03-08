<template>
  <div>
    <v-divider />
    <v-hover v-slot ="{ hover }">
      <v-card :class="{ 'on-hover': hover }" @click="getPersonalId(article.id)">
        <v-row>
          <v-col cols="12" md="2">
            <v-avatar tile size="100" class="ml-5">
              <v-img :src="article.image"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="12" md="1">
            <v-avatar class="profile" color="grey" size="60">
              <v-img :src="article.displayImage"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="12" md="5">
            <span class="user--name">{{ article.displayName }}</span>
            <span class="user--place">{{ article.place}}</span>
            <p class="my-2 font-weight-bold">{{ article.comment }}</p>
            <div v-if="loggedIn">
              <v-icon v-if="article.beLiked" color="orange" :id="article.id" @click.stop="unlike(article.id)">mdi-thumb-up</v-icon>
              <v-icon v-else color="orange" @click.stop="like(article.id)" outlined>mdi-thumb-up-outline</v-icon>
            </div>
            <div v-else>
              <div>
                <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{ on, attrs}">
                    <v-icon color="orange" v-if="!applyFlag" class="white--text" v-bind="attrs " v-on="on" medium outlined>mdi-thumb-up-outline</v-icon>
                    <!-- <span>{{ post.likeSum }}</span> -->
                  </template>
                  <v-card>
                    <v-card-title>Need to Login</v-card-title>
                    <v-card-text>ログインしてCleanerを楽しみませんか？</v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="cyan" outlined rounded to="/auth/login">ログイン</v-btn>
                      <v-btn color="orange" outlined rounded @click="dialog = false">閉じる</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <span class="grey--text float-right mr-5"><v-icon>mdi-scale</v-icon>{{ article.name }}・{{ article.date}}</span>
          </v-col>
        </v-row>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  computed: {
    articles() {
      return this.$store.getters['project/articles']
    },
  }
}
</script>

<style>

</style>
