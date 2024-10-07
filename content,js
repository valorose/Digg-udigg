function findEstablishmentName() {
  // This is a placeholder function. You'll need to implement logic to find the establishment name on the current page.
  // This might involve searching for specific elements, meta tags, or using other heuristics.
  return document.title;  // For now, we'll just use the page title as an example.
}

const establishmentName = findEstablishmentName();

chrome.runtime.sendMessage({action: 'getRating', name: establishmentName}, response => {
  if (response && response.rating !== undefined) {
    displaySmiley(response.rating);
  }
});

function displaySmiley(rating) {
  const smiley = document.createElement('div');
  smiley.className = `smilefjes-rating rating-${rating}`;
  smiley.textContent = getSmileyFace(rating);
  document.body.appendChild(smiley);
}

function getSmileyFace(rating) {
  switch(rating) {
    case 0:
    case 1:
      return '😃';  // Stort smil
    case 2:
      return '😐';  // Strekmunn
    case 3:
      return '☹️';  // Sur munn
    case 4:
      return '❓';  // Ikke aktuelt
    case 5:
      return '❔';  // Ikke vurdert
    default:
      return '❓';
  }
}
