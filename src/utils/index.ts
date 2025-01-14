import { LOREM_WORDS } from '../consts'

export const getRandomLorem = (minLength: number, maxLength: number) => {
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength

  const result: string[] = []

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * LOREM_WORDS.length)
    result.push(LOREM_WORDS[randomIndex])
  }

  return result.join(' ') + '.'
}

export const withRandomDelay = async <T>(
  callback: () => T,
  [minDelay, maxDelay]: [number, number]
) => {
  const randomDelay = Math.floor(
    Math.random() * (maxDelay - minDelay + 1) + minDelay
  )

  await new Promise<void>((resolve) => {
    setTimeout(resolve, randomDelay)
  })

  return callback()
}

export const splitByLastDot = (str: string) => {
  const lastIndex = str.lastIndexOf('.')

  if (lastIndex === -1) return [str, '']

  const before = str.slice(0, lastIndex)
  const after = str.slice(lastIndex + 1)

  return [before, after]
}

export const downloadTextFile = (text: string, fileName: string) => {
  const blob = new Blob([text], { type: 'text/plain' })

  const link = document.createElement('a')

  link.href = URL.createObjectURL(blob)
  link.download = fileName

  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}
