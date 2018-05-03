// Используем объект для быстрого доступа к приоритету операции
export const priorityObj = {
  '*': 1,
  '/': 1,
  '+': 2,
  '-': 2
};

// Валидация инпутов
export const checkInputs = units => !units.some(unit => {
  if (unit.type === 1) {
    return !validateOperand(unit)
  }
  return !validateOperator(unit)
})

// Оператор не должен быть пустой и иметь заданное значение
export const validateOperator = unit =>
  unit.value !== '' && '*/+-'.includes(unit.value)
// Числитель и знаменатель должны быть целыми числами, знаменатель не должн быть равен нулю
export const validateOperand = unit => {
  const den = parseFloat(unit.value.den)
  const num = parseFloat(unit.value.num)
  if (isNaN(unit.value.num) || isNaN(unit.value.den)) return false
  return den !== 0 && Number.isInteger(num) && Number.isInteger(den)
}
// op1, op2 = {
//   num: number,
//   dec: number
// }
// opr: string
// Проверяем через switch для быстрого доступа к операциям
export const calculate = (op1, opr, op2) => {
  switch(opr) {
    case '+':
      return add(op1, op2)
    case '-':
      return subtract(op1, op2)
    case '*':
      return multiply(op1, op2)
    case '/':
      return divide(op1, op2)
  }
}
// units: arrayOf(
// {
//   type: 1,
//   value: {
//     num: number | string,
//     dec: number | string,
//   }
// } | {
//  type: 2,
//  value: string
// }

// результат в виде обьекта для прямого доступа при рендеринге
export const calculateResult = units => {
  // Используем reduce для преобразования массива элементов левой стороны выражения
  // в объект результата
  const fraction = units.reduce((memo, next, index) => {
    if (next.type === 1) {
      return memo
    }
    return calculate(memo, next.value, units[index + 1].value)
  }, {
    num: units[0].value.num,
    den: units[0].value.den
  })
  // Проверяем знак числителя и знаменателя для вывода знака результата
  if (
    (fraction.num < 0 && fraction.den > 0) ||
    (fraction.den < 0 && fraction.num > 0)
  ) {
    fraction.negative = true
  }
  // Получаем НОД
  const gcd = getGCD(fraction.num, fraction.den);
  // Сокращаем дробь
  return {
    ...fraction,
    num: Math.abs(fraction.num / gcd),
    den: Math.abs(fraction.den / gcd)
  };
}
export const multiply = (op1, op2) => ({
  num: op1.num * op2.num,
  den: op1.den * op2.den
})
export const divide = (op1, op2) => ({
  num: op1.num * op2.den,
  den: op1.den * op2.num
})
export const add = (op1, op2) => {
  if (op1.den === op2.den) {
    return {
      num: Number(op1.num) + Number(op2.num),
      den: op1.den
    }
  } else {
    return {
      num: op1.num * op2.den + op2.num * op1.den,
      den: op1.den * op2.den
    }
  }
}
export const subtract = (op1, op2) => {
  if (op1.den === op2.den) {
    return {
      num: op1.num - op2.num,
      den: op1.den
    }
  } else {
    return {
      num: op1.num * op2.den - op2.num * op1.den,
      den: op1.den * op2.den
    }
  }
}
export const getGCD = (a, b) => {
  if (b) {
    return getGCD(b, a % b)
  } else {
    return Math.abs(a)
  }
}
