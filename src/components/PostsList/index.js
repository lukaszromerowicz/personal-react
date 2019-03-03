import React, { useState, useEffect, lazy, useCallback } from 'react'
import { Link } from 'react-router-dom'
import fm from 'front-matter'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Loader from '../Loader'
import { importAll } from '../../util'

dayjs.extend(customParseFormat)
const postsFiles = importAll(require.context('../../posts', false, /\.md$/))

const PostThumbnail = ({title, summary, slug, thumbnailImage }) => {
    lazy(() => import('../../posts' + thumnailImage))

    return <section className='post-thumbnail'>
        <Link to={`/blog/${slug}`}>
            <h1>{title}</h1>
        </Link>
        <img src={thumbnailImage}/>
        <p>{summary}</p>
    </section>
}

const PostsList = () => {
    const [postsMetadata, setPostsMetadata] = useState(undefined)
    const [error, setError] = useState(undefined)

    const fetchPosts = async () => {
        try {
            const posts = await Promise.all(postsFiles.map(file => fetch(file).then(res => res.text())))
            const postsMetadata = posts.map(post => fm(post)).map(post => post.attributes)
                .sort((a,b) => dayjs(b.date, 'DD/MM/YYYY').diff(dayjs(a.date, 'DD/MM/YYYY')))
            setPostsMetadata(postsMetadata)
        } catch (error) {
            setError(error)
        }
    }

    const memoizedFetchPosts = useCallback(() => fetchPosts(), [])

    useEffect(() => {
        memoizedFetchPosts()
    }, [])

    return <div className='content-container'>
            {error && <h2>Ooops. There was an error when loading the posts. Please try again.</h2>}
            {!error && !postsMetadata && <Loader/>}
            {!error && postsMetadata && postsMetadata.map(post => <PostThumbnail key={post.date} {...post} />)}
        </div>
}

export default PostsList