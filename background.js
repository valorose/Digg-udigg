let ratingsData;

fetch('data/ratings.json')
  .then(response => response.json())
  .then(data => {
    ratingsData = data;
    chrome.storage.local.set({ratingsData: data});
  })
  .catch(error => console.error('Error loading ratings data:', error));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getRating') {
    const rating = ratingsData[request.domain];
    sendResponse({rating: rating});
  }
  return true;  // Indicates that the response is sent asynchronously
});
