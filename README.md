# 😂 Random Joke Generator

A fun and interactive random joke generator using the [JokeAPI](https://jokeapi.dev/). Get a laugh whenever you need one!

## ✨ Features

- 🎭 **Multiple Categories** - Get jokes from different categories:
  - Any Category
  - General
  - Programming
  - Knock-Knock

- 😄 **Random Jokes** - Fetch random jokes with a single click
- 📱 **Two-Part Jokes** - Support for setup/delivery style jokes
- 📚 **Joke History** - Keep track of the last 20 jokes you've seen
- 📤 **Share Feature** - Share jokes with friends
- 💾 **Local Storage** - History is saved and persists across sessions
- 📊 **Statistics** - See how many jokes you've loaded
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- 📱 **Mobile Friendly** - Works perfectly on all devices

## 🚀 How to Use

1. Open `index.html` in your web browser
2. Click the "Get Joke" button to fetch a random joke
3. Select a category from the dropdown to get jokes from a specific category
4. Click "Share" to share the joke with friends
5. View your joke history in the section below
6. Click "Clear History" to reset your joke history

## 📁 File Structure

```
├── index.html      # HTML structure
├── style.css       # Styling and animations
├── script.js       # Application logic with JokeAPI integration
└── README.md       # Documentation
```

## 🔗 API Used

This application uses the **JokeAPI** (v2):
- **Base URL**: `https://v2.jokeapi.dev/joke/`
- **Documentation**: [JokeAPI Docs](https://jokeapi.dev/)
- **No Authentication Required**: Free to use!

### Joke Categories

- **Any**: Random jokes from all categories
- **General**: Clean, general humor
- **Programming**: Tech and programming jokes
- **Knock-Knock**: Classic knock-knock jokes

## 💾 Local Storage

Your joke history is automatically saved:
- Stores up to 20 jokes
- Persists across browser sessions
- Includes timestamp and category information
- Can be cleared anytime

## 🎨 Design Features

- **Gradient Background** - Attractive purple gradient
- **Smooth Animations** - Fade-in and slide animations
- **Loading States** - Visual feedback while fetching
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Custom Scrollbar** - Styled scrollbar in history section

## 🔄 How It Works

1. **Fetch Joke**: Click the button to make an API request to JokeAPI
2. **Display**: The joke is displayed in the main content area
3. **Store**: The joke is added to local storage for history
4. **Share**: Share functionality using native sharing or clipboard

## 🌐 Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## ⚙️ Requirements

- Modern web browser with:
  - JavaScript enabled
  - LocalStorage support
  - Fetch API support
  - Internet connection (to fetch jokes from API)

## 🎯 Keyboard Shortcuts

- **Click "Get Joke"** - Fetch a new joke
- **Select Category** - Filter jokes by category

## 🚨 Troubleshooting

**"Could not load a joke" error:**
- Check your internet connection
- Verify the JokeAPI service is up (https://jokeapi.dev/)
- Try refreshing the page

**History not saving:**
- Check if LocalStorage is enabled in your browser
- Clear browser cache and try again

## 📝 Example Joke

**Setup**: Why do programmers prefer dark mode?

**Delivery**: Because light attracts bugs! 🐛

## 🎉 Have Fun!

Enjoy laughs and share jokes with your friends! 😂

---

**Made with ❤️ for joke lovers everywhere**
