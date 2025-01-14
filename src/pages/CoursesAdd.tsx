import { notifications } from '@mantine/notifications'
import { CourseAddForm } from '../components'
import { Course } from '../types'
import { downloadTextFile, getRandomLorem, withRandomDelay } from '../utils'
import { useNavigate } from 'react-router'
import { courseStorage } from '../data'
import { Stack, Title } from '@mantine/core'

export const CoursesAdd = () => {
  const navigate = useNavigate()

  const handleFormSubmit = async (course: Omit<Course, 'id' | 'summary'>) => {
    notifications.show({
      message: 'Создание итогового файла...',
      color: 'orange',
    })

    const summary = await withRandomDelay(
      () => getRandomLorem(100, 200),
      [5000, 7000]
    )

    await courseStorage.saveItem({
      id: self.crypto.randomUUID(),
      ...course,
      summary,
    })

    downloadTextFile(summary, `summary_${course.title}.txt`)

    notifications.show({
      message: `Скачивание файла для курса "${course.title}"`,
      color: 'green',
    })

    navigate('/courses')
  }

  const handleFormCancel = () => {
    navigate('/courses')
  }

  return (
    <Stack>
      <Title my="md">Создание курса</Title>
      <CourseAddForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
    </Stack>
  )
}
