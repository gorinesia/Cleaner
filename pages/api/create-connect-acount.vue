<template>
  <layout>
    <main>
      <h2>店舗オーナー用のメニュー</h2>
      <div class="">
        <div @click="getSetLink">
          <p>店舗の銀行口座を登録する</p>
        </div>
      </div>
    </main>
  </layout>
</template>

<script>
import stripe from 'stripe'

export default {
  methods: {
    async getSetLink() {
      const result = await POST('/api/create-connect-account', {
        name: 'test',
        email: 'test@mail.com'
      })
      await router.push(result.url)
    }
  }
}
</script>

<style>

</style>
