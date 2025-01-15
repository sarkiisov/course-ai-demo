import { Group, Title, Box, Button, Stack, Text } from '@mantine/core'
import { CourseItem } from '../components'
import { Link, useLoaderData } from 'react-router'
import { IconPlus } from '@tabler/icons-react'
import { Course } from '../types'

export const Courses = () => {
  const courses = useLoaderData() as Course[]

  return (
    <Stack>
      <Group my="md">
        <Title flex="1">Курсы</Title>
        <Box>
          <Button
            leftSection={<IconPlus size="1rem" />}
            component={Link}
            to="/courses/add"
          >
            Добавить курс
          </Button>
        </Box>
      </Group>
      {!courses.length && (
        <Text c="dimmed" ta="center" fz="sm">
          Нет созданных курсов
        </Text>
      )}
      {!!courses.length && (
        <Stack>
          {courses.map(({ id, title }) => (
            <CourseItem key={id} title={title} />
          ))}
        </Stack>
      )}
    </Stack>
  )
}
