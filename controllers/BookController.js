const { Book } = require('../models')
const { errorWrapper, errorGenerator } = require('../errors')

const create = errorWrapper(async (req, res) => {
    const { title, author, year } = req.body

    const book = new Book({
        title,
        author,
        year
    })
    await book.save()
    
    res.status(201).json(book)
})

const update = errorWrapper(async (req, res) => {
    const { id } = req.params
    const { title, author, year } = req.body

    const updatedBook = await Book.findByIdAndUpdate(
        id, 
        { title, author, year }, 
        { new: true }
    )

    if (!updatedBook) errorGenerator({ statusCode: 404, message: 'Book not found' })

    res.json(updatedBook)
})

const remove = errorWrapper(async (req, res) => {
    const { id } = req.params

    const deletedBook = await Book.findByIdAndDelete(id)

    if (!deletedBook) errorGenerator({ statusCode: 404, message: 'Book not found' })

    res.json(deletedBook)
})

const getAll = errorWrapper(async(req, res) => {
    const books = await Book.find()

    if (!books) errorGenerator({ statusCode: 404, message: 'Books not found' })

    res.json(books)
})

module.exports = {
    create,
    update,
    remove,
    getAll
}
