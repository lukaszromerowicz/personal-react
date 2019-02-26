import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import fm from 'front-matter'
import { importAll } from '../../util'

const postsFiles = importAll(require.context('../../posts', false, /\.md$/))

const PostThumbnail = ({title, summary, slug}) => (
    <section className='post-thumbnail'>
        <Link to={`/blog/${slug}`}>
            <h1>{title}</h1>
        </Link>
        <p>{summary}</p>
    </section>
)

const PostsList = () => {
    const [postsMetadata, setPostsMetadata] = useState(undefined)

    const fetchPosts = async () => {
        try {
            const posts = await Promise.all(postsFiles.map(file => fetch(file).then(res => res.text())))
            const postsMetadata = posts.map(post => fm(post))
            setPostsMetadata(postsMetadata)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return <div className='content-container'>
            {postsMetadata && postsMetadata.map(post => <PostThumbnail {...post.attributes} />)}
        </div>
}

export default PostsList