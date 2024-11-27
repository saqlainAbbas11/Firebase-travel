// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7UICUX8gs2ZA8z7Xcc0hmv7zzgMWmogE",
    authDomain: "travel-tour-e2571.firebaseapp.com",
    projectId: "travel-tour-e2571",
    storageBucket: "travel-tour-e2571.firebasestorage.app",
    messagingSenderId: "565419208611",
    appId: "1:565419208611:web:585a5103264d8c950a7416"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const authSection = document.getElementById("authSection");
const travelSection = document.getElementById("travelSection");
const travelList = document.getElementById("travelList");
const authForm = document.getElementById("authForm");
const toggleForm = document.getElementById("toggleForm");
const formTitle = document.getElementById("formTitle");
const authBtn = document.getElementById("authBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

let isLogin = true;

// Toggle between Login and Signup
toggleForm.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Login" : "Sign Up";
  authBtn.textContent = isLogin ? "Login" : "Sign Up";
  toggleForm.textContent = isLogin ? "Don't have an account? Sign up" : "Already have an account? Login";
});

// Handle Login/Signup Form Submission
authForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    if (isLogin) {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
    }
  } catch (error) {
    alert('Login failed',error.message);
  }
});

// Handle Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth);
});

// Listen to Authentication State
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
    authSection.style.display = "none";
    travelSection.style.display = "block";
    loadTravelCollection();
  } else {
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
    authSection.style.display = "block";
    travelSection.style.display = "none";
  }
});

// Load Travel Collection
async function loadTravelCollection() {
  travelList.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "travel"));
  querySnapshot.forEach((doc) => {
    const travel = doc.data();
    const travelCard = `
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${travel.name}</h5>
            <p class="card-text">${travel.description}</p>
          </div>
        </div>
      </div>
    `;
    travelList.innerHTML += travelCard;
  });
}
