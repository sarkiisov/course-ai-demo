import { Group, Text } from '@mantine/core'
import { IconUpload, IconX } from '@tabler/icons-react'
import { Dropzone as MantineDropzone, DropzoneProps } from '@mantine/dropzone'

export const Dropzone = (props: DropzoneProps) => {
  return (
    <MantineDropzone {...props}>
      <Group
        justify="center"
        gap="xl"
        mih={220}
        style={{ pointerEvents: 'none' }}
      >
        <MantineDropzone.Accept>
          <IconUpload
            size={52}
            color="var(--mantine-color-blue-6)"
            stroke={1.5}
          />
        </MantineDropzone.Accept>
        <MantineDropzone.Reject>
          <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
        </MantineDropzone.Reject>
        <MantineDropzone.Idle>
          <IconUpload
            size={52}
            color="var(--mantine-color-dimmed)"
            stroke={1.5}
          />
        </MantineDropzone.Idle>

        <div>
          <Text size="sm" c="dimmed" inline mt={7}>
            Прикрепите один или несколько файлов
          </Text>
        </div>
      </Group>
    </MantineDropzone>
  )
}
