import { CourseAddForm } from '../components'
import { useNavigate } from 'react-router'
import { Stack, Title } from '@mantine/core'
import { courseStorage } from '../data'
import { Course } from '../types'

export const CoursesAdd = () => {
  const navigate = useNavigate()

  const handleFormSubmit = async (course: Omit<Course, 'id' | 'summary'>) => {
    await courseStorage.saveItem({
      id: self.crypto.randomUUID(),
      ...course,
      summary: '',
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
