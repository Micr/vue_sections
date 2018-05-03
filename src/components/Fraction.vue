<template>
  <div class="fraction">
    <input type="text" class="fraction-input" :value="item.value.num" @change="updateNum"/>
    <div class="fraction-line"></div>
    <input type="text" class="fraction-input" :value="item.value.den" @change="updateDen" />
  </div>
</template>

<script>
export default {
  props: ['index', 'item', 'updateFraction'],
  methods: {
    updateNum(event) {
      this.updateFraction(this.index, 'num', event.target.value)
    },
    updateDen(event) {
      this.updateFraction(this.index, 'den', event.target.value)
    }
  }
}
</script>

<style lang="css" scoped>
.fraction {
  display: flex;
  flex-direction: column;
}
.fraction-input {
  border: 2px solid black;
  border-radius: 5px;
  width: 20px;
  text-align: center;
  font-size: 16px;
}
.fraction-line {
  border-bottom: 2px solid black;
  margin: 1px 0;
}
</style>
