{
  "manifest_version": 2,
  "name": "Digg eller ikke digg",
  "version": "1.0",
  "description": "Displays Mattilsynet smilefjes ratings for Bergen establishments",
  "permissions": [
    "activeTab",
    "storage"
  ],
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "css": ["styles/style.css"]
    }
  ],
  "icons": {
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
