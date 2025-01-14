import { Container } from '@mantine/core'
import { Outlet } from 'react-router'

export const CoursesLayout = () => {
  return (
    <Container my="xl" size="sm" style={{ border: '0px solid grey' }}>
      <Outlet />
    </Container>
  )
}
