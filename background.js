let ratingsData = {};

// Hent JSON-dataene
fetch(chrome.runtime.getURL('ratings.json'))
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      ratingsData[item.navn.toLowerCase()] = item.total_karakter;
    });
    chrome.storage.local.set({ ratingsData: ratingsData });
    console.log("Ratings data successfully loaded:", ratingsData);
  })
  .catch(error => console.error('Error loading ratings data:', error));
