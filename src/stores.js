import Vue from 'vue'
import Vuex from 'vuex'

let storage = window.localStorage;

Vue.use(Vuex);

let VuexData = {
  state: {
      app: {
        auth: {
          access_token:    null,
          refresh_token:   null,
          expires_in:      null,
          isAuthenticated: false,
          isAuthorized:    false,
          isSubscribed:    storage.getItem('isSubscribed'),
          isPaid:          storage.getItem('isPaid'),
          token_type:      null
        },
        banner: {
          show: false,
          content: {
            title: null,
            message: null
          }
        },
        env: {
          state: process.env.MIX_APP_ENV,
          backend_url: process.env.VUE_APP_ENDPOINT_URL,
        },
        data: {
          pendingPayment: storage.getItem('pendingPayment'),
          global: {}
        },
        home: {
          popups: false
        },
        loader: true,
        sidebar: false
      }
  },
  getters: {
    global: state => {
      return state.app.data.global;
    },
    isAuthenticated: state => {
      return state.app.auth.isAuthenticated;
    },
    isPaid: state => {
      return state.app.auth.isPaid;
    },
    pendingPayment: state => {
      return state.app.data.pendingPayment;
    },
    isSubscribed: state => {
      return state.app.auth.isSubscribed;
    },
    backendurl: state => {
      return state.app.env.backend_url;
    },
    banner_title: state => {
      return state.app.banner.content.title;
    },
    banner_message: state => {
      return state.app.banner.content.message;
    },
    banner_show: state => {
      return state.app.banner.show;
    },
    loader: state => {
      return state.app.loader;
    },
    sidebar: state => {
      return state.app.sidebar;
    },
  },
  mutations: {
    access_token (state, val){
      state.app.auth.access_token = val
    },
    banner_title (state, val){
      state.app.banner.content.title = val
    },
    banner_content (state, val){
      state.app.banner.content.message = val
    },
    banner_show (state, val){
      state.app.banner.show = val
    },
    loader (state, val){
      state.app.loader = val
    },
    refresh_token (state, val){
      state.app.auth.refresh_token = val
    },
    expires_in (state, val){
      state.app.auth.expires_in = val
    },
    isAuthenticated (state, val){
      state.app.auth.isAuthenticated = val
    },
    isAuthorized (state, val){
      state.app.auth.isAuthorized = val
    },
    isSubscribed (state, val){
      state.app.auth.isSubscribed = val
    },
    isPaid (state, val){
      state.app.auth.isPaid = val
    },
    sidebar (state, val){
      state.app.sidebar = val
    },
    token_type (state, val){
      state.app.auth.token_type = val
    }
  }
};

authenticate();

export default new Vuex.Store(VuexData);

function authenticate(){

  if( storage.length > 0 ){

     VuexData.state.app.auth.access_token    = storage.getItem('access_token');
     VuexData.state.app.auth.expires_in      = storage.getItem('expires_in');
     VuexData.state.app.auth.token_type      = storage.getItem('token_type');
     VuexData.state.app.auth.isAuthenticated = storage.getItem('access_token') != undefined ? true : false;

  }


}
