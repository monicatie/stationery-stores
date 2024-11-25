fetch('shops.json')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
})
.then(data => {
    const shops = data;
    const container = document.getElementById('shops-list');

    // Display shops dynamically
    shops.forEach(shop => {

        /* Lists out the shops */
        const ela = document.createElement('a');
        ela.innerHTML = `<strong>${shop.name}</strong> - `;
        ela.innerHTML = ela.innerHTML + shop.country;
        ela.href = '#'
        ela.addEventListener('click', () => {
            /* Create a Preview for the shop */

            const apiKey = 'ba1959eddd01d82b1d7796e3aa62aabd';
            const url = shop.link;
            const requestUrl = `https://api.linkpreview.net/?key=${apiKey}&q=${encodeURIComponent(url)}`;

            // Fetch the preview data from linkpreview
            fetch(requestUrl)
                .then(response => response.json())
                .then(data => {
                    // Set the title, description and image
                    document.getElementById('preview-title').innerText = data.title || shop.name;
                    document.getElementById('preview-description').innerText = data.description || '';
                    document.getElementById('preview-image').src = data.image;
                })
                .catch(error => {
                    // Set default title, description and clear previous image
                    document.getElementById('preview-title').innerText = shop.name;
                    document.getElementById('preview-description').innerText = 'unable to load preview :(';
                    document.getElementById('preview-image').removeAttribute('src');
                    console.error('Error fetching preview:', error);
                });

            // Display shop address
            document.getElementById('preview-address').innerHTML = shop.address

            // Display button to go to shop
            document.getElementById('button-container').innerHTML = `<a href="${url}" style="display: inline-block; text-decoration: none; background-color: #007bff; color: white; padding: 10px 20px; border-radius: 5px; text-align: center;">Go to Shop</a>`
        })

        // Adds shop list to the page
        const el = document.createElement('div');
        el.appendChild(ela)
        container.appendChild(el);
    });
})
.catch(error => console.error('Error fetching shops.json:', error));