import SW from 'stopword'
import { wordDict } from '../constants/constant.js'

export const processText = (text) => {
	//? converts the I’m, you’re, etc. ->  I am, you are, etc.
	const words = text.split(' ')
	const processedWords = words.map((word) => {
		const lowerCaseWord = word.toLowerCase()
		return wordDict[lowerCaseWord] || word
	})

	return processedWords
		.join(' ')
		.replace(/[^a-zA-Z\s]+/g, '')
		.toLowerCase()
}

export const removeStopwords = (textArray) => {
	// stop words include but, a, or, and what. Since these words have no effect on a user’s sentiment, removing them will help us focus on the important keywords.
	// console.log(textArray)
	return SW.removeStopwords(textArray)
}
