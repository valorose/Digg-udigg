// Funksjon for å hente restauranten sin vurdering fra bakgrunnsskriptet
chrome.storage.local.get('ratingsData', (result) => {
  if (!result.ratingsData) {
    console.error("Ratings data not available in storage.");
    return;
  }

  const ratingsData = result.ratingsData;
  const currentUrl = window.location.href.toLowerCase(); // Gjør URL-en til små bokstaver
  console.log("Current URL:", currentUrl);

  // Forenkle URL-en ved å fjerne spesialtegn og mellomrom
  function simplifyString(input) {
    return input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }

  const simplifiedUrl = simplifyString(currentUrl);

  // Sjekk om navnet på stedet finnes i URL-en
  for (let name in ratingsData) {
    const simplifiedName = simplifyString(name);
    if (simplifiedUrl.includes(simplifiedName)) {
      const rating = ratingsData[name].total_karakter;
      console.log("Rating found for establishment:", rating);
      displaySmiley(rating);
      break;
    }
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
  smileyElement.style.backgroundColor = 'yellow';
  smileyElement.style.border = '2px solid black';
  smileyElement.style.borderRadius = '10px';
  smileyElement.style.fontSize = '30px';
  smileyElement.textContent = `Rating: ${rating}`;
  document.body.appendChild(smileyElement);
}
