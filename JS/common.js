export function $(elem) {
    var type = typeof elem;
    if (type == 'string') {
        return document.getElementById(elem);
    }
    return elem;
}
export function hide(elem) {
	elem.style.display = 'none';
}

export function showFlex(elem) {
	elem.style.display = 'flex';
}

export function showBlock(elem) {
	elem.style.display = 'block';
}

export function blur(elem) {
    elem.style.filter = 'blur(5px)';
}

export function deblur(elem) {
	elem.style.filter = 'none';
}

export function toggle(elem, display = "block") {
    if (elem.style.display === "none") {
        elem.style.display = display;
    } else {
        elem.style.display = "none";
    }
}

//============= Preload image function =============
export function preloadImages() {
    // preload les images de la séquence actuelle
    fetch('PHP/image_preloader.php')
        .then((response) => response.json())
        .then((data) => {
            if (data.images && data.images.length > 0) {
                data.images.forEach((image) => {
                    const img = new Image(); // creer une image pour chaque nom trouvé
                    img.src = 'assets/internHD/' + image.image_name;
                    img.onload = function () {
                        console.log('Image préchargée:', image.image_name);
                    };
                });
            } else {
                console.log('Aucune image trouvée.');
            }
        })
        .catch((error) => {
            console.error('Erreur lors du préchargement des images:', error);
        });
}