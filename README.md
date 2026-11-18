# Suara Rakyat

Suara Rakyat is a simple Indonesian public-aspiration website for learning HTML, CSS, JavaScript, and browser database concepts.

## Purpose

This project demonstrates:

- A static multi-section public website
- Form validation and anonymous submissions
- Search and filtering
- Aspiration support counters
- Live summary and category statistics
- Browser data storage with IndexedDB
- Separation of HTML, CSS, JavaScript, and database code

## Run the Website

From the project folder, start a local server:

```bash
python3 -m http.server 4173
```

Open:

```text
http://localhost:4173/
```

## Project Structure

```text
.
├── index.html
├── README.md
└── html/
    ├── css/
    │   └── ar.css
    └── js/
        ├── ar.js
        ├── database.js
        └── tailwind.config.js
```

## Database

The site uses IndexedDB in the current browser. Submitted aspirations are stored on the device and remain available after refreshing or reopening the page.

This is a learning prototype, not a shared server database. Data is not synchronized between browsers or devices.

## Tech

- HTML
- Tailwind CSS CDN
- Vanilla JavaScript
- IndexedDB
- Phosphor Icons
