function createCard(name, description, pictureUrl, startDate, endDate, location) {
    return `
    <div class="col-sm-6 col-md-4 mb-1">
    <div class="card shadow p-3 mb-5 bg-body rounded">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${location}</h6> 
            <p class="card-text">${description}</p>
        <div class="card-footer">
            ${startDate} - ${endDate}
        </div>
        </div>
    </div>
  </div>
    `;
}

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';
  
    try {
      const response = await fetch(url);
  
        if (!response.ok) {
            // Figure out what to do when the response is bad
            alert('Bad response')

        } else {
            const data = await response.json();

            for (let conference of data.conferences) {
            const detailUrl = `http://localhost:8000${conference.href}`;
            const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok) {
                const details = await detailResponse.json();
                const title = details.conference.name;
                const description = details.conference.description;
                const pictureUrl = details.conference.location.picture_url;
                const startDate = new Date(details.conference.starts).toLocaleDateString();
                const endDate = new Date(details.conference.ends).toLocaleDateString();
                const location = details.conference.location.name;
                const html = createCard(title, description, pictureUrl, startDate, endDate, location);
                const column = document.querySelector('.row');
                column.innerHTML += html;
            }
            }

        }
    } catch (e) {
      // Figure out what to do if an error is raised
      console.error(e)
    }
  
  });
  
