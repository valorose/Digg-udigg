const currentDomain = window.location.hostname;

chrome.runtime.sendMessage({action: 'getRating', domain: currentDomain}, response => {
  if (response && response.rating) {
    displaySmiley(response.rating);
  }
});

function displaySmiley(rating) {
  const smiley = document.createElement('div');
  smiley.className = `smilefjes-rating ${rating}`;
  smiley.textContent = getSmileyFace(rating);
  document.body.appendChild(smiley);
}

function getSmileyFace(rating) {
  switch(rating) {
    case 'happy': return '😃';
    case 'medium': return '😐';
    case 'sad': return '☹️';
    default: return '❓';
  }
}
