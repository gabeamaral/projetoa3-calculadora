import { useState } from 'react'
import DisplayWindow from './DisplayWindow'
import KeysWindow from './KeysWindow'

const Calculator = () => {
  const [expression, setExpression] = useState('')
  const [displayEXP, setDisplayEXP] = useState('')
  const [result, setResult] = useState('0')

  const sciFunc = {
    sin: 'Math.sin',
    cos: 'Math.cos',
    tan: 'Math.tan',
    ln: 'Math.log',
    log: 'Math.log10',
    π: 'Math.PI',
    e: 'Math.E',
    '^': '**',
    '√': 'Math.sqrt'
  }

  function calcResult() {
    if (expression.length !== 0) {
      try {
        let compute = eval(expression)
        compute = parseFloat(compute.toFixed(4))
        setResult(compute)
      } catch (error) {
        setResult('An Error Occurred!')
      }
    } else {
      setResult('An Error Occurred!')
    }
  }

  function handleButton(value) {
    if (value === 'AC') {
      setExpression('')
      setDisplayEXP('')
      setResult('0')
    } else if (value === 'DEL') {
      setDisplayEXP(displayEXP.slice(0, -1))
      setExpression(expression.slice(0, -1))
    } else if (Object.prototype.hasOwnProperty.call(sciFunc, value)) {
      setDisplayEXP(displayEXP + value)
      setExpression(expression + sciFunc[value])
    } else if (value === '!') {
      const lastNum = extractLastNum(expression)
      if (lastNum != null) {
        const num = parseFloat(lastNum)
        setDisplayEXP(displayEXP + value)
        setExpression(expression.replace(lastNum, factorial(num)))
      }
    } else if (value === '∫') {
      const func = prompt(
        'Enter the function to integrate (in terms of x):',
        'x**2 - 3*x'
      )
      const limits = prompt(
        'Enter the limits a and b, separated by a comma:',
        '1,4'
      ).split(',')
      const a = parseFloat(limits[0])
      const b = parseFloat(limits[1])
      const integralResult = integrate(func, a, b)
      setResult(integralResult)
      setDisplayEXP(`∫(${func})[${a},${b}]`)
      setExpression('')
    } else if (value === '=') {
      calcResult()
    } else {
      setExpression(expression + value)
      setDisplayEXP(displayEXP + value)
    }
  }

  function factorial(n) {
    let result = 1
    for (let i = 1; i <= n; i++) result *= i
    return result
  }

  function extractLastNum(exp) {
    const numbers = exp.match(/\d+/g)
    return numbers ? numbers[numbers.length - 1] : null
  }

  function integrate(func, a, b, n = 1000) {
    const f = new Function('x', `return ${func}`)
    const h = (b - a) / n
    let sum = (f(a) + f(b)) / 2
    for (let i = 1; i < n; i++) {
      sum += f(a + i * h)
    }
    return sum * h
  }

  return (
    <div className="calculator">
      <DisplayWindow expression={displayEXP} result={result} />
      <KeysWindow handleButton={handleButton} />
    </div>
  )
}

export default Calculator
