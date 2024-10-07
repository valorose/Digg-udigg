let ratingsData = {};

fetch('ratings.json')
  .then(response => response.json())
  .then(data => {
    // Process the data into a more easily searchable format
    data.forEach(item => {
      ratingsData[item.navn.toLowerCase()] = item.total_karakter;
    });
    chrome.storage.local.set({ratingsData: ratingsData});
  })
  .catch(error => console.error('Error loading ratings data:', error));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getRating') {
    const rating = ratingsData[request.name.toLowerCase()];
    sendResponse({rating: rating});
  }
  return true;  // Indicates that the response is sent asynchronously
});
