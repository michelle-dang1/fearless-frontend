window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/states/';
  
    const response = await fetch(url);
  
    if (response.ok) {
      const data = await response.json();
  
      const selectTag = document.getElementById('state');
      for (let state of data.states) {
        // Create an 'option' element
        let option = document.createElement("option");
        // Use Object.values() since data.states is state dictionary
        option.value = Object.values(state);
        option.innerHTML = Object.keys(state);
        selectTag.appendChild(option);
      }
    }

    const formTag = document.getElementById('create-location-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        console.log(json);
        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        // reset method 
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newLocation = await response.json();
        }
        
    });
  });
