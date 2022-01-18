<template>
    <h1 class="text-center">Create your Account</h1>
    <div class="row">
        <div class="col-xl-3 col-md-2"></div>
        <form class="form col-xl-6 col-md-8 col-sm-12" @submit="register($event)">
            <label for="name">Name <span class="required">*</span></label>
            <input type="text" id="name" v-model="name">
            <label for="email">Email <span class="required">*</span></label>
            <input type="email" id="email" v-model="email">
            <label for="password">Password <span class="required">*</span></label>
            <input type="password" v-model="password">
            <div class="err-msg" v-show="showError">Enter Valid Credentials</div>
            <input type="submit" value="Register">
        </form>
        <div class="col-xl-3 col-md-2"></div>
    </div>
    <div class="text-center">Already if account present? <a href="/login">Login</a></div>
</template>

<script>
import { mapActions } from 'vuex';
import bcrypt from 'bcryptjs';

export default {
    name: 'Register',
    data() {
        return {
            name: "",
            email: "",
            password: "",
            showError: false
        }
    },
    methods: {
        ...mapActions(['adduser']),
        register(evt) {
            evt.preventDefault();
            if(this.name === "" || this.email === "" || this.password === "") {
                this.showError = true;
            } else {
                const newUser = {
                    "name": this.name,
                    "email": this.email,
                    "password": bcrypt.hashSync(this.password)
                }
                this.adduser(newUser).then(() => {
                    this.$router.push('/view-board')    
                    this.name = ""
                    this.password = ""
                    this.email = ""
                })
            }
        },

    },
}
</script>

<style scoped>
.text-center {
    text-align: center;
}

.form {
    min-width: 500px;
    min-height: 300px;
    background: #fff;
    margin: 10px;
    padding: 30px 15px;
    border-radius: 12px;
}

.form label, input {
    display: block;
    font-size: 16px;
    width: 100%;
    margin-bottom: 8px;
}

.required {
    color: red;
}

.err-msg {
    color: red;
    text-align: center;
}

input {
    margin-bottom: 16px;
    padding: 6px;
}

input[type="submit"] {
    background: #000;
    color: #fff;
    margin-top: 18px;
}

input[type="submit"]:hover {
    cursor: pointer;
}

</style>