// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Generate Hizb buttons
const hizbsContainer = document.querySelector('#hizb-selection .hizbs');
for (let i = 1; i <= 60; i++) {
    const button = document.createElement('button');
    button.textContent = `Hizb ${i}`;
    button.addEventListener('click', () => selectHizb(i, button));
    hizbsContainer.appendChild(button);
}

// Select Hizb and store selection in Firebase
function selectHizb(hizbNumber, button) {
    db.collection('selectedHizbs').doc(`hizb${hizbNumber}`).get().then(doc => {
        if (!doc.exists) {
            db.collection('selectedHizbs').doc(`hizb${hizbNumber}`).set({ selected: true });
            button.classList.add('selected');
            displaySelectedHizb(hizbNumber);
        } else {
            alert('This Hizb has already been selected by another user.');
        }
    });
}

// Display selected Hizb
function displaySelectedHizb(hizbNumber) {
    const selectedHizbsList = document.getElementById('selected-hizbs-list');
    const listItem = document.createElement('li');
    listItem.textContent = `Hizb ${hizbNumber}`;
    selectedHizbsList.appendChild(listItem);
}
