// Funksjon for å hente restauranten sin vurdering fra bakgrunnsskriptet
chrome.storage.local.get('ratingsData', (result) => {
  if (!result.ratingsData) {
    console.error("Ratings data not available in storage.");
    return;
  }

  const ratingsData = result.ratingsData;
  const currentUrl = window.location.href.toLowerCase(); // Gjør URL-en til små bokstaver
  console.log("Content script is running");
  console.log("Current URL:", currentUrl);

  // Forenkle URL-en ved å fjerne spesialtegn og mellomrom
  function simplifyString(input) {
    return input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }

  const simplifiedUrl = simplifyString(currentUrl);
  console.log("Simplified URL:", simplifiedUrl);

  // Sjekk om navnet på stedet finnes i URL-en
  for (let name in ratingsData) {
    const simplifiedName = simplifyString(name);
    console.log("Comparing:", simplifiedUrl, "with:", simplifiedName);
    if (simplifiedUrl.includes(simplifiedName)) {
      const establishment = ratingsData[name]; // Henter hele objektet
      if (establishment && establishment.total_karakter !== undefined) {
        const rating = establishment.total_karakter;
        console.log("Rating found for establishment:", rating);
        displaySmiley(rating);
      } else {
        console.log('Total karakter not found for:', name);
      }
      break; // Stopp når en match er funnet
    }
  }
});

// Funksjon for å vise smilefjes basert på vurdering
function displaySmiley(rating) {
  if (rating === undefined) {
    console.error("Error: Tried to display undefined rating.");
    return;
  }

  const smileyElement = document.createElement('div');
  smileyElement.style.position = 'fixed';
  smileyElement.style.bottom = '20px';
  smileyElement.style.right = '20px';
  smileyElement.style.zIndex = '10000';
  smileyElement.style.padding = '20px';
  smileyElement.style.backgroundColor = 'yellow';
  smileyElement.style.color = 'black'; // Sørg for at teksten vises
  smileyElement.style.border = '2px solid black';
  smileyElement.style.borderRadius = '10px';
  smileyElement.style.fontSize = '30px';
  smileyElement.textContent = `Rating: ${rating}`;
  document.body.appendChild(smileyElement);
  console.log("Smiley displayed for rating:", rating);
}
