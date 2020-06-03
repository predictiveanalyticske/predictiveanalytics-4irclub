import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let storage = window.localStorage;
let env     = process.env;

let VuexData = {
  state: {
      app: {
        auth: {
          access_token:    null,
          expires_in:      null,
          isAuthenticated: false,
          isAuthorized:    false,
          token_type:      null
        },
        env: {
          state: process.env.MIX_APP_ENV,
          backend_url: process.env.VUE_APP_ENDPOINT_URL,
        },
        data: {
          global: {}
        },
        home: {
          popups: false
        },
        loader: true,
      }
  },
  getters: {
    global: state => {
      return state.app.data.global;
    },
    isAuthenticated: state => {
      return state.app.auth.isAuthenticated;
    }
  },
  mutations: {
    access_token (state, val){
      state.app.auth.access_token = val
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
    token_type (state, val){
      state.app.auth.access_token = val
    }
  }
};

authenticate();

environment();

export default new Vuex.Store(VuexData);

function authenticate(){

  if( storage.length > 0 ){

     VuexData.state.app.auth.access_token    = storage.getItem('access_token');
     VuexData.state.app.auth.expires_in      = storage.getItem('expires_in');
     VuexData.state.app.auth.token_type      = storage.getItem('token_type');
     VuexData.state.app.auth.isAuthenticated = storage.getItem('access_token') != undefined ? true : false;

  }


}

function environment() {

  if( process.env.length > 0 ){

    VuexData.state.app.env.state = env.MIX_APP_ENV;
    VuexData.state.app.env.url   = env.MIX_APP_URL;

  }
}
