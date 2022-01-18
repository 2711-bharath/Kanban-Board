import axios from "axios";
import bcrypt from 'bcryptjs';

const api = 'https://kanban-server-2711.herokuapp.com';

const state = {
    users: Array,
    user: Object,
    isLoggedIn: Boolean(localStorage.getItem('user'))
};

const getters = {
    user: state => state.user,
    users: state => state.users,
    isLoggedIn: state => state.isLoggedIn
};

const actions = {
    async fetchusers({ commit }) {
        const res = await axios.get(`${api}/users`);
        commit('setusers', res.data);
    },
    
    async fetchuser({ commit }, userId) {
        const res = await axios.get(`${api}/users/${userId}`);
        commit('setuser', res.data);
    },

    async adduser({ commit }, user) {
        const res = await axios.post(`${api}/users`, user);
        localStorage.setItem("user", true)
        localStorage.setItem("id", res.data._id)
        commit('setLoginStatus', true)
    },

    login({ state }, userData) {
        const user = state.users.filter(user => user.email === userData.email && bcrypt.compareSync(userData.password, user.password))[0];
        return user
    },

    setuser({ commit }, userId) {
        localStorage.setItem("user", true)
        localStorage.setItem("id", userId)
        commit('setLoginStatus', true)
    },

    removeuser({commit}) {
        localStorage.removeItem("user")
        localStorage.removeItem("id")
        commit('setLoginStatus', false)
    }
};

const mutations = {
    setusers: (state, users) => {state.users = users},
    setuser: (state, user) => {state.user = user},
    setLoginStatus: (state, status) => {state.isLoggedIn = status},
};

export default {
    state,
    getters,
    actions,
    mutations,
}