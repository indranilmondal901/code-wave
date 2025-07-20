# 🚀 Code-Wave: A Real-Time Collaborative Code Editor

**Code-Wave** is a real-time collaborative code editor that enables multiple users to write and edit code simultaneously in a shared environment. Built with **React**, **CodeMirror**, **Node.js**, and **Socket.IO**, this tool is perfect for pair programming, collaborative learning, and conducting live coding interviews — all in the browser.

---

## 🌐 Live Demo

- 🔗 **Deployed App:** [https://code-wave-7qco.onrender.com/](https://code-wave-7qco.onrender.com/)
- 🎥 **Video Demo:** [Watch Demo on Loom](https://www.loom.com/share/4251b56663314d85afe49eb5a923834e?sid=f1e9ce90-f5e6-419f-b414-2f61a8768841)

---

## ✨ Features

- 🧑‍💻 Real-time collaborative editing using WebSockets
- 🖋️ Lightweight and responsive UI with CodeMirror editor
- 🧠 Unique Room ID based session management
- 🔌 Fast synchronization using Socket.IO
- 📱 Mobile-friendly layout (read-only on smaller devices)
- 🧼 Clean and minimal frontend design

---

## 🛠️ Tech Stack

| Layer        | Tech                     |
|--------------|--------------------------|
| Frontend     | React, CodeMirror        |
| Backend      | Node.js, Express         |
| Real-Time    | Socket.IO                |
| Hosting      | Render.com               |

---

## 📁 Project Structure

```

/code-wave
├── client/               # React Frontend
│   ├── public/
│   └── src/
│       ├── components/   # UI Components
│       │   ├── Client.js
│       │   └── Editor.js
│       ├── pages/        # Page Layouts
│       │   ├── Home.js
│       │   └── EditorPage.js
│       ├── App.js
│       └── index.js
├── server.js             # Express + Socket.IO server
├── package.json
└── README.md

````

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/indranilmondal901/code-wave.git
cd code-wave
````

### 2. Install Dependencies

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
```

### 3. Run the App Locally

```bash
# Start backend (from root)
node server.js

# Start frontend (in a new terminal)
cd client
npm start
```

---

## 🧪 Testing

This project has been manually tested for:

* Socket connectivity across browser tabs
* Room creation, joining, and disconnection events
* Real-time text synchronization
* Basic mobile view compatibility

---

## 🔮 Future Scope

* 🌍 Add support for multiple programming languages
* 💾 Persistent storage using a database (e.g., MongoDB)
* 🗣️ Voice/video calling integration (WebRTC)
* ⚙️ Code execution support using Judge0 API or custom compiler backend
* 🧑‍🏫 Admin panel for classroom collaboration

---

## 👨‍💻 Developed By

**Indranil Mondal**
🎓 MCA, Manipal University Jaipur
📧 \[[indranil.mondal901@gmail.com](mailto:indranil.mondal@example.com)] *(Replace with actual email)*
🔗 GitHub: [github.com/indranilmondal901](https://github.com/indranilmondal901)

---

> 📢 This project was developed as part of an academic submission. Feel free to fork and enhance it for learning or development purposes!

```

---

Let me know if you'd like a downloadable file of this or need a GitHub repository setup with it.
```
