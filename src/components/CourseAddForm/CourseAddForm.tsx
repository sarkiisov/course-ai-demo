import { useState } from 'react'
import { CourseAddFormContextProvider } from './context'
import {
  CourseAddFormData,
  CourseAddFormProps,
  CourseAddFormStep,
} from './types'
import { SetTitle, UploadRawFiles, ModifyTexts } from './steps'

export const CourseAddForm = ({ onSubmit, onCancel }: CourseAddFormProps) => {
  const stepState = useState<CourseAddFormStep>('SET_TITLE')

  const [step] = stepState

  const courseState = useState<CourseAddFormData>({
    title: '',
    rawFiles: [],
    texts: [],
  })

  return (
    <CourseAddFormContextProvider
      value={{ stepState, courseState, onSubmit, onCancel }}
    >
      {
        {
          SET_TITLE: <SetTitle />,
          UPLOAD_RAW_FILES: <UploadRawFiles />,
          MODIFY_TEXTS: <ModifyTexts />,
        }[step]
      }
    </CourseAddFormContextProvider>
  )
}
