<template>
  <div class="fraction-result">
    <div v-if="fractionResult.negative">
      <div class="result-sign"></div>
    </div>
    <div v-else-if="fractionResult.num === 0">0</div>
    <div v-else>
      <div>{{ fractionResult.num }}</div>
      <div class="fraction-line"></div>
      <div>{{ fractionResult.den }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['fractionResult'],
}
</script>

<style lang="css" scoped>
.fraction-result {
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 2;
}
.result-sign {
  border-bottom: 2px solid black;
  width: 5px;
  margin-right: 4px;
}
.fraction-line {
  border-bottom: 2px solid black;
}
</style>
