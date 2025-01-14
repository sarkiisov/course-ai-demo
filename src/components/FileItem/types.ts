export type FileItemProps = Pick<File, 'name' | 'size'> & {
  actions?: React.ReactNode
}
