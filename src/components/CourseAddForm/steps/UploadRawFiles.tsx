import { ActionIcon, Button, Group, Stack, Tooltip } from '@mantine/core'
import { Dropzone } from '../../Dropzone'
import { FileItem } from '../../FileItem'
import { IconArrowRight, IconTrash } from '@tabler/icons-react'
import { useCourseAddFormContext } from '../context'
import { getRandomLorem, withRandomDelay } from '../../../utils'

export const UploadRawFiles = () => {
  const {
    courseState: [course, setCourse],
    stepState: [, setStep],
  } = useCourseAddFormContext()

  const handleRawFilesUpload = (files: File[]) => {
    setCourse((course) => ({
      ...course,
      rawFiles: [...course.rawFiles, ...files],
    }))
  }

  const removeFile = (index: number) => {
    setCourse((course) => {
      const nextRawFiles = [...course.rawFiles]

      nextRawFiles.splice(index, 1)

      return { ...course, rawFiles: nextRawFiles }
    })
  }

  const handleRawFilesSubmit = () => {
    course.rawFiles.forEach((_, index) => {
      withRandomDelay(() => {
        setCourse((course) => {
          const nextTexts = [...course.texts]

          nextTexts[index] = getRandomLorem(40, 60)

          return { ...course, texts: nextTexts }
        })
      }, [3000, 5000])
    })

    setStep('MODIFY_TEXTS')
  }

  return (
    <Stack gap="lg">
      <Dropzone onDrop={handleRawFilesUpload} />
      <Stack gap="xs">
        {course.rawFiles.map((file, index) => (
          <FileItem
            key={`${file.name}.${file.lastModified}`}
            name={file.name}
            size={file.size}
            actions={
              <Tooltip label="Удалить">
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={() => removeFile(index)}
                >
                  <IconTrash style={{ width: '70%', height: '70%' }} />
                </ActionIcon>
              </Tooltip>
            }
          />
        ))}
      </Stack>
      <Group justify="space-between">
        <Button
          color="gray"
          variant="light"
          onClick={() => setStep('SET_TITLE')}
        >
          Назад
        </Button>
        <Button
          onClick={handleRawFilesSubmit}
          disabled={Boolean(!course.rawFiles.length)}
          rightSection={<IconArrowRight size="1rem" />}
        >
          Извлечь текст
        </Button>
      </Group>
    </Stack>
  )
}
