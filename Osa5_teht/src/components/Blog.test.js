import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import BlogList from './BlogList'

test('renders content', () => {
  const blog = [{
    title: 'Canonical string reduction hide',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    author: 'Edsger W.Dijkstra',
    id: '1'
  }]

  const component = render(
    <BlogList blogs={blog} />
  )

  // tapa 1
  expect(component.container).toHaveTextContent(
    'Canonical string reduction hide'
  )

  // tapa 2
  // const element = component.getByText(
  //   'Canonical string reduction hide'
  // )
  // expect(element).toBeDefined()

  // tapa 3
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Canonical string reduction hide'
  )

  console.log(prettyDOM(div))
})