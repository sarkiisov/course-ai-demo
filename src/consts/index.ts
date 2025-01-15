import text11 from './text11.html?raw'
import text21 from './text21.html?raw'
import text31 from './text31.html?raw'
import text41 from './text41.html?raw'
import text42 from './text42.html?raw'

export const fileResponses = {
  'Безопасное_производство_работ_при_подготовке_забоя.pdf': [text11],
  'Вводный_инструктаж.pptx': [text21],
  'Как_ставить_достижимые_цели.docx': [text31],
  'Как_учиться_.mp4': [text41, text42],
} as Record<string, string[]>

export const LOREM_WORDS = [
  'lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
  'sed',
  'do',
  'eiusmod',
  'tempor',
  'incididunt',
  'ut',
  'labore',
  'et',
  'dolore',
  'magna',
  'aliqua',
  'ut',
  'enim',
  'ad',
  'minim',
  'veniam',
  'quis',
  'nostrud',
  'exercitation',
  'ullamco',
  'laboris',
  'nisi',
  'ut',
  'aliquip',
  'ex',
  'ea',
  'commodo',
  'consequat',
] as const
