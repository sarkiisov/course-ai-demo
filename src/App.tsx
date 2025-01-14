import { createBrowserRouter, redirect, RouterProvider } from 'react-router'
import { createTheme, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dropzone/styles.css'

import { Courses, CoursesAdd } from './pages'
import { CoursesLayout } from './layouts'
import { courseStorage } from './data'

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'purple',
  primaryShade: 6,
  colors: {
    purple: [
      '#EDF2FF',
      '#DBE4FF',
      '#BAC8FF',
      '#A7B0DE',
      '#8592DE',
      '#5E72E4',
      '#5265D0',
      '#4A5BBB',
      '#4B57A0',
      '#4B5488',
    ],
  },
  components: {
    Button: {
      styles: {
        root: {
          minHeight: '40px',
        },
      },
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/courses'),
  },
  {
    element: <CoursesLayout />,
    children: [
      {
        path: '/courses',
        element: <Courses />,
        loader: async () => await courseStorage.getItems(),
      },
      {
        path: '/courses/add',
        element: <CoursesAdd />,
      },
    ],
  },
])

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default App
