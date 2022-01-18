<template>
    <h1 class="text-center my-3">Login to your Account</h1>
    <div class="row">
        <div class="col-xl-3 col-md-2"></div>
        <form class="form col-xl-6 col-md-8 col-sm-12" @submit="loginCall($event)">
            <label for="email">Email <span class="required">*</span></label>
            <input type="email" id="email" v-model="email">
            <label for="password">Password <span class="required">*</span></label>
            <input type="password" v-model="password">
            <div class="err-msg" v-show="showError">Enter Valid Credentials</div>
            <input type="submit" value="Login">
        </form>
        <div class="col-xl-3 col-md-2"></div>
    </div>
    <div class="text-center mt-2">Create account if account not present? <a href="/register">Register</a></div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Login',
    data() {
        return {
            email: "",
            password: "",
            showError: false
        }
    },
    methods: {
        ...mapActions(['fetchusers', 'login', 'setuser']),
        loginCall(evt) {
            evt.preventDefault();
            if(this.email === "" || this.password === "") {
                this.showError = true;
            } else {
                this.login({"email":this.email, "password": this.password}).then(user => {
                    if(user === null || user === undefined) {
                        this.showError = true
                    } else {
                        this.setuser(user._id)
                        this.email = ""
                        this.password = ""
                        this.$router.push('view-board')
                    }
                })
            }
        }
    },
    created() {
        this.fetchusers();
    }
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
    padding: 30px 15px;
    border-radius: 12px;
}

.required {
    color: red;
}

.err-msg {
    color: red;
    text-align: center;
}

.form label, input {
    display: block;
    font-size: 16px;
    width: 100%;
    margin-bottom: 8px;
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