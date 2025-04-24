fetch('pierres.json')
  .then(response => response.json())
  .then(data => {
    const pierresContainer = document.getElementById('pierres-container');

    data.pierres.forEach(pierre => {
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
  })
  .catch(error => console.error('Erreur lors du chargement des données :', error));
