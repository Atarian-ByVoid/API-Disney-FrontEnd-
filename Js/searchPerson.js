let charactersData = [];

function fetchCharacters() {
  let searchInput = document.getElementById('searchInput');
  let searchTerm = searchInput.value.toLowerCase();

  let url = 'https://api.disneyapi.dev/character';
  let page = 1;
  let pageSize = 10000;

  fetchCharactersPage(url, page, pageSize, searchTerm);
}

function fetchCharactersPage(url, page, pageSize, searchTerm) {
  let queryParams = `?page=${page}&pageSize=${pageSize}`;

  fetch(url + queryParams)
    .then(response => response.json())
    .then(data => {
      charactersData = charactersData.concat(data.data);

      if (data.nextPage) {
        fetchCharactersPage(url, data.nextPage, pageSize, searchTerm);
      } else {
        filterCharacter(searchTerm);
      }
    })
    .catch(error => {
      console.log('Error fetching characters:', error);
    });
}

function filterCharacter(searchTerm) {
  let filteredCharacters = charactersData.filter(character => {
    let characterName = character.name.toLowerCase();
    return characterName.includes(searchTerm);
  });

  renderCharacter(filteredCharacters);
}

function renderCharacter(characters) {
  let characterContainer = document.getElementById('character');
  characterContainer.innerHTML = '';

  if (characters.length > 0) {
    characters.forEach(character => {
      let characterName = character.name;
      let characterImage = character.imageUrl;

      let characterElement = document.createElement('div');
      characterElement.className = 'character';

      let nameElement = document.createElement('h2');
      nameElement.textContent = characterName;

      let imageElement = document.createElement('img');
      imageElement.src = characterImage;

      characterElement.appendChild(nameElement);
      characterElement.appendChild(imageElement);

      characterContainer.appendChild(characterElement);
    });
  } else {
    characterContainer.textContent = 'No characters found.';
  }
}

document.getElementById('searchButton').addEventListener('click', fetchCharacters);
