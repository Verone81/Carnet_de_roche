let toutesLesPierres = []; // Variable globale pour stocker les pierres

fetch('pierres.json')
  .then(response => response.json())
  .then(data => {
    toutesLesPierres = data.pierres; // On garde toutes les pierres ici
    afficherPierres(toutesLesPierres); // Afficher toutes les pierres au début
  })
  .catch(error => console.error('Erreur lors du chargement des données :', error));

// Fonction pour afficher des pierres
function afficherPierres(pierres) {
  const pierresContainer = document.getElementById('pierres-container');
  pierresContainer.innerHTML = ''; // Vide avant de réafficher

  pierres.forEach(pierre => {
    const pierreCard = document.createElement('div');
    pierreCard.classList.add('pierre-card');

    const image = document.createElement('img');
    image.src = pierre.image;
    pierreCard.appendChild(image);

    const content = document.createElement('div');
    content.classList.add('content');

    const title = document.createElement('h3');
    title.textContent = pierre.nom;
    content.appendChild(title);

    const description = document.createElement('p');
    description.textContent = pierre.description;
    content.appendChild(description);

    if (pierre.decouverte) {
      const decouverte = pierre.decouverte;

      // Anecdote
      if (decouverte.anecdote) {
        const anecdote = document.createElement('p');
        anecdote.innerHTML = `<strong>Anecdote :</strong> ${decouverte.anecdote}`;
        content.appendChild(anecdote);
      }

      // Observations
      if (decouverte.observations) {
        const observations = decouverte.observations;
        const obsList = document.createElement('ul');
        obsList.innerHTML = `
          <li><strong>Couleur :</strong> ${observations.couleur}</li>
          <li><strong>Texture :</strong> ${observations.texture}</li>
          <li><strong>Brillance :</strong> ${observations.brillance}</li>
          <li><strong>Poids :</strong> ${observations.poids}</li>
        `;
        content.appendChild(obsList);
      }

      // Remarques
      if (decouverte.remarques) {
        const remarque = document.createElement('p');
        remarque.innerHTML = `<em>Remarque :</em> ${decouverte.remarques}`;
        content.appendChild(remarque);
      }
    }

    pierreCard.appendChild(content);
    pierresContainer.appendChild(pierreCard);
  });
}

// Écouteur pour la recherche
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  
  searchInput.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const pierresFiltrees = toutesLesPierres.filter(pierre =>
      pierre.nom.toLowerCase().includes(query)
    );
    afficherPierres(pierresFiltrees); // Réafficher selon la recherche
  });
});

