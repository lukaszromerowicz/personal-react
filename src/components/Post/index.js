import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import Loader from '../Loader'

const Post = ({ match }) => {
	const [postMarkdown, setPostMarkdown] = useState(undefined)
	const [error, setError] = useState(undefined)

	const fetchPost = async () => {
		try {
			const postFile = require(`../../posts/${match.params.slug}.md`)
			const markdown = await fetch(postFile).then(res => res.text())
			const markdownWithoutFrontmatter = markdown.replace(/\---((\n|.)*?)\---/, '')
			setPostMarkdown(markdownWithoutFrontmatter)
		} catch (error) {
			setError(error)
		}
	}

	useEffect(() => {
		fetchPost()
	}, [])


	return <div className='content-container'>
		{error && <h2>Ooops. There was an error when loading the post. Please try again.</h2>}
		{!error && !postMarkdown && <Loader />}
		{!error && postMarkdown &&
			<ReactMarkdown
				source={postMarkdown}
			/>}
	</div>
}

export default Post