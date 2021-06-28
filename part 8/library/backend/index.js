const config = require('./utils/config')
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

console.log('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: [String]): [Book!]
    allAuthors: [Author!]
    me: User
    allGenres: [String!]
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

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
      published: Int!
      author: String!
      genres: [String!]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
    addNewFavoriteGenre(favoriteGenre: String!): User
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      if (args.author && args.genres) {
        const booksByAuthorAndGenres = await Book.find({
          author: args.author,
          genres: args.genres,
        })
        return booksByAuthorAndGenres.populate('author')
      }
      if (args.author) {
        return await Book.find({ author: args.author }).populate('author')
      }
      if (args.genres) {
        const books = await Book.find({}).populate('author')
        let booksToReturn = []

        books.forEach(book => {
          let foundBook = args.genres.every(genre => {
            let found = false
            if (book.genres.includes(genre)) {
              found = true
            }
            return found
          })

          if (foundBook) {
            booksToReturn.push(book)
          }
        })

        return booksToReturn
      }

      return await Book.find({}).populate('author')
    },

    allAuthors: () => Author.find({}),

    allGenres: async () => {
      const allGenresList = await Book.find({}, { genres: 1, _id: 0 })

      const genresList = () => {
        let cleanedUpList = []
        allGenresList.forEach(genre => {
          genre.genres.forEach(g => {
            if (!cleanedUpList.includes(g)) {
              cleanedUpList = cleanedUpList.concat(g)
            }
          })
        })
        return cleanedUpList
      }

      return genresList()
    },
  },
  Mutation: {
    //Add New Book
    addBook: async (root, args, context) => {
      //Check if book is already in  server
      if (await Book.exists({ title: args.title })) {
        throw new UserInputError('Title must be unique', {
          invalidArgs: args.title,
        })
      }

      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: args.author })
      // Check if author in server
      if ((await Author.exists({ name: args.author })) === false) {
        //If not add new author
        author = new Author({
          name: args.author,
          id: uuidv4(),
        })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const book = new Book({ ...args, author: author.id, id: uuidv4() })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },

    // Edit Author BirthYear
    editAuthor: async (root, args) => {
      //Find author in the  server
      const author = await Author.findOne({ name: args.name })

      // If not found
      if (!author) {
        return 'Author not found'
      }

      author.born = args.setBornTo

      return author.save()
    },

    // Create New User
    createUser: (root, args) => {
      const user = new User({ ...args, id: uuidv4() })

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },

    // LOGIN
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== config.SECRET) {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, config.SECRET) }
    },

    // Edit Favorite Genre
    addNewFavoriteGenre: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      // Check if already favorite genre
      const favoriteGenre = await User.exists({
        favoriteGenre: args.favoriteGenre,
      })
      if (favoriteGenre === false) {
        // If not add it
        currentUser.favoriteGenre = args.favoriteGenre
        await currentUser.save()
      }
      return currentUser
    },
  },
  Author: {
    bookCount: async root => {
      const foundAuthor = await Author.findOne({ name: root.name })
      const foundBooks = await Book.find({ author: foundAuthor.id })
      return foundBooks.length
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), config.SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
