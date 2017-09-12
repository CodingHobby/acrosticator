window.addEventListener('load', function() {
	document.getElementById('input-form')
		.addEventListener('submit', function(e) {
			e.preventDefault()
			document.getElementById('acrostic').innerHTML = ''
			const word = document.getElementById('input').value

			const acros = word.split('')
				.map(letter => {
					return fetch(`https://api.datamuse.com/words?sp=${letter}*`)
						.then(res => res.text().then(word => word))
				})
			Promise.all(acros).then(values => {
				values.forEach(value => {
					let words = JSON.parse(value)
					let wordToUse =words[Math.floor(Math.random() * words.length)].word
					document.getElementById('acrostic').innerHTML += `
					<div class="word"><span class="capital">${wordToUse.charAt(0).toUpperCase()}</span>${wordToUse.substr(1)}</div>`
				})
			})
		})
})
