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

//============= Preload image functions =============
function preloadImage(path, onDone) {
    const img = new Image();
    img.onload = () => onDone?.(img);
    img.onerror = () => onDone?.(null);
    img.src = path;
}

function preloadImagesGame() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let responseText = xhr.responseText;

                try {
                    let data = JSON.parse(responseText);

                    if (data.images && data.images.length > 0) {
                        data.images.forEach((image) => {
                            const fullPath = 'assets/internHD/' + image.image_name;

                            preloadImage(fullPath, (img) => {
                                if (img) {
                                    console.log('Image préchargée:', image.image_name);
                                } else {
                                    console.error('Erreur de chargement:', image.image_name);
                                }
                            });
                        });
                    } else {
                        console.log('Aucune image trouvée.');
                    }

                } catch (error) {
                    console.error('Erreur lors du parsing JSON:', error, '\nRéponse reçue:', responseText);
                }

            } else {
                console.error('Erreur XHR preloadImagesGame:', xhr.status);
            }
        }
    };

    xhr.open('GET', 'PHP/image_preloader.php', true);
    xhr.send();
}

