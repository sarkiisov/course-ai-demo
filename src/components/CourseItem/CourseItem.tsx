import { Box, Paper, Text } from '@mantine/core'

import classes from './CourseItem.module.css'
import { CourseItemProps } from './types'

export const CourseItem = ({ title, actions }: CourseItemProps) => {
  return (
    <Paper p="md" display="flex" className={classes.root}>
      <Text flex={1}>{title}</Text>
      {Boolean(actions) && <Box style={{ flexShrink: 0 }}>{actions}</Box>}
    </Paper>
  )
}
