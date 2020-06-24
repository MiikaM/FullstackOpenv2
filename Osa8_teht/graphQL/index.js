const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v4: uuid } = require('uuid');
const { _ } = require('lodash')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]


const typeDefs = gql`

  type Mutation {
    addBook(
    title: String!
    genres: [String]!
    author: String!
    published: Int!
    ): Book
    addAuthor(
      name: String!
      born: Int!
    ): Author
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    genres: String!
    author: String!
    published: Int!
    id: ID!
  }

  type Query {
    booksCount: Int!
    authorsCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!

  }
`

const resolvers = {
  Query: {
    booksCount: () => books.length,
    authorsCount: () => authors.length,
    allAuthors: () => authors,
    allBooks: (root, args) => {
      let booksByGenre = books.filter(p => p.genres.find(g => g === args.genre))

      let booksByAuthor = books.filter(book => book.author === args.author)

      if (args.genre && args.author) {

        if (!(authors.find(p => p.name === args.author)) || !(books.find(p => p.genres.find(g => g === args.genre)))) {
          throw new UserInputError('No such author with such genre in the database', {
            invalidArgs: args.author
          })
        }

        let genreAndAuthor = _.intersection(booksByGenre, booksByAuthor)

        return genreAndAuthor
      }

      if (args.author) {

        if (!(authors.find(p => p.name === args.author))) {
          throw new UserInputError('No such author in the database', {
            invalidArgs: args.author
          })
        }

        return booksByAuthor
      }

      if (args.genre) {

        if (!(books.find(p => p.genres.find(g => g === args.genre)))) {
          throw new UserInputError('No such genre in the database', {
            invalidArgs: args.author
          })
        }

        return booksByGenre
      }

      return books
    },
  },
  Author: {
    bookCount: (root) => {
      const booksByAuthor = books.filter(book => book.author === root.name)
      return booksByAuthor.length
    }
  },
  Mutation: {
    addBook: (root, args) => {
      if (books.find(b => b.title === args.title)) {
        throw new UserInputError('Book already in the database', {
          invalidArgs: args.title,
        })
      }

      if (!(authors.find(a => a.name === args.author))) {
        const newAuthor = { name: args.author, born: null}
        authors = authors.concat(newAuthor)
      }

      const book = { ...args, id: uuid() }
      books = books.concat(book)
      return book
    },
    editAuthor: (root, args) => {
      const authorFind = authors.find(a => a.name === args.name)

      if (!authorFind) {
        return null
      }

      const editedAuthor = {...authorFind, born: args.setBornTo}
      authors = authors.map(a => a.name === authorFind.name ? editedAuthor : a)
      return editedAuthor
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})