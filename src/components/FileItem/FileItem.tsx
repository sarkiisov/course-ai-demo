import { Badge, Box, Text, Paper, Group, Flex } from '@mantine/core'
import { FileItemProps } from './types'
import { IconFile } from '@tabler/icons-react'
import { useMemo } from 'react'

import { filesize } from 'filesize'
import { splitByLastDot } from '../../utils'

export const FileItem = ({ name, size, actions }: FileItemProps) => {
  const [, extension] = useMemo(() => splitByLastDot(name), [name])

  const formattedSize = filesize(size, { base: 2 }).toString()

  return (
    <Paper p={8}>
      <Group gap={8} wrap="nowrap">
        <Box pos="relative" display="flex">
          <Badge p={4} pos="absolute" size="xs" radius={4} bottom={12} left={4}>
            {extension}
          </Badge>
          <IconFile size="3rem" strokeWidth={0.8} color="lightgray" />
        </Box>
        <Flex flex={1} direction="column" justify="center">
          <Text lineClamp={1}>{name}</Text>
          <Text c="dimmed" size="xs">
            {formattedSize}
          </Text>
        </Flex>
        {Boolean(actions) && <Box style={{ flexShrink: 0 }}>{actions}</Box>}
      </Group>
    </Paper>
  )
}
