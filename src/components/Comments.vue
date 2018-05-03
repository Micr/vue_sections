<template>
  <div class="hello">
    <ul>
      <comment
        v-for="comment in comments"
        :deleteComment="deleteComment"
        :key="comment.id"
        :comment="comment"
      />
    </ul>
  </div>
</template>

<script>
// Сторонние библиотеки не использованы
import comments from '../comments'
import Comment from './Comment'

const TIMEOUT = '30000';

export default {
  name: 'Comments',
  data: function () {
    window.WebSocket = window.WebSocket || window.MozWebSocket
    const client = new window.WebSocket('ws://echo.websocket.org/')
    let handleMessage = res => {
      this.updateAfterDelete(parseInt(res.data))
    }
    handleMessage = handleMessage.bind(this)
    client.onmessage = handleMessage;
    return {
      client,
      comments,
      requests: {},
      timeouts: {}
    }
  },
  methods: {
    deleteComment(id) {
      this.sendNumber(id)
    },
    updateAfterDelete(id) {
      let idx;
      this.comments.find((com, i) => {
        if (id === com.id) {
          idx = i
          return true
        }
        return false
      })
      this.comments.splice(idx, 1)
    },
    sendNumber(n) {
      if (this.client.readyState === this.client.OPEN) {
        this.client.send(n);
        setTimeout(function () {
          console.log(`Unable to delete comment ${n}`)
        }, TIMEOUT)
      }
    }
  },
  components: {
    Comment,
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
