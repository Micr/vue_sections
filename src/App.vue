<template>
  <div id="app">
    <router-link to="/fractions" class="router-link">Fractions</router-link>
    <router-link to="/comments" class="router-link">Comments</router-link>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.router-link {
  padding: 10px;
}
</style>
