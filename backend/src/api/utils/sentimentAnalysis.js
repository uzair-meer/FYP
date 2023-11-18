import natural from 'natural'
import SpellCorrector from 'spelling-corrector'
import { processText, removeStopwords } from './textProcessing.js'

const spellCorrector = new SpellCorrector()
spellCorrector.loadDictionary()

export const analyzeSentiment = (review) => {
	const alphaOnlyReview = processText(review)

	const { WordTokenizer } = natural
	const tokenizer = new WordTokenizer()
	const tokenizedReview = tokenizer.tokenize(alphaOnlyReview)

	const correctedReview = tokenizedReview.map((word) =>
		spellCorrector.correct(word)
	)
	const filteredReview = removeStopwords(correctedReview)

	const { SentimentAnalyzer, PorterStemmer } = natural
	const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn')
	return analyzer.getSentiment(filteredReview)
}
