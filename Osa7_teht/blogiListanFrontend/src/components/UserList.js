import React from 'react'
import { useSelector } from 'react-redux'
// import { Link } from 'react-bootstrap'
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Link
} from '@material-ui/core'
import UserSite from './UserSite'

const UserList = () => {
  const users = useSelector(state => state.users)
  const sortedUsers = users.sort((a, b) => b.blogs.length - a.blogs.length)



  return (
    <div id='userList'>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead align='right'>Blogs created</TableHead>
          <TableBody>
            {sortedUsers.map(user =>
              <TableRow key={user.id}>
                <TableCell>
                  <Link href={`/users/${user.id}`} color='inherit'>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div >
  )
}

export default UserList