import { createSafeContext } from '@mantine/core'
import { CourseAddFormContext } from './types'

export const [CourseAddFormContextProvider, useCourseAddFormContext] =
  createSafeContext<CourseAddFormContext>(
    'CourseAddForm was not found in the tree'
  )
