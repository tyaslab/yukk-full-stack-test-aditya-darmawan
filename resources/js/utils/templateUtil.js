export function thousandSep(number) {
    const numberString = number.toString()
    const maxLength = numberString.length
    let result = []
  
    for (let i = 1; i <= maxLength; i++) {
      result.unshift(numberString[maxLength - i])
      if (i % 3 == 0 && i < maxLength) {
        result.unshift('.')
      }
    }
  
    return result.join('')
  }