let currentPage = 1;
let itemsPerPage = 50;
let charactersData = [];

function fetchCharacters(page, pageSize) {
  let url = 'https://api.disneyapi.dev/character';
  let queryParams = '?page=' + page + '&pageSize=' + pageSize;

  fetch(url + queryParams)
    .then(response => response.json())
    .then(data => {
      charactersData = data.data;

      renderCharacters(charactersData);
    })
    .catch(error => {
      console.log('Erro ao obter os personagens:', error);
    });
}

function filterCharacters() {
  let searchInput = document.getElementById('searchInput');
  let searchTerm = searchInput.value.toLowerCase();

  let filteredCharacters = charactersData.filter(character => {
    let characterName = character.name.toLowerCase();
    return characterName.includes(searchTerm);
  });

  renderCharacters(filteredCharacters);
}

function renderCharacters(characters) {
  let charactersContainer = document.getElementById('characters');
  charactersContainer.innerHTML = '';

  characters.forEach(character => {
    let characterName = character.name;
    let characterImage = character.imageUrl;

    let characterElement = document.createElement('div');
    characterElement.className = 'character';

    var nameElement = document.createElement('h2');
    nameElement.textContent = characterName;

    var imageElement = document.createElement('img');
    imageElement.src = characterImage;
    imageElement.classList.add('character-image'); 


    characterElement.appendChild(nameElement);
    characterElement.appendChild(imageElement);

    charactersContainer.appendChild(characterElement);
  });
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage, itemsPerPage);
  }
}

function nextPage() {
  currentPage++;
  fetchCharacters(currentPage, itemsPerPage);
}

document.getElementById('searchInput').addEventListener('input', filterCharacters);

fetchCharacters(currentPage, itemsPerPage);
