import { Button, Group, Stack, TextInput } from '@mantine/core'
import { IconArrowRight } from '@tabler/icons-react'
import { FormEvent, useState } from 'react'
import { useCourseAddFormContext } from '../context'

export const SetTitle = () => {
  const {
    courseState: [course, setCourse],
    stepState: [, setStep],
    onCancel,
  } = useCourseAddFormContext()

  const [error, setError] = useState<string | null>(null)

  const handleTitleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { value: title } = (
      event.target as EventTarget & { title: HTMLInputElement }
    ).title

    if (!title) setError('Заполните название курса')

    setCourse({ ...course, title })
    setStep('UPLOAD_RAW_FILES')
  }

  return (
    <form onSubmit={handleTitleSubmit}>
      <Stack gap="xl">
        <TextInput
          defaultValue={course.title}
          required
          name="title"
          label="Название курса"
          error={error}
        />
        <Group justify="space-between">
          <Button color="gray" variant="light" onClick={onCancel}>
            Назад
          </Button>
          <Button type="submit" rightSection={<IconArrowRight size="1rem" />}>
            Загрузить файлы
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
