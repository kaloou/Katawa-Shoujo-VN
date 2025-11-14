function updateSeqid(newSeqid) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "DEBUG/update_seqid.php", true); // Le script PHP qui met à jour la session

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var params = "seqid=" + encodeURIComponent(newSeqid);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Réponse du serveur si nécessaire
            console.log(xhr.responseText);
        }
    };

    xhr.send(params); // Envoie de la requêt
}