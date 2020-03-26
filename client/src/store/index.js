import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const base = axios.create({
  baseURL: 'http://localhost:3000'
});

Vue.prototype.$axios = base;


export default new Vuex.Store({
  state: {
    baseURL: 'http://localhost:3000',
    isLogin: localStorage.getItem("token"),
    allData: null,
    oneProduct: null,
    allAdmins: null,
    successReg: false,
    successCheckout: false,
    banners: [],
    editBanner: {},
    transactions: [],
  },

  mutations: {
    allData(state, data) {
      state.allData = data
    },
    oneProduct(state, data) {
      state.oneProduct = data
    },
    allAdmins(state, data) {
      state.allAdmins = data
    },
    deleteToken(state) {
      state.isLogin = null
    },
    setToken(state) {
      state.isLogin = localStorage.getItem('token')
    },
    banners(state, data) {
      console.log(data, "MASUKKK WOEEEE");
      state.banners = data
    },
    editBanner(state, data) {
      state.editBanner = data
    },
    successMsg(state) {
      state.successReg = true
    },
    transactions(state, data) {
      state.transactions = data
    },
    successCheckout(state) {
      state.successCheckout = true
    },
    setFalseAlert(state) {
      state.successCheckout = false
    }
  },
  actions: {
    getAllData(context) {
      axios({
        method: 'GET',
        url: this.state.baseURL + '/products',
      })
        .then(data => {
          console.log(data);
          context.commit('allData', data.data)
        })
        .catch(({ response }) => {
          console.log(response);
        })
    },
    getAdmins(context) {
      axios({
        method: "GET",
        url: this.state.baseURL + '/admins',
        headers: ({ token: localStorage.getItem('token') })
      })
        .then(({ data }) => {
          console.log(data);
          context.commit('allAdmins', data)
        })
        .catch(({ response }) => {
          console.log(response);
        })
    },
    getOneData(context, id) {
      axios({
        method: 'GET',
        url: this.state.baseURL + `/products/${id}`
      })
        .then(({ data }) => {
          console.log(data, 'cekincekin');
          context.commit('oneProduct', data)
        })
        .catch(({ response }) => {
          console.log(response);
        })
    },
    getBanners(context) {
      axios({
        url: this.state.baseURL + '/banners',
        method: 'GET',
        headers: ({ token: localStorage.getItem("token") })
      })
        .then(({ data }) => {
          context.commit('banners', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    dataEditBanner(context, id) {
      axios({
        url: this.state.baseURL + '/banners/' + id,
        method: 'GET',
        headers: ({ token: localStorage.getItem('token') })
      })
        .then(({ data }) => {
          context.commit('editBanner', data)
        })
        .catch(({ response }) => {
          console.log(response);

        })
    },
    getAllTransaction(context) {
      axios({
        url: this.state.baseURL + '/transaction/allCart',
        method: "GET",
        headers: ({ token: localStorage.getItem("token") })
      })
        .then(({ data }) => {
          context.commit("transactions", data)
        })
        .catch(({ response }) => {
          console.log(response);
        })
    }
  },
  modules: {}
});
