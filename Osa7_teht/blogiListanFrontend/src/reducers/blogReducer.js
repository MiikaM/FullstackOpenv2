import blogService from '../services/blogs'

export const createBlog = (blog) => {
  console.log('Blog o')
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteObject(id)
    dispatch({
      type: 'DELETE',
      data: {
        id
      }
    })
  }
}

export const vote = (id, blog) => {

  const copy = {
    title: blog.title,
    author: blog.author,
    likes: blog.likes + 1
  }

  return async dispatch => {
    const updateObject = await blogService.update(id, copy)
    dispatch({
      type: 'VOTE',
      data: updateObject
    })

  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log('Blogit ovat', blogs)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: blogs
    })
  }
}

const reducer = (state = [], action) => {
  let id = null
  switch (action.type) {
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'VOTE':
    id = action.data.id
    return state.map(blog =>
      blog.id !== id ? blog : action.data
    )
  case 'DELETE':
    return state.filter(blog => blog.id !== action.data.id)
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return state
  }


}

export default reducer