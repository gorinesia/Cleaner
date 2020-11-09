<template>
  <v-app>
    <v-container>
      <v-main app>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar';

export default {
  name: 'dashboard',
  layout: 'loggedIn',
  components: {
    Sidebar
  },
  data() {
    return {
      name: this.$store.state.project.name,
      place: this.$store.state.project.place,
      date: this.$store.state.project.date,
      messageComment: this.$store.state.project.messageComment,
      users: [],
      item: 0,
      dialog: false,
      loggedIn: this.$store.state.user.loggedIn,
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/currentUser']
    },
    loginUsers() {
      return this.$store.getters['user/loginUsers']
    },
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
    events() {
      return this.$store.getters['event/articles']
    },
    image: {
      get() {
        return this.$store.getters['event/image']
      },
      set(value) {
        this.$store.commit('event/setImage', value)
      }
    }
  },
  mounted() {
    this.$store.dispatch('user/logInUserDisplay');
    this.$store.dispatch('project/getMessage');
    this.$store.dispatch('event/getMessage');
  },
  methods: {
    getPersonalProjectId(id) {
      this.$store.dispatch('project/getPersonalProjectId', {
        id
      })
    },
    getPersonalEvent(id) {
      this.$store.dispatch('event/getPersonalEvent', {
        id
      })
    },
    btnUploadChange(ev) {
      this.$store.dispatch('project/btnUploadChange', {
        ev
      });
    },
    addMessage() {
      this.$store.dispatch('project/addMessage', {
        name: this.name,
        place: this.place,
        comment: this.messageComment,
        image: this.image,
        date: new Date().toLocaleString()
      });
      this.name = '';
      this.place = '';
      this.messageComment = '';
      this.date = '';
    },
    getPersonalId(id) {
      this.$store.dispatch('project/getPersonalData', {
        id
      })
    },
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.v-card.on-hover {
  background-color: #ECEFF1;
  // opacity: 0.6;
 }
</style>
