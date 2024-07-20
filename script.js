document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('text');
    const quoteAuthor = document.getElementById('author');
    const newQuoteButton = document.getElementById('new-quote');
    const tweetQuoteButton = document.getElementById('tweet-quote');

    let quotes = [];

    const fetchQuotes = async () => {
        try {
            const response = await fetch('https://type.fit/api/quotes');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            quotes = await response.json();
            displayRandomQuote();
        } catch (error) {
            console.error('Error fetching quotes:', error);
            quoteText.textContent = 'An error occurred while fetching the quotes.';
            quoteAuthor.textContent = '';
        }
    };

    const displayRandomQuote = () => {
        if (quotes.length === 0) return;

        const randomIndex = Math.floor(Math.random() * quotes.length);
        const { text, author } = quotes[randomIndex];

        // Generate a consistent color
        const color = getColorFromText(text);

        // Apply the color to the text
        quoteText.style.color = color;
        quoteAuthor.style.color = color;

        // Set the background color of the body
        document.body.style.backgroundColor = color;

        // Update text and author
        quoteText.textContent = text || 'No quote text available';
        quoteAuthor.textContent = author ? `- ${author}` : '- Unknown';
        tweetQuoteButton.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${text}" - ${author || 'Unknown'}`)}`;
    };

    const getColorFromText = (text) => {
        // Create a unique hash from the quote text
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            hash = text.charCodeAt(i) + ((hash << 5) - hash);
        }
        // Convert the hash to a color
        return '#' + ((hash & 0x00BBFFFF).toString(16).padStart(6, '0')).toUpperCase();
    };

    newQuoteButton.addEventListener('click', displayRandomQuote);

    // Load quotes on page load
    fetchQuotes();
});
