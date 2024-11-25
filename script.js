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
    const shopIframe = document.getElementById('shop-iframe');

    // Display shops dynamically
    shops.forEach(shop => {
        const el = document.createElement('div');

        const ela = document.createElement('a');
        ela.innerHTML = `<strong>${shop.name}</strong> - `;
        ela.innerHTML = ela.innerHTML + shop.country;
        ela.href = '#'
        ela.addEventListener('click', (e) => {
            const apiKey = 'ba1959eddd01d82b1d7796e3aa62aabd';
            const url = shop.link;

            // Construct the LinkPreview API request URL
            const requestUrl = `https://api.linkpreview.net/?key=${apiKey}&q=${encodeURIComponent(url)}`;

            // Fetch the preview data
            fetch(requestUrl)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('preview-title').innerText = data.title || shop.name;
                    document.getElementById('preview-description').innerText = data.description || '';
                    document.getElementById('preview-image').src = data.image;
                })
                .catch(error => {
                    document.getElementById('preview-title').innerText = shop.name;
                    document.getElementById('preview-description').innerText = 'unable to load preview :(';
                    document.getElementById('preview-image').removeAttribute('src');
                    console.error('Error fetching preview:', error);
                });

            document.getElementById('preview-address').innerHTML = shop.address
            document.getElementById('button-container').innerHTML = `<a href="${url}" style="display: inline-block; text-decoration: none; background-color: #007bff; color: white; padding: 10px 20px; border-radius: 5px; text-align: center;">Go to Shop</a>`
        })
        el.appendChild(ela)
        container.appendChild(el);
    });
})
.catch(error => console.error('Error fetching shops.json:', error));