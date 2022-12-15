interface WrongDataError {
  data: {
    errors: {
      [key: string]: string
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isWrongDataError(obj: any): obj is WrongDataError {
  if (typeof obj !== 'object' || obj === null) return false
  if (!('data' in obj)) return false

  return typeof obj.data.errors === 'object' && obj.data.errors !== 0
}

export function generateId() {
  return Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
}

export function correctTag(text: string) {
  let finalText = ''
  const textArr = text.split(' ')
  if (textArr.length > 1) {
    textArr.length = 1
    finalText = textArr.join('')
  } else if (textArr.length === 1) {
    const item = textArr[0].split('')
    item.length = 10
    finalText = item.join('')
    finalText += '...'
  }

  return finalText
}

export function correctText(text: string, maxLength: number) {
  let finalText = ''
  const textArr = text.split(' ')
  if (textArr.length > maxLength) {
    textArr.length = maxLength
    finalText = textArr.join(' ')
    finalText += '...'
  } else if (textArr.length === 1) {
    const item = textArr[0].split('')
    item.length = 50
    finalText = item.join('')
    finalText += '...'
  } else {
    finalText = textArr.join(' ')
  }
  return finalText
}
