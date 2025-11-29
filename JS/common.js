function $(elem) {
	var type = typeof elem;
	if (type == 'string') {
		return document.getElementById(elem);
	}
	return elem;
}
function hide(elem) {
	elem.style.display = 'none';
}

function showFlex(elem) {
	elem.style.display = 'flex';
}

function showBlock(elem) {
	elem.style.display = 'block';
}

function isDisplay(elem) {
	return elem.style.display === 'flex' || elem.style.display === 'block';
}

function isNotDisplay(elem) {
	return elem.style.display === 'none';
}

function blur(elem) {
	elem.style.filter = 'blur(5px)';
}

function noFilter(elem) {
	elem.style.filter = 'none';
}

function toggle(elem, display = 'block') {
	if (elem.style.display === 'none') {
		elem.style.display = display;
	} else {
		elem.style.display = 'none';
	}
}

//============= Preload image function =============
function preloadImages() {
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
