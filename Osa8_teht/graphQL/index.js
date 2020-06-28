const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const { _ } = require('lodash')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://miikaMI:jh9ZJvka2SgSKVbM@cluster0-fqo8n.mongodb.net/GraphQL?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Mutation {
  addBook(
  title: String!
  genres: [String]!
  author: String!
  published: Int!
  ): Book
  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}

type Author {
  name: String!
  born: Int
  bookCount: Int!
  id: ID!
}

type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

type Query {
  booksCount: Int!
  authorsCount: Int!
  allBooks(author: String, genre: [String]): [Book!]!
  allAuthors: [Author!]!
  me: User
}
`

const resolvers = {
  Query: {
    authorsCount: () => Author.collection.countDocuments(),
    allAuthors: (root, args) => {
      return Author.find({})
    },
    allBooks: async (root, args) => {

      if (args.genre) {
        let booksByGenre = null
        console.log('genre', args.genre[0])
        try {
          booksByGenre = await Book.find({ genres: args.genre[0] })
        } catch (error) {
          throw new UserInputError('No such genre in the database', {
            invalidArgs: args.author
          })
        }

        return booksByGenre
      }

      return Book.find({})
    },
    me: (root, args, context) => {

      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const booksByAuthor = await Book.find({ author: root._id })
      return booksByAuthor.length
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      let authorId = null
      let newAuthor = null

      if (!currentUser) {
        return new AuthenticationError("not authenticated")
      }

      try {
        let isBook = await Book.findOne({ title: args.title })
        console.log('löytykö bookki', isBook)
        if (isBook) {
          return new UserInputError('Book already in the database', {
            invalidArgs: args.title,
          })
        }
      } catch (error) {
        console.log('error yksi', { error })
      } finally { console.log('Eka try') }

      try {
        let isAuthor = await Author.findOne({ name: args.author })

        console.log({ isAuthor })

        if (isAuthor) {
          authorId = isAuthor._id
        } else {
          newAuthor = new Author({ name: args.author, born: null })

          console.log({ newAuthor })
          try {
            if (args.title.length > 1) {
              await newAuthor.save()
            }
          } catch (error) {
            return new UserInputError(error.message, {
              invalidArgs: args,
            })
          }

          authorId = newAuthor._id
        }
      } catch (error) {
        console.log('error kaksi on', error)
        if (error.error.startsWith('UserInputError')) {
          return new UserInputError(error, {
            invalidArgs: args,
          })
        }
      }

      const book = new Book({ ...args, author: authorId })

      console.log({ book })

      try {
        await book.save()
      } catch (error) {
        return new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book
    },
    editAuthor: async (root, args, { currentUser }) => {

      if (!currentUser) {
        return new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      author.born = args.setBornTo


      console.log({ author })
      try {
        await author.save()
      } catch (error) {
        return new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      console.log({ user })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User
        .findById(decodedToken.id)

      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})