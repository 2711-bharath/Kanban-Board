<template>
    <ul class="navbar">
        <div class="nav-brand">
            Kanban Board
        </div>

        <div class="nav-links">
            <router-link to="/" class="router-link" active-class = "active">Home</router-link> 
            <router-link to="/view-board" class="router-link" active-class="active">View Board</router-link>
            <router-link to="/login" class="router-link" active-class = "active" v-if="!isLoggedIn">Login</router-link>
            <router-link to="/register" class="router-link" active-class = "active" v-if="!isLoggedIn">Register</router-link>
            <router-link to="/" class="router-link" @click="removeuser()" v-if="isLoggedIn">Logout</router-link>
        </div>
    </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Navbar',
    methods: {
        ...mapActions(['removeuser'])
    },
    computed: mapGetters(['isLoggedIn']),
}
</script>

<style scoped>
.navbar {
    position: sticky;
    top: 0;
    padding: 14px 18px;
    background: #fff;
    display: flex;
    min-height: 64px;
    justify-content: space-between;
    align-items: center;
    gap: 18px;
    list-style-type: none;
}

.nav-brand {
    font-size: 24px;
    font-weight: bold;
}

.nav-links {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 18px;
    word-wrap: break-word;
}

.router-link {
    background: #fff;
    color: #000;
    text-decoration: none;
    padding: 5px 18px;
    border: 1px solid #000;
    border-radius: 6px;
    word-wrap: break-word;
}

.router-link:hover {
    background: #000;
    color: #fff;
    padding: 6px 18px;
    transition: border ease .5s;
}

.active {
    background: #000;
    color: #fff;
    padding: 6px 18px;
}


@media screen and (max-width: 720px) {
  .nav-links {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
  }

  /* .router-link {
      display: block;
      margin: 8px 0;
      width: 100%;
  } */
}
</style>