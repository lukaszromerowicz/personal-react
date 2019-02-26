import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

const Post = ({ match }) => {
	const [postMarkdown, setPostMarkdown] = useState(undefined)

	const fetchPost = async () => {
		try {
			const postFile = require(`../../posts/${match.params.slug}.md`)
			const markdown = await fetch(postFile).then(res => res.text())
			const markdownWithoutFrontmatter = markdown.replace(/\---((\n|.)*?)\---/, '')
			setPostMarkdown(markdownWithoutFrontmatter)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchPost()
	}, [])


	return <div className='content-container'>
			{postMarkdown
				? <ReactMarkdown
					source={postMarkdown}
				/>
				: <div>Loading...</div>}
		</div>
}

export default Post