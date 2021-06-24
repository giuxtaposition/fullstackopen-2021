import React, { useState } from 'react'
const AddBlog = ({ createBlog }) => {
  //New Blog
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async event => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{' '}
          <input
            onChange={({ target }) => setNewTitle(target.value)}
            value={newTitle}
          />
        </div>

        <div>
          author:{' '}
          <input
            onChange={({ target }) => setNewAuthor(target.value)}
            value={newAuthor}
          />
        </div>

        <div>
          url:{' '}
          <input
            onChange={({ target }) => setNewUrl(target.value)}
            value={newUrl}
          />
        </div>

        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default AddBlog
