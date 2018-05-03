<template>
  <li >
    <span>{{ comment.text }}</span>
    <button @click="removeComment">Удалить</button>
  </li>
</template>

<script>

export default {
  name: 'Comment',
  props: ['comment', 'deleteComment'],
  methods: {
    removeComment() {
      this.deleteComment(this.comment.id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
