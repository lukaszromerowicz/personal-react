const parseFrontmatter = text => {
	const match = text.match(/(---)((\n|.)*)(?=---)/)

	if (match === null) {
		throw new Error('No front matter found.')
	}

	const foundLines = match[0].replace('---', '').split(/\r\n|\n/).filter(l => l !== '')
	const parsed = Object.assign({}, ...foundLines.map(l => extractProp(l)))
	return parsed
}

const extractProp = val => {
	const propName = val.match(/(^(.[^:]*)(?=:))/)

	if (propName === null) {
		return undefined
	}

	const value = val.replace(/(^(.*)(:))/, '')
	
	if (!/\S/.test(value)) {
		return undefined
	} 

	return {
		[propName[0]]: val.replace(/(^(.*)(:\s))/, '') 
	}
}

export default parseFrontmatter