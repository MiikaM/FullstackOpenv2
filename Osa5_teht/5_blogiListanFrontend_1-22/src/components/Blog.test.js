import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Canonical string reduction hide',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    author: 'Edsger W.Dijkstra',
    id: '1'
  }

  const component = render(
    <Blog blog={blog} />
  )


  expect(component.container).toHaveTextContent(
    'Canonical string reduction hide'
  )

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Canonical string reduction hide'
  )

  expect(div).not.toHaveTextContent(
    'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
  )

  const div2 = component.container.querySelector('.blog2')
  expect(div2).toHaveTextContent(
    'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
  )

  console.log(prettyDOM(div))
})

test('fire events content', () => {
  const blog = {
    title: 'Canonical string reduction hide',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    author: 'Edsger W.Dijkstra',
    id: '1'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} addLikes={mockHandler}/>
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})