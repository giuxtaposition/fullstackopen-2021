import React from 'react'
const AddBlog = ({
  addBlog,
  newTitle,
  handleTitleChange,
  newAuthor,
  handleAuthorChange,
  newUrl,
  handleUrlChange,
}) => (
  <form onSubmit={addBlog}>
    <div>
      title: <input onChange={handleTitleChange} value={newTitle} />
    </div>

    <div>
      author: <input onChange={handleAuthorChange} value={newAuthor} />
    </div>

    <div>
      url: <input onChange={handleUrlChange} value={newUrl} />
    </div>

    <button type='submit'>save</button>
  </form>
)

export default AddBlog
