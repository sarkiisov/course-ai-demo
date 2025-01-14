import {
  ActionIcon,
  Box,
  Button,
  FileButton,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Tooltip,
  Transition,
} from '@mantine/core'
import { useCourseAddFormContext } from '../context'
import { FileItem } from '../../FileItem'
import { IconDownload, IconFilePencil } from '@tabler/icons-react'
import { downloadTextFile, splitByLastDot } from '../../../utils'
import { useMemo, useState } from 'react'

export const ModifyTexts = () => {
  const {
    courseState: [course, setCourse],
    onSubmit,
  } = useCourseAddFormContext()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleUploadTextFile = async (file: File | null, index: number) => {
    if (!file) return

    const nextText = await file.text()

    setCourse((course) => {
      const nextTexts = [...course.texts]

      nextTexts[index] = nextText

      return { ...course, texts: nextTexts }
    })
  }

  const handleFormSubmit = async () => {
    setIsSubmitting(true)

    await onSubmit(course)

    setIsSubmitting(false)
  }

  const submitDisabled = useMemo(() => {
    return course.texts.filter(Boolean).length !== course.rawFiles.length
  }, [course])

  return (
    <>
      <Stack>
        {course.rawFiles.map((file, index) => (
          <Box
            pos="relative"
            key={`${file.name}.${file.lastModified}.${course.texts[index]}`}
          >
            <FileItem name={file.name} size={file.size} />
            <Box>
              {!course.texts[index] && <Loader type="dots" size="sm" />}
              <Transition mounted={!!course.texts[index]}>
                {(transitionStyle) => (
                  <>
                    <Box
                      pos="relative"
                      style={{
                        ...transitionStyle,
                        zIndex: 1,
                      }}
                    >
                      <Text lineClamp={2}>{course.texts[index]}</Text>
                    </Box>
                    <Paper
                      display="flex"
                      radius="md"
                      bg="gray.1"
                      w="fit-content"
                      p={4}
                      mt="xs"
                    >
                      <Group gap={8}>
                        <FileButton
                          accept="text/plain"
                          onChange={(file) => handleUploadTextFile(file, index)}
                        >
                          {(props) => (
                            <Tooltip label="Заменить текст">
                              <ActionIcon {...props} variant="subtle">
                                <IconFilePencil
                                  style={{ width: '70%', height: '70%' }}
                                />
                              </ActionIcon>
                            </Tooltip>
                          )}
                        </FileButton>
                        <Tooltip label="Скачать текст">
                          <ActionIcon
                            variant="subtle"
                            onClick={() =>
                              downloadTextFile(
                                course.texts[index],
                                `text_${splitByLastDot(file.name)[0]}`
                              )
                            }
                          >
                            <IconDownload
                              style={{ width: '70%', height: '70%' }}
                            />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Paper>
                  </>
                )}
              </Transition>
            </Box>
          </Box>
        ))}
      </Stack>
      <Group justify="right">
        <Button
          disabled={submitDisabled}
          fullWidth
          loading={isSubmitting}
          onClick={handleFormSubmit}
        >
          Создать курс
        </Button>
      </Group>
    </>
  )
}
