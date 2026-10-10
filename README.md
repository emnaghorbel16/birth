# Birthday Love Test Surprise 🎂💕

A beautiful, interactive multi-step birthday surprise website built with **React + Vite + Tailwind CSS + Framer Motion**.

---

## ✨ Features

- **Screen 0** – Welcome screen with animated balloons and confetti
- **Screen 1** – Love-o-meter gauge (slide to 500%!) with animated needle and cute mascot
- **Screen 2** – Three gift boxes to open revealing your surprises
- **Screen 3** – Bouquet screen with illustrated roses and sweet messages
- **Screen 4** – Memory polaroids with music player
- **Screen 5** – Typewriter birthday letter
- **Screen 6** – Birthday cake with blow-to-extinguish candles (mic + tap fallback)
- **`/qr`** – Generate a heart-shaped QR code to share on WhatsApp

---

## 🎨 Customization

Edit **`/src/config.js`** to personalize:

```js
partnerName: "My Love",       // Your partner's name
senderName: "Your Person",    // Your name
age: 22,                       // For candle count
birthdayDate: "October 10",   // Displayed on welcome screen
letterText: "...",             // The typewriter letter text
bouquetMessages: [...],        // 6 speech bubble messages
songTitle: "Song Name",        // Music player display
songArtist: "Artist Name",    // Music player display
```

---

## 📁 Adding Media

Place files in the `/public/` folder:

| File | Purpose |
|------|---------|
| `/public/photo1.jpg` | First polaroid photo |
| `/public/photo2.jpg` | Second polaroid photo |
| `/public/photo3.jpg` | Third polaroid photo (up to 6) |
| `/public/song.mp3` | Music player song (Screen 4) |
| `/public/music.mp3` | Background music (all screens) |

> **Tip:** The photos should ideally be 4:3 aspect ratio for best display.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Building for Production

```bash
npm run build
```

The output will be in the `/dist` folder.

---

## 🌐 Deploying to Netlify

1. Push the project to GitHub
2. Connect your repo to [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

Or drag & drop the `/dist` folder to Netlify's dashboard.

---

## 🌐 Deploying to Vercel

```bash
npm install -g vercel
vercel --prod
```

---

## 💌 Generating the QR Code

1. After deploying, note your URL (e.g., `https://your-site.netlify.app`)
2. Visit `https://your-site.netlify.app/qr`
3. Your QR code is automatically generated pointing to the deployed URL
4. Click **Download QR Code (PNG)**
5. Send on WhatsApp with the caption: **"Open when alone 🎁❤️"**

---

## 🎵 Music Credits

Replace `/public/music.mp3` and `/public/song.mp3` with your own music files.
Make sure you have the rights to use them.

---

Made with ❤️ for the most special birthday ever.
"# birth" 
