// Send melding til bakgrunnsskriptet for å hente vurderingsdata
chrome.runtime.sendMessage({ message: 'getRatingsData' }, (response) => {
  const ratingsData = response.ratingsData;

  if (!ratingsData) {
    console.error('Ratings data not available');
    return;
  }

  // Sjekk om URL-en er en generisk side som skal unngås
  const genericSites = ['google.com', 'facebook.com', 'twitter.com', 'instagram.com'];
  const currentUrl = window.location.hostname.toLowerCase();
  if (genericSites.some(site => currentUrl.includes(site))) {
    console.log('Skipping generic site:', currentUrl);
    return;
  }

  // Prøv å finne navn fra nettsidetittelen eller URL-en
  const establishmentName = document.title.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  const currentUrlCleaned = currentUrl.replace(/[^a-z0-9]/g, '');
  let matchedName = null;
  for (const name in ratingsData) {
    if (currentUrlCleaned.includes(name) || establishmentName.includes(name)) {
      matchedName = name;
      break;
    }
  }

  if (matchedName) {
    const rating = ratingsData[matchedName];
    displaySmiley(rating);
  } else {
    console.log('No rating found for:', currentUrl);
  }
});

// Funksjon for å vise smilefjes basert på vurdering
function displaySmiley(rating) {
  const smileyElement = document.createElement('div');
  smileyElement.style.position = 'fixed';
  smileyElement.style.bottom = '20px';
  smileyElement.style.right = '20px';
  smileyElement.style.zIndex = '10000';
  smileyElement.style.padding = '20px';
  smileyElement.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
  smileyElement.style.border = '2px solid black';
  smileyElement.style.borderRadius = '10px';
  smileyElement.style.fontSize = '30px';
  smileyElement.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';

  // Sett smilefjes-ikon basert på vurderingen (0-5)
  switch (rating) {
    case 0:
      smileyElement.textContent = "😃"; // Ingen brudd, stort smil
      break;
    case 1:
      smileyElement.textContent = "😊"; // Mindre brudd, stort smil
      break;
    case 2:
      smileyElement.textContent = "😐"; // Brudd som krever oppfølging, strekmunn
      break;
    case 3:
      smileyElement.textContent = "😕"; // Alvorlig brudd, sur munn
      break;
    case 4:
    case 5:
      smileyElement.textContent = "⚪"; // Ikke aktuelt / Ikke vurdert
      break;
  }

  document.body.appendChild(smileyElement);
}
