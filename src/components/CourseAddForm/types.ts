import { Dispatch, SetStateAction } from 'react'
import { Course } from '../../types'

type State<T> = [T, Dispatch<SetStateAction<T>>]

export const courseAddFormSteps = [
  'SET_TITLE',
  'UPLOAD_RAW_FILES',
  'MODIFY_TEXTS',
] as const

export type CourseAddFormStep = (typeof courseAddFormSteps)[number]

export type CourseAddFormData = Omit<Course, 'id' | 'summary'>

export type CourseAddFormContext<T = CourseAddFormData> = {
  stepState: State<CourseAddFormStep>
  courseState: State<T>
  onSubmit: (course: T) => Promise<void> | void
  onCancel: VoidFunction
}

export type CourseAddFormProps<T = CourseAddFormData> = {
  onSubmit: (course: T) => Promise<void> | void
  onCancel: VoidFunction
}
