import {
  ActionIcon,
  Box,
  Button,
  FileButton,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Stack,
  Tooltip,
  Transition,
} from '@mantine/core'
import { useCourseAddFormContext } from '../context'
import { FileItem } from '../../FileItem'
import { IconDownload, IconFilePencil } from '@tabler/icons-react'
import { useMemo, useState } from 'react'
import { fileResponses } from '../../../consts'
import { downloadBlob, splitByLastDot } from '../../../utils'

export const ModifyTexts = () => {
  const {
    courseState: [course, setCourse],
    onSubmit,
  } = useCourseAddFormContext()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [fileVersions, setFileVersions] = useState<number[]>(
    new Array(course.rawFiles.length).fill(1)
  )

  const handleUploadTextFile = async (file: File | null, index: number) => {
    if (!file) return

    const currentFileName = course.rawFiles[index].name

    let nextText = course.texts[index]

    if (fileResponses[currentFileName][1]) {
      nextText = fileResponses[currentFileName][1]
    }

    setFileVersions((versions) => {
      const nextVersions = [...versions]

      nextVersions[index] = nextVersions[index] + 1

      return nextVersions
    })

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

  const handleFileDownload = async (index: number) => {
    const fileName = splitByLastDot(course.rawFiles[index].name)[0]

    const response = await fetch(
      `/files/${fileName}_${fileVersions[index]}.docx`
    )

    const blob = await response.blob()

    downloadBlob(blob, `text_${fileName}_${fileVersions[index]}.docx`)
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
                      <ScrollArea h={200}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: course.texts[index],
                          }}
                        />
                      </ScrollArea>
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
                            onClick={() => handleFileDownload(index)}
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
