import axios from "axios";

const api = 'https://kanban-server-2711.herokuapp.com';

const state = {
    tasks: []
};

const getters = {
    alltasks: (state) => {
        const data = {'ON HOLD': [], 'IN PROGRESS': [], 'NEEDS REVIEW': [], 'APPROVED': []}
        state.tasks.map(task => {
            data[task.status].push(task);
        })
        return data;
    }
};

const actions = {
    async fetchTasks({ commit }) {
        const res = await axios.get(`${api}/tasks`);
        commit('settasks', res.data);
    },
    
    async addTask({ commit }, newTask) {
        const res = await axios.post(`${api}/tasks`, newTask);
        commit('newTask', res.data);
    },
    
    async deleteTask({ commit }, id) {
        const res = await axios.delete(`${api}/tasks/${id}`);
        if(res.status === 200)
            commit('removeTask', id);
        else
            alert('Error in deleting task')
    },

    async updateTask({ commit }, updTask) {
        const res = await axios.patch(`${api}/tasks/${updTask._id}`, updTask);
        commit('updateTask', res.data);
    },
};

const mutations = {
    settasks: (state, tasks) => {state.tasks = tasks},
    newTask: (state, task) => state.tasks.unshift(task),
    removeTask: (state, id) => state.tasks = state.tasks.filter(task => task._id !== id),
    updateTask: (state, uptask) => {
        const idx= state.tasks.findIndex(task => task._id === uptask._id);
        if(idx !== -1)
            state.tasks.splice(idx, 1, uptask)
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}