// import MarkdownIt from 'markdown-it'
// import hljs from 'highlight.js'
// import hljs from 'highlight.js/lib/highlight'
// import hljsJavascript from 'highlight.js/lib/languages/javascript'

// hljs.registerLanguage('javascript', hljsJavascript)

// import { Remarkable } from 'remarkable'
import marked from 'marked';

import Service from './index';

// ['javascript'].forEach((langName) => {
// 	// Using require() here because import() support hasn't landed in Webpack yet
// 	const langModule = require(`highlight.js/lib/languages/${langName}`);
// 	hljs.registerLanguage(langName, langModule);
// });

const regExpPrefix = new RegExp(/^<p>/g);
const regExpSuffix = new RegExp(/<\/p>$/g);

class MarkupParserService extends Service {
	constructor() {
		super();

		// this._parser = new MarkdownIt({
		// 	html: false,
		// 	breaks: true,
		// 	linkify: true,
		// 	typographer: true,
		// 	highlight: function(str, lang) {
		// 		if (!(lang && hljs.getLanguage(lang)))
		// 			return '' // use external default escaping

		// 		try {
		// 			return hljs.highlight(lang, str).value
		// 		}
		// 		catch (__) {
		// 			// eslint-disable-next-line
		// 		}
		// 	}
		// })

		// this._parser = new Remarkable()
		// this._parser = new Remarkable({
		// 	html:         false,        // Enable HTML tags in source
		// 	xhtmlOut:     false,        // Use '/' to close single tags (<br />)
		// 	breaks:       false,        // Convert '\n' in paragraphs into <br>
		// 	langPrefix:   'language-',  // CSS language prefix for fenced blocks

		// 	// Enable some language-neutral replacement + quotes beautification
		// 	typographer:  false,

		// 	// Double + single quotes replacement pairs, when typographer enabled,
		// 	// and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
		// 	quotes: '“”‘’',

		// 	// Highlighter function. Should return escaped HTML,
		// 	// or '' if the source string is not changed
		// 	highlight: function (/*str, lang*/) { return ''; }
		// })

		const markedOptions = {
			breaks: false
		};

		// if (hljs) {
		// 	markedOptions.highlight = function (code) {
		// 		return hljs.highlightAuto(code).value;
		// 	}
		// }

		marked.setOptions(markedOptions);
	}

	render(correlationId, value) {
		//return this._parser.render(value)
		return marked(value);
	}

	trimResults(correlationId, value) {
		const result1 = value.replace(regExpPrefix, '');
		if (!result1)
			return result1;

		const result2 = result1.replace(regExpSuffix, '');
		return result2;
	}
}

export default MarkupParserService;
