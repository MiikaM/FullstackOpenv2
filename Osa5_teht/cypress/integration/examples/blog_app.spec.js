const { default: blogs } = require("../../../src/services/blogs")

describe('Blog ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Miika Mikkonen',
      username: 'miikam',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    const userWrong = {
      name: 'Wrong User',
      username: 'wrong',
      password: 'eisalainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', userWrong)

    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('BlogApp')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
  })

  describe('Login', function () {
    it('login fails with wrong password', function () {
      cy.contains('login').click()
      cy.get('#username').type('miikam')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Miika Mikkonen logged in')
    })

    it('user can login with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('miikam')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('You have logged in as Miika Mikkonen')
    })

  })


  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'miikam', password: 'salainen' })
    })

    it('a new blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog title created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('test.cypress')
      cy.contains('save').click()
      cy.contains('New Blog: a blog title created by cypress by Cypress has been added')
    })

    describe('Blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'A blog created by cypress',
          author: 'Cypress',
          url: 'test.cypress.com'
        })
      })

      it('it can be viewed', function () {
        cy.contains('A blog created by cypress').find('button').as('firstViewButton')
        cy.get('@firstViewButton').click()

        cy.contains('url: test.cypress')
        cy.contains('likes: 0')
        cy.contains('Author: Cypress').find('button')
          .should('contain', 'hide')
      })

      it('You can like a blog', function () {
        cy.contains('A blog created by cypress').find('button').as('firstViewButton')
        cy.get('@firstViewButton').click()

        cy.get('.blog2').find('button').contains('like').as('likeButton')
        cy.get('@likeButton').click()
        cy.contains('You liked the blog `A blog created by cypress`')
        cy.contains('likes: 1')
      })

      describe('Deleting a blog', function () {
        beforeEach(function () {
          cy.contains('Miika Mikkonen logged in').find('button').as('logOutButton')
          cy.get('@logOutButton').click()
          cy.visit('http://localhost:3000')
        })

        it('a blog can be deleted with correct credentials', function () {
          cy.login({ username: 'miikam', password: 'salainen' })

          cy.contains('A blog created by cypress').find('button').as('firstViewButton')
          cy.get('@firstViewButton').click()

          cy.get('.blog2').find('button').contains('remove').as('removeButton')
          cy.get('@removeButton').click()

          cy.contains('Blog has been removed')
        })

        it('A blog can`t be deleted with the wrong credentials', function () {
          cy.login({ username: 'wrong', password: 'eisalainen' })

          cy.contains('A blog created by cypress').find('button').as('firstViewButton')
          cy.get('@firstViewButton').click()

          cy.get('.blog2').find('button').contains('remove').as('removeButton')
          cy.get('@removeButton').click()

          cy.contains('Wrong user')
        })
      })
    })

    describe('Working with many blogs', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'The first blog',
          author: 'Cypress',
          url: 'test.cypress.com'
        })

        cy.createBlog({
          title: 'The second blog',
          author: 'Cypress',
          url: 'test.cypress.com'
        })
      })

      it('First blog without like is the first one inserted', function () {
        cy.get('#blogList').then(($blog) => {
          const txt = $blog.text()
          console.log('teksti o', txt)

          cy.get('.blog:first').should('contain', 'The first blog')
          cy.get('.blog:last').should('contain', 'The second blog')
        })
      })

      it('Blogs get sorted by likes', function () {
        cy.contains('The second blog').find('button').as('secondViewButton')
        cy.get('@secondViewButton').click()

        cy.get('.blog2:last').find('button').contains('like').as('likeButton')
        cy.get('@likeButton').click()

        cy.get('#blogList').then(($blog) => {
          const txt = $blog.text()
          console.log('teksti o', txt)

          cy.get('.blog:first').should('contain', 'The second blog')
          cy.get('.blog:first').should('not.contain', 'The first blog')
          cy.get('.blog:last').should('contain', 'The first blog')
          cy.get('.blog:last').should('not.contain', 'The second blog')
        })
      })
    })
  })
})