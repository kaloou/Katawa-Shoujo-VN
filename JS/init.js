const DEBUG = true;

document.addEventListener('DOMContentLoaded', function () {
	initGame();
	if(DEBUG) {
		initTestButtons();
	}
});

function initGame() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'PHP/init.php', true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			let response = xhr.responseText;
			console.log('✅ init.php -> Session initialisée : ', response); // to fix -> no response
		} else if (xhr.readyState === 4 && xhr.status !== 200) {
			console.error("❌init.php -> Erreur lors de l'appel AJAX : " + xhr.statusText);
		}
	};
	xhr.send();
}

// ==================== DEBUG TEST DE SESSION ===================
function getSession() {
	console.log('=== TEST DE SESSION ===');
	fetch('PHP/get_session.php')
		.then(response => response.json())
		.then(data => {
			console.log('=== DONNÉES DE SESSION ===');
			console.log(JSON.stringify(data, null, 2));
			console.log('========================');
			
			// Vérifier si la session est vide
			if (Object.keys(data).length === 0) {
				console.warn('⚠️ SESSION VIDE - Aucune donnée de session trouvée');
			} else {
				console.log('✅ Session active avec', Object.keys(data).length, 'propriétés');
			}
		})
		.catch(error => {
			console.error('❌ Erreur lors de la récupération de la session:', error);
		});
}

function destroySession() {
	if (confirm('Êtes-vous sûr de vouloir détruire la session ?')) {
		console.log('=== DESTRUCTION DE SESSION ===');
		fetch('PHP/destroy_session.php')
			.then(response => response.json())
			.then(data => {
				console.log('=== SESSION DELETE ===');
				console.log(JSON.stringify(data, null, 2));
				console.log('=============================');
				console.log('✅ Session DELETE avec succès');
			})
			.catch(error => {
				console.error('❌ Erreur lors de la destruction de la session:', error);
			});
	}
}

function initSession() {
	console.log('=== INITIALISATION MANUELLE DE SESSION ===');
	fetch('PHP/init_session.php')
		.then(response => response.text())
		.then(data => {
			console.log('✅ Session initialisée manuellement');
		})
		.catch(error => {
			console.error('❌ Erreur lors de l\'initialisation:', error);
		});
}

function initTestButtons() {
    // --- 1️⃣ Injection du HTML dans le body ---
    const html = `
		<div id="session_buttons_container" style="
			position: fixed;
			top: 20px;
			right: 20px;
			z-index: 1000;
			display: flex;
			gap: 10px;
		">
			<button id="test_session_btn" style="
				background: #ff6b6b;
				color: white;
				border: none;
				padding: 10px 15px;
				border-radius: 6px;
				font-size: 14px;
				font-weight: bold;
				cursor: pointer;
				box-shadow: 0 2px 6px rgba(0,0,0,0.3);
			">Test Session</button>
			<button id="reset_session_btn" style="
				background: #ff4757;
				color: white;
				border: none;
				padding: 10px 15px;
				border-radius: 6px;
				font-size: 14px;
				font-weight: bold;
				cursor: pointer;
				box-shadow: 0 2px 6px rgba(0,0,0,0.3);
			">Reset Session</button>
		</div>
	`;

    // Vérifie si le conteneur n’existe pas déjà pour éviter les doublons
    if (!document.getElementById('session_buttons_container')) {
        document.body.insertAdjacentHTML('beforeend', html);
        console.log('✅ Boutons de test ajoutés au DOM');
    }

    // --- 2️⃣ Attachement des événements ---
    const testBtn = document.getElementById('test_session_btn');
    if (testBtn) {
        testBtn.addEventListener('click', getSession);
        console.log('✅ Bouton Test Session initialisé');
    } else {
        console.warn('⚠️ Bouton test_session_btn non trouvé');
    }

    const resetBtn = document.getElementById('reset_session_btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', destroySession);
        console.log('✅ Bouton Reset Session initialisé');
    } else {
        console.warn('⚠️ Bouton reset_session_btn non trouvé');
    }

    // --- 3️⃣ Optionnel : Test auto si DEBUG actif ---
    if (typeof DEBUG !== 'undefined' && DEBUG) {
        setTimeout(() => {
            console.log('🔍 MODE DEBUG ACTIVÉ — Test automatique de session...');
            getSession();
        }, 1000);
    }
}

// ==================== PLEIN ÉCRAN ===================

	document.addEventListener("keydown", (event) => {
		if (event.key.toLowerCase() === "f") {
			if (!document.fullscreenElement) {
				// Plein écran sur tout le document
				document.documentElement.requestFullscreen();
			} else {
				document.exitFullscreen();
			}
		}
	});
	// later on add a button to toggle the fullscreen mode (will be in parameters menu)
	// like that also phones can use the fullscreen mode

	