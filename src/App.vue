<template>
  <Navbar />
  <div class="container my-5 py-3">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
export default {
  name: 'App',
  components: {
    Navbar
  },
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
  background: #4E5259;
}

.container {
  background: #A0F6AA;
  border-radius: 10px;
  width: 100%;
  height: 100%;
}
</style>
