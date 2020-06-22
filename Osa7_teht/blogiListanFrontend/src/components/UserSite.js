import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper
} from '@material-ui/core'

const UserSite = () => {
  const users = useSelector(state => state.users)
  const match = useRouteMatch('/users/:id')
  console.log('UserSite: userit ovat', users)
  console.log('Matchh on', match)
  console.log('Matchh id on', match.params.id)
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  if (!user) {
    return null
  }

  console.log('User on', user)

  return (
    <div>
      <h2>{user.name}</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>Added Blogs</TableHead>
          <TableBody>
            {
              user.blogs.map(blog =>
                <TableRow key={blog.id}>
                  <TableCell>{blog.title}</TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserSite