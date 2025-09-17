function loadGallery() {
    const galleryElement = document.getElementById('gallery');
    if (!galleryElement) return;

    const imagePaths = [
        'assets/gallery/wow.png',
        'assets/gallery/zazu.png',
        'assets/gallery/alenzu.png',
        "assets/gallery/toto.png",
    ];

    // Set gallery as grid container
    galleryElement.style.display = 'grid';
    galleryElement.style.gridGap = '5px';

    imagePaths.forEach(path => {
        const item = document.createElement('div');
        item.className = 'gallery-item glass';
        
        const img = document.createElement('img');
        img.src = path;
        img.alt = 'Gallery Image';
        img.loading = 'lazy';
        
        item.appendChild(img);
        galleryElement.appendChild(item);

        item.addEventListener('click', () => {
            window.open(path, '_blank');
        });
    });
}

document.addEventListener('DOMContentLoaded', loadGallery);