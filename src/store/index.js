import Vuex from 'vuex';
import tasks from './modules/tasks'
import user from './modules/user'

// creating a store
export default new Vuex.Store({
    modules: {
        tasks,
        user
    }
})