<template>
  <div id="app">
    <Board />
    <card-detail v-if="isOpen" />
    <button @click="open">モーダル表示する</button>
  </div>
</template>

<script>
import Board from './components/Board.vue'
import CardDetail from './components/CardDetail.vue'

export default {
  name: 'App',
  components: {
    Board,
    CardDetail
  },
  computed: {
    isOpen() {
      return this.$store.state.modal.isOpen
    }
  },
  methods: {
    open() {
      const payload = {
        isOpen: true
      }
      this.$store.dispatch('openModal', payload)
      .then(() => {
        alert('おっけを押しますか？')
      })
      .catch(() => {
        alert('キャンセルを押しますか？')
      })
    }
  }
}
</script>