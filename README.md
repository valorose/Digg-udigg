Bergen Smilefjes Ratings Chrome Extension

This Chrome extension displays ratings from Mattilsynet (Norwegian Food Safety Authority) for restaurants and cafes in Bergen. The ratings are displayed as emojis on the bottom right of the browser window whenever you visit the website of an establishment that has been rated by Mattilsynet.

Features

Fetches ratings from a local JSON file (ratings.json) containing Mattilsynet's ratings for Bergen establishments.

Automatically matches the website title with the corresponding establishment from the data.

Displays an emoji rating indicating the level of compliance with regulations:

😃: No violations found (Rating: 0)

😊: Minor violations that do not require follow-up (Rating: 1)

😐: Violations requiring follow-up (Rating: 2)

😕: Severe violations (Rating: 3)

⚪: Not applicable or not assessed (Rating: 4 or 5)

Installation

Clone or download this repository to your local machine.

Open Chrome and go to chrome://extensions/.

Enable "Developer mode" in the top right corner.

Click on "Load unpacked" and select the directory where this extension is located.

The extension should now be installed and visible in your Chrome extensions.

Usage

Once installed, visit a restaurant or cafe website in Bergen.

If the establishment is in the dataset (ratings.json), the extension will display an emoji rating in the bottom right corner of the page.

File Structure

manifest.json: The manifest file that defines the extension's permissions and other metadata.

content.js: The content script that runs on each page to determine if a rating should be displayed.

ratings.json: Contains the data with the ratings for establishments in Bergen.

How It Works

The ratings.json file is loaded when the extension is started.

The content.js script attempts to match the current page's title with an establishment name from the data.

If a match is found, an emoji is displayed on the page to represent the establishment's rating.

Troubleshooting

No emoji displayed: Ensure that the establishment name in the ratings.json matches the title of the website accurately. Minor differences can prevent the match.

Data not loading: Check the console (press F12 in Chrome) for errors related to loading ratings.json.

Contributing

Feel free to open issues or submit pull requests if you would like to contribute to improving this extension.

License

This project is licensed under the MIT License.
