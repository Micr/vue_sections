<template>
  <input type="text" class="fraction-operator" :value="value" @change="update"/>
</template>

<script>
export default {
  props: ['index', 'value', 'updateOperator'],
  methods: {
    update(event) {
      this.updateOperator(this.index, event.target.value)
    }
  }
}
</script>

<style lang="css" scoped>
.operatior-container {
  display: flex;
  align-items: center;
}
.fraction-operator {
  border: 2px solid black;
  border-radius: 5px;
  width: 20px;
  text-align: center;
  font-size: 16px;
}
</style>
