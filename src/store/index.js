import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedLists = localStorage.getItem('trello-lists')

const store = new Vuex.Store({
  state: {
    modal: {
      isOpen: false,
      resolve:(bool) => bool,
      reject:(bool) => bool
    },
    lists: savedLists ? JSON.parse(savedLists): [
      {
        title: 'Backlog',
        cards: []
      },
      {
        title: 'Todo',
        cards: []
      },
      {
        title: 'Doing',
        cards: []
      }
    ],
  },
  mutations: {
    addlist(state, payload) {
      state.lists.push({ title: payload.title, cards:[] })
    },
    removelist(state, payload) {
      state.lists.splice(payload.listIndex, 1)
    },
    addCardToList(state, payload) {
      state.lists[payload.listIndex].cards.push({ body: payload.body })
    },
    removeCardFromList(state, payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex, 1)
    },
    updateList(state, payload) {
      state.lists = payload.lists
    },
    openModal(state, payload) {
      state.modal = payload
    },
    commitResetModalState(state) {
      state.modal = {
        type:"",
        text:"",
        resolve:(bool) => bool,
        reject:(bool) => bool,
      }
    }
  },
  actions: {
    addlist(context, payload) {
      context.commit('addlist', payload)
    },
    removelist(context, payload) {
      context.commit('removelist', payload)
    },
    addCardToList(context, payload) {
      context.commit('addCardToList', payload)
    },
    removeCardFromList(context, payload) {
      context.commit('removeCardFromList', payload)
    },
    updateList(context, payload) {
      context.commit('updateList', payload)
    },
    openModal(context, payload) {
      context.commit('openModal', payload)
    },
    actionModalOpen({commit}, payload) {
      return new Promise((resolve, reject) => {
        const option = {
          resolve,
          reject,
          ...payload,
        }
        commit('commitModalOpen', option)
      })
    },
    actionModalResolve({commit, state}) {
      state.modal.reslolve(true)
      commit('commitResetModalState')
    },
    actionModalReject({commit, state}) {
      state.modal.reject(false)
      commit('commitResetModalState')
    }
  },
  getters: {
    totalCardCount(state) {
      let count = 0
      state.lists.map(content => count += content.cards.length)
      return count
    }
  }
})

store.subscribe((mutation, state) => {
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})

export default store