let ratingsData = {};

// Hent JSON-dataene og lagre dem i lokal storage
fetch(chrome.runtime.getURL('ratings.json'))
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      ratingsData[item.navn.toLowerCase().replace(/[^a-z0-9]/g, '')] = item.total_karakter;
    });
    chrome.storage.local.set({ ratingsData: ratingsData });
    console.log("Ratings data successfully loaded:", ratingsData);
  })
  .catch(error => console.error('Error loading ratings data:', error));

// Lytt til meldinger fra content.js for å sende vurderingsdata
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'getRatingsData') {
    chrome.storage.local.get('ratingsData', (result) => {
      sendResponse({ ratingsData: result.ratingsData });
    });
    return true; // Kreves for å indikere at sendResponse vil bli kalt asynkront
  }
});
