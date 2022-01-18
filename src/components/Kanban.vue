<template>
    <div class="kanban-row">
        <div class="col" 
            v-for="state in states" 
            :key="state"
            @dragover="allowDrop($event)"
            @drop="onDrop($event, state)"
            >
            <div class="title" :class="state.split(' ').join('-').toLowerCase()">
                <div>
                    {{state}}
                </div>
                <div>
                    <i class="fas fa-plus fa-sm" @click="toggleInput(state)" v-show="!showInput[state]"></i>
                    <i class="fas fa-times fa-sm" @click="toggleInput(state)" v-show="showInput[state]"></i>
                </div>
            </div>
            <form @submit="addtask($event, state)" v-show="showInput[state]">
                <label for="title">Task</label>
                <input type="text" v-model="todo" id="title">
                <div style="text-align:center">
                    <input type="submit" value="ADD TASK">
                </div>
            </form>
            <div class="task"
                v-for="task in sortTasks(alltasks[state])" 
                :key="task"    
                draggable="true"
                @dragstart="startDrag($event, task, state)"
            >
                <p class="todo">{{task.todo}}</p>
                <div class="user"><i class="fas fa-user fa-x"></i> {{task.createdBy}}</div>
                <div class="task-footer" :style="task.createdAt?'justify-content: space-between':'justify-content: flex-end'">
                    <div v-if="task.createdAt">{{task.createdAt}}</div>
                    <i class="fas fa-trash-alt fa-x" @click="deletetask(task._id)"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Kanban',
    data() {
        return {
            states: ['ON HOLD', 'IN PROGRESS', 'NEEDS REVIEW', 'APPROVED'],
            showInput: {
                'ON HOLD': false,
                'IN PROGRESS': false,
                'NEEDS REVIEW': false,
                'APPROVED': false
            },
            todo: '',
        }
    },
    methods: {
        ...mapActions(['fetchTasks', 'deleteTask', 'updateTask', 'addTask', 'fetchuser']),
        sortTasks(tasks) {
            return tasks.slice().sort((a,b) => b.createdAt - a.createdAt);
        },
        toggleInput(state) {
            this.showInput[state] = !this.showInput[state];
        },
        addtask(evt, state) {
            evt.preventDefault();
            console.log(this.user)
            if(this.todo == '') {
                alert('Please enter something in the input feild')
                return
            }
            const newTask = {
                todo: this.todo,
                status: state,
                createdBy: this.user.email,
                createdAt: new Date().toLocaleString()
            }
            this.addTask(newTask);
            this.todo = '';
            this.showInput[state] = false;
            console.log(newTask)
        },
        startDrag(evt, task, state) {
            evt.dataTransfer.dropEffect = 'move'
            evt.dataTransfer.effectAllowed = 'move'
            evt.dataTransfer.setData('taskId', task._id)
            evt.dataTransfer.setData('state', state)
        },
        allowDrop(ev) {
            ev.preventDefault();
        },
        onDrop(evt, tostate) {
            const taskId = evt.dataTransfer.getData('taskId')
            const state = String(evt.dataTransfer.getData('state'))
            const foundTask = this.alltasks[state].find(task => task._id == taskId);
            this.alltasks[state] = this.alltasks[state].filter(task => task._id != taskId)
            this.alltasks[tostate].push(foundTask)
            this.updateStatus(foundTask, tostate)
        },
        updateStatus(task, tostate) {
            const updTask = {
                _id: task._id,
                todo: task.todo,
                status: tostate,
                createdBy: task.createdBy,
                createdAt: new Date().toLocaleString()
            };
            this.updateTask(updTask);
        },
        deletetask(taskId) {
            console.log(taskId)
            if(confirm("Are you sure? You want to delete the task."))
                this.deleteTask(taskId)
        }
    },
    computed: mapGetters(['alltasks', 'user']),
    created() {
        this.fetchTasks();
        this.fetchuser(localStorage.getItem("id"))
    }
}
</script>

<style scoped>
.kanban-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);;
    grid-gap: 18px;
}

.kanban-row .col {
    background: #000;
    color: white;
    border-radius: 6px;
    overflow-x: auto;
}

.kanban-row .todo {
    font-weight: bold;
    margin-bottom: 4px;
    font-size: 16px;
}

.kanban-row .col .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    padding: 12px;
}

i:hover {
    cursor: pointer;
}

form {
    justify-content: space-between;
    margin: 10px;
}

label {
    font-size: 14px;
    display: block;
    font-weight: bold;
    margin: 10px 0;
}

form input[type="text"] {
    line-height: 28px;
    font-size: 16px;
    padding: 4px 8px;
    margin-bottom: 16px;
    min-height: 25px;
    width: 100%;
    border: 2px solid slateblue;
    border-radius: 4px;
    outline-color: slateblue;
}

form input[type="submit"] {
    padding: 8px 16px;
    color: #fff;
    background: slateblue;
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
}

.task {
    font-size: 14px;
    min-height: 40px;
    margin: 16px 8px;
    padding: 12px 16px;
    word-wrap: break-word;
    background: #4e52596e;
}

.task:hover {
    background: #4e52592a;
    cursor: pointer;
    transition: background .5s;
}

.user {
    margin: 6px 0;
    font-size: 13px;
    color: #72c6eb;
}

.user i {
    margin-right: 4px;
}

.task-footer {
    color:orange;
    display:flex;
    margin-top: 6px; 
    font-size: 12px
}

.on-hold {
    background: #FB7D44;
}
.in-progress {
    background: #2A92BF;
}
.needs-review {
    background: #e4b920;
}
.approved {
    background: #00B961;
}

@media screen and (max-width: 1120px) {
  .kanban-row {
    display: grid;
    grid-template-columns: repeat(1, 1fr);;
    grid-gap: 18px;
  }
}
</style>