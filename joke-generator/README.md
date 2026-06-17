# 😂 Random Joke Generator

A fun and interactive web app that fetches random jokes from multiple external APIs and displays them with a beautiful UI.

## 🌟 Features

- ✨ **Multiple Joke Types**
  - General jokes
  - Programming jokes
  - Knock-knock jokes

- 📋 **Copy to Clipboard** - Easily copy jokes to share
- 📱 **Share Functionality** - Share jokes on social media
- 🕐 **Joke History** - Keep track of the last 10 jokes
- 🎨 **Beautiful UI** - Modern, responsive design
- ⌨️ **Keyboard Shortcut** - Press Enter to get a new joke
- 💾 **Local Storage** - Your joke history persists across sessions

## 🚀 Live Demo

Visit: `https://moweiji888.github.io/personal-website/joke-generator/`

## 🔧 APIs Used

1. **Official Joke API** - `https://official-joke-api.appspot.com/`
   - Programming jokes
   - Knock-knock jokes
   - General jokes
   - No authentication required

2. **API Ninjas** - `https://api.api-ninjas.com/v1/jokes` (Optional)
   - General jokes
   - Free tier available

## 📝 Getting Started

### No Installation Needed
Just open `index.html` in a web browser!

### For Local Development

1. Clone the repository:
```bash
git clone https://github.com/moweiji888/personal-website.git
cd personal-website/joke-generator
```

2. Open in a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js http-server
npx http-server
```

3. Visit `http://localhost:8000`

## 🎯 How to Use

1. **Select Joke Type** - Choose from General, Programming, or Knock-Knock jokes
2. **Click Get Joke** - Fetch a random joke from the API (or press Enter)
3. **Copy or Share** - Use the buttons to copy the joke or share it
4. **View History** - See your recently viewed jokes in the sidebar (last 10)

## 🔌 API Configuration

### Using Official Joke API (Default)

No configuration needed! The app uses the free Official Joke API by default.

### Using API Ninjas (Optional)

For better rate limiting:

1. Sign up at [api-ninjas.com](https://api-ninjas.com/)
2. Get your free API key
3. Update `script.js`:

```javascript
const APIS = {
    general: {
        url: 'https://api.api-ninjas.com/v1/jokes',
        headers: { 'X-Api-Key': 'YOUR_API_KEY' }
    },
    // ...
};
```

## 🎨 Customization

### Change Colors

Edit `styles.css` to customize the gradient and colors:

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Change Gradient
```css
/* Light gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Dark gradient */
background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);

/* Warm gradient */
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

### Add More Joke Types

1. Add new entries to the `APIS` object in `script.js`:

```javascript
const APIS = {
    // ... existing apis
    custom: {
        url: 'https://api.example.com/jokes/custom'
    }
};
```

2. Add a radio button in `index.html`:

```html
<label>
    <input type="radio" name="jokeType" value="custom"> Custom Type
</label>
```

## 📊 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## ⚠️ Troubleshooting

### "Failed to fetch joke" Error

1. **Check Internet Connection** - Ensure you're connected
2. **API Rate Limit** - Wait a moment and try again
3. **Try Different Type** - Switch to a different joke type
4. **Check Browser Console** - Look for CORS errors (Ctrl+Shift+I)

### CORS Error (blocked by browser)

This usually means the API is not configured for CORS. The app uses Official Joke API which supports CORS by default.

### History Not Persisting

- Ensure localStorage is enabled in your browser
- Check if you're in private/incognito mode
- Clear browser cache if issues persist

### Share Button Not Working

- Web Share API may not be available on all platforms
- Fallback automatically copies the joke to clipboard
- Test on mobile devices for better Web Share API support

## 🔐 Security

- ✅ All jokes are HTML-escaped to prevent XSS attacks
- ✅ No personal data collected or sent
- ✅ All data stored locally only (localStorage)
- ✅ No external tracking or analytics

## 📈 Performance

- **Load Time**: < 1 second
- **API Response Time**: 200-500ms
- **Storage**: ~5KB for 10 jokes
- **Optimizations**: Minimal CSS/JS, efficient DOM updates

## 💡 Tips & Tricks

1. **Keyboard Shortcut** - Press Enter to get a new joke quickly
2. **History Click** - Click any joke in history to view it again
3. **Share Directly** - On mobile, share button opens share sheet
4. **Dark Mode** - Browser dark mode will auto-apply to the app

## 📚 Learning Resources

This project demonstrates:
- Fetching data from external APIs using Fetch API
- Error handling and fallback mechanisms
- DOM manipulation and manipulation
- LocalStorage for persistent data
- Responsive web design with CSS Grid
- ES6 JavaScript features
- HTML escaping for security

## 🔄 API Response Examples

### Programming Joke (Official Joke API)
```json
{
  "type": "programming",
  "setup": "Why do Java developers wear glasses?",
  "delivery": "Because they don't C#",
  "id": 2
}
```

### General Joke
```json
{
  "joke": "Why did the developer go broke? Because he used up all his cache!"
}
```

### Knock-Knock Joke
```json
{
  "type": "knock-knock",
  "setup": "Knock knock.",
  "delivery": "Who's there? Interrupting cow. Interrupting cow w...",
  "id": 16
}
```

## 🐛 Known Issues

- API rate limiting may occur with heavy use
- Some jokes may be offensive or not suitable for all audiences
- Official Joke API occasionally goes down for maintenance

## 📄 License

MIT License - Feel free to use and modify!

## 🤝 Contributing

Found a bug or want to add a feature?

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎓 Further Improvements

Potential features to add:
- [ ] Dark mode toggle
- [ ] Favorite jokes list
- [ ] Search/filter jokes
- [ ] Rate jokes
- [ ] Email joke to friend
- [ ] Daily joke notification
- [ ] Export jokes as PDF
- [ ] Multiple language support

## 📞 Support

If you have questions or issues:
1. Check this README
2. Look at the browser console for errors (F12)
3. Create an issue on GitHub

---

**Made with ❤️ by [moweiji888](https://github.com/moweiji888)**

**Enjoy the jokes! 😂** \n\nPress Enter to get a joke, or click the button above!