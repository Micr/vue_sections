<template>
  <ul class="units-container">
    <li v-for="(item, index) in units" :key="index" class="unit-container">
      <fraction
        v-if="item.type === 1"
        :index="index"
        :item="item"
        :updateFraction="updateFraction"
      />
      <operator
        v-else
        :index="index"
        :value="item.value"
        :updateOperator="updateOperator"
      />
    </li>
  </ul>
</template>

<script>
import Fraction from './Fraction.vue'
import Operator from './Operator.vue'

export default {
  props: ['units', 'updateFraction', 'updateOperator'],
  components: {
    Fraction,
    Operator
  }
}
</script>

<style lang="css" scoped>
  .units-container {
    display: flex;
    justify-content: center;
    margin: 0;
  }
  .unit-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 10px;
  }
</style>
