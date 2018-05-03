<template>
  <div class="container">
    <div
      v-if="fractionResult.invalid"
      class="invalid"
    >
      Please put valid inputs into every cell to get a result!
    </div>
    <div class="fractions">
      <units-container
        :units="units"
        :updateFraction="updateFraction"
        :updateOperator="updateOperator"
      />
      <div v-if="!fractionResult.invalid" class="equal">=</div>
      <fraction-result :fractionResult="fractionResult" />
    </div>
    <div class="add-button" @click="addFraction">Add Fraction</div>
  </div>
</template>

<script>
// Сторонние библиотеки не использованы
// const types = {
//   1: 'Operand',
//   2: 'Operator'
// };
import initialUnits from '../initialUnits'
import FractionResult from './FractionResult.vue'
import UnitsContainer from './UnitsContainer.vue'
import { priorityObj, checkInputs, calculate, calculateResult } from '../utils'

export default {
  name: 'Fractions',
  data: function () {
    // Units - массив, где каждый элемент либо дробь либо оператор
    // массив выбран для удобной итерации.
    // Каждый элемент это объект, который содержит тип(type) (дробь или оператор)
    // и значение (value) это позволяет хранит всю информацию об элементе в одном месте
    return ({
      units: initialUnits
    });
  },
  components: {
    FractionResult,
    UnitsContainer
  },
  methods: {
    // Обновляем дробь в ответ на действия пользователя
    updateFraction: function (index, type, val) {
      const item = this.units[index];
      this.$set(this.units, index, {
        ...item,
        value: {
          ...item.value,
          [type]: val
        }
      })
    },
    // Обновляем оператор в ответ на действия пользователя
    updateOperator: function (index, value) {
      const item = this.units[index];
      this.$set(this.units, index, {
        ...item,
        value
      })
    },
    // добавляем оператор и операнд в ответ на действие пользователя
    addFraction: function () {
      this.units.push({
        type: 2,
        value: ''
      })
      this.units.push({
        type: 1,
        value: {
          num: '',
          den: ''
        }
      })
    }
  },
  computed: {
    // Подсчитываем результат
    // Алгоритм построен на прохождении массива элементов выражения с наполнением
    // промежуточного массива для каждого приоритета операторов
    // на последнем приоритете подсчитывается результат
    // это позволяет получить результат в короткое время
    fractionResult() {
      // Проверка инпутов на валидность
      if (!checkInputs(this.units)) {
        return {
          invalid: true
        }
      }
      // Массив для хранения промежуточного результата перед изменением
      // обрабатываемого приоритета операции
      let units
      // Результат выражения
      let result
      // Массив приоритетов операций при желании может быть расширен
      const priorities = [1, 2]

      // Проходим по приоритетам
      priorities.forEach((priority, priorityIdx) => {
        // Сохраняем промежуточный результат в константе для освобождения переменной
        // для хранения временного результата на данном приоритете
        const prevUnits = units || this.units
        units = [];
        // Мы на самом низком приоритете - подсчитываем результат
        if (priorityIdx === priorities.length - 1) {
          result = calculateResult(prevUnits)
        } else {
          // Индекс правого операнда использованный в последней операции с более высоким приоритетом
          let opIdx
          // Проходим по промежуточному результату для составления промежуточного
          // результата данного приоритета
          prevUnits.forEach((unit, idx) => {
            // Проверяем если это операнд
            if (unit.type === 1) {
              // Мы на последнем операнде
              if (idx === prevUnits.length - 1) {
                // Если этот операнд не был задействован в операции, добавляем его
                // в промежуточный результат
                if (opIdx !== idx) {
                  units.push(unit)
                }
              }
              // Пропускаем непоследние операнды
              return;
            }
            // Если приоритет оператора ниже текущего
            if (priorityObj[unit.value] > priority) {
              // Если предыдущая операция использовала левый операнд
              if (opIdx === idx - 1) {
                // Добавляем оператор в промежут. результат
                units.push(unit)
              // Если предыдущая операция не использовала левый операнд
              } else {
                // Добавляем как операнд так и оператор
                units.push(this.units[idx - 1])
                units.push(unit)
              }
            // если приоритет равен текущему
            } else {
              // Если предыдущая операция использовала левый операнд
              if (opIdx === idx - 1) {
                const last = units.length - 1;
                // заменяем в промежуточном результате новым значением
                units[last] = {
                  type: 1,
                  value: calculate(units[last].value, unit.value, this.units[idx + 1].value)
                }
              } else {
                units.push({
                  type: 1,
                  value: calculate(this.units[idx - 1].value, unit.value, this.units[idx + 1].value)
                })
              }
              // Сохраняем позицию правого операнда в последней операции
              opIdx = idx + 1
            }
          })

        }
      });
      return result;
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
.add-button {
  text-decoration: underline;
  cursor: pointer;
}
.invalid {
  color: red;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.fractions {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.equal {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.fraction-line {
  border-bottom: 2px solid black;
}
</style>
