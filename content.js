// Funksjon for å hente restauranten sin vurdering fra bakgrunnsskriptet
chrome.storage.local.get('ratingsData', (result) => {
  const ratingsData = result.ratingsData;
  
  if (!ratingsData) {
    console.error('Ratings data not available');
    return;
  }

  // Prøv å finne navn fra nettsidetittelen
  const establishmentName = document.title.trim().toLowerCase();
  
  if (establishmentName in ratingsData) {
    const rating = ratingsData[establishmentName];
    displaySmiley(rating);
  } else {
    console.log('No rating found for:', establishmentName);
  }
});

// Funksjon for å vise smilefjes basert på vurdering
function displaySmiley(rating) {
  const smileyElement = document.createElement('div');
  smileyElement.style.position = 'fixed';
  smileyElement.style.bottom = '10px';
  smileyElement.style.right = '10px';
  smileyElement.style.zIndex = '1000';
  smileyElement.style.padding = '10px';
  smileyElement.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
  smileyElement.style.borderRadius = '50%';
  smileyElement.style.fontSize = '24px';
  smileyElement.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';

  // Sett smilefjes-ikon basert på vurderingen (0-4)
  if (rating === 0) smileyElement.textContent = "😡";
  else if (rating === 1) smileyElement.textContent = "😕";
  else if (rating === 2) smileyElement.textContent = "😐";
  else if (rating === 3) smileyElement.textContent = "😊";
  else if (rating === 4) smileyElement.textContent = "😃";

  document.body.appendChild(smileyElement);
}
