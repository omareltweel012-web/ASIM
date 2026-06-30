// Joke Generator using JokeAPI

class JokeGenerator {
    constructor() {
        this.currentJoke = null;
        this.jokeHistory = this.loadHistory();
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.renderHistory();
    }

    cacheElements() {
        this.getJokeBtn = document.getElementById('getJokeBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.jokeContent = document.getElementById('jokeContent');
        this.categorySelect = document.getElementById('categorySelect');
        this.historyList = document.getElementById('historyList');
        this.jokeCount = document.getElementById('jokeCount');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
    }

    bindEvents() {
        this.getJokeBtn.addEventListener('click', () => this.fetchJoke());
        this.shareBtn.addEventListener('click', () => this.shareJoke());
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        this.categorySelect.addEventListener('change', () => this.fetchJoke());
    }

    async fetchJoke() {
        this.getJokeBtn.classList.add('loading');
        this.getJokeBtn.disabled = true;
        this.shareBtn.style.display = 'none';

        const category = this.categorySelect.value;
        const url = this.buildJokeUrl(category);

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch joke');
            
            const data = await response.json();
            
            if (data.error) {
                this.showJoke('No joke found. Try another category!');
            } else {
                this.currentJoke = data;
                this.displayJoke(data);
                this.addToHistory(data);
            }
        } catch (error) {
            console.error('Error fetching joke:', error);
            this.showJoke('😅 Oops! Could not load a joke. Please check your internet connection and try again.');
        } finally {
            this.getJokeBtn.classList.remove('loading');
            this.getJokeBtn.disabled = false;
        }
    }

    buildJokeUrl(category) {
        const baseUrl = 'https://v2.jokeapi.dev/joke/';
        
        if (category === 'any') {
            return `${baseUrl}Any`;
        } else if (category === 'general') {
            return `${baseUrl}General`;
        } else if (category === 'programming') {
            return `${baseUrl}Programming`;
        } else if (category === 'knock-knock') {
            return `${baseUrl}Knock-Knock`;
        }
        
        return `${baseUrl}Any`;
    }

    displayJoke(joke) {
        let jokeText = '';

        if (joke.type === 'single') {
            jokeText = joke.joke;
        } else if (joke.type === 'twopart') {
            jokeText = `
                <p>${joke.setup}</p>
                <p class="punchline">${joke.delivery}</p>
            `;
        }

        this.jokeContent.innerHTML = jokeText;
        this.shareBtn.style.display = 'inline-block';
    }

    showJoke(text) {
        this.jokeContent.innerHTML = `<p>${text}</p>`;
        this.shareBtn.style.display = 'none';
    }

    addToHistory(joke) {
        const jokeText = joke.type === 'single' ? joke.joke : `${joke.setup} - ${joke.delivery}`;
        
        const historyItem = {
            id: Date.now(),
            text: jokeText,
            category: this.categorySelect.value,
            timestamp: new Date().toLocaleString()
        };

        this.jokeHistory.unshift(historyItem);
        
        // Keep only last 20 jokes
        if (this.jokeHistory.length > 20) {
            this.jokeHistory.pop();
        }

        this.saveHistory();
        this.renderHistory();
    }

    renderHistory() {
        this.jokeCount.textContent = this.jokeHistory.length;

        if (this.jokeHistory.length === 0) {
            this.historyList.innerHTML = '<div class="empty-message">No jokes in history yet. Start laughing! 😂</div>';
            return;
        }

        this.historyList.innerHTML = this.jokeHistory.map(item => `
            <li class="history-item" title="${item.timestamp}">
                <strong>[${item.category}]</strong> ${this.truncateText(item.text, 100)}
            </li>
        `).join('');
    }

    truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    }

    shareJoke() {
        if (!this.currentJoke) return;

        let jokeText = '';
        if (this.currentJoke.type === 'single') {
            jokeText = this.currentJoke.joke;
        } else {
            jokeText = `${this.currentJoke.setup}\n${this.currentJoke.delivery}`;
        }

        if (navigator.share) {
            navigator.share({
                title: '😂 Joke Generator',
                text: jokeText
            }).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(jokeText).then(() => {
                alert('Joke copied to clipboard!');
            }).catch(err => {
                alert('Could not copy joke: ' + err);
            });
        }
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear all joke history?')) {
            this.jokeHistory = [];
            this.saveHistory();
            this.renderHistory();
        }
    }

    saveHistory() {
        localStorage.setItem('jokeHistory', JSON.stringify(this.jokeHistory));
    }

    loadHistory() {
        const stored = localStorage.getItem('jokeHistory');
        return stored ? JSON.parse(stored) : [];
    }
}

// Initialize the app
const jokeApp = new JokeGenerator();