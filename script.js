// Ce script gère la soumission du formulaire Quick Buy et l'envoi des données à Firebase.
// Il nécessite que l'objet 'db' soit initialisé dans index.html (Étape 2).

document.getElementById('quickBuyForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la page de se recharger
    
    // Récupérer les éléments pour afficher les messages
    const messageElement = document.getElementById('message');
    messageElement.className = ''; // Réinitialiser le style
    messageElement.textContent = 'Envoi de la commande...';

    // 1. Collecter les données du formulaire
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const plan = document.getElementById('plan').value;

    // 2. Créer l'objet de la commande
    const orderData = {
        name: fullName,
        phone: phone,
        address: address,
        plan: plan,
        status: "Pending", // Statut initial de la commande
        // Utilise la fonction Firebase pour horodater la commande
        timestamp: firebase.firestore.FieldValue.serverTimestamp() 
    };

    // 3. Envoyer les données à la base de données Firestore
    // La collection sera nommée 'quick_orders'
    db.collection("quick_orders").add(orderData)
        .then((docRef) => {
            // Succès
            messageElement.className = 'success';
            messageElement.textContent = "Commande soumise avec succès ! ID: " + docRef.id;
            document.getElementById('quickBuyForm').reset(); // Vider le formulaire
        })
        .catch((error) => {
            // Erreur
            messageElement.className = 'error';
            messageElement.textContent = "Erreur lors de la soumission. Vérifiez votre connexion et votre configuration Firebase.";
            console.error("Erreur Firebase lors de l'envoi : ", error);
        });
});
