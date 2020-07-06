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
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Added Blogs
              </TableCell>
            </TableRow>
          </TableHead>
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