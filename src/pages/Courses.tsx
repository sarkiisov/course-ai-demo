import {
  Group,
  Title,
  Box,
  Button,
  Tooltip,
  ActionIcon,
  Stack,
  Text,
} from '@mantine/core'
import { CourseItem } from '../components'
import { Link, useLoaderData } from 'react-router'
import { IconDownload, IconPlus } from '@tabler/icons-react'
import { Course } from '../types'
import { downloadTextFile } from '../utils'

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
          {courses.map(({ id, title, summary }) => (
            <CourseItem
              key={id}
              title={title}
              actions={
                <Group>
                  <Tooltip label="Скачать итоговый файл">
                    <ActionIcon
                      variant="subtle"
                      color="gray"
                      onClick={() =>
                        downloadTextFile(summary, `summary_${title}.txt`)
                      }
                    >
                      <IconDownload style={{ width: '70%', height: '70%' }} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              }
            />
          ))}
        </Stack>
      )}
    </Stack>
  )
}
