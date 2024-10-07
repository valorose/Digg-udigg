{
  "manifest_version": 2,
  "name": "Bergen Smilefjes Ratings",
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
      "css": ["styles.css"]
    }
  ],
  "icons": {
    "48": "icon48.png",
    "128": "icon128.png"
  }
}
