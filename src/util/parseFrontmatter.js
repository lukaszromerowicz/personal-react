const parseFrontmatter = text => {
	const match = text.match(/(---)((\n|.)*)(?=---)/)

	if (match === null) {
		throw new Error('No front matter found.')
	}

	const foundLines = match[0].replace('---', '').split(/\r\n|\n/).filter(e => e !== '')
	const parsed = Object.assign({}, ...foundLines.map(line => extractProp(line)))
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