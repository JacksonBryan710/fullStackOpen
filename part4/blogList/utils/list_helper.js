const lodash = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((total, blog) => total + blog.likes, 0)

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    return blogs.reduce((favorite, blog) => blog.likes > favorite.likes ? blog : favorite)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null

    const counts = lodash.countBy(blogs, 'author')
    const topAuthor = lodash.maxBy(Object.keys(counts), author => counts[author])

    return { 
        author: topAuthor,
        blogs: counts[topAuthor]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null

    const blogsByAuthor = lodash.groupBy(blogs, 'author')
    const likeTotals = lodash.mapValues(blogsByAuthor, blogs => lodash.sumBy(blogs, 'likes'))

    const topAuthor = lodash.maxBy(
        Object.keys(blogsByAuthor),
        author => likeTotals[author]
    )

    return {
        author: topAuthor,
        likes: likeTotals[topAuthor]
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}