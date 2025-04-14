// Base URL of the backend API
const BASE_URL = 'http://localhost:5000/api';

// ==============================
// 1️⃣ User Authentication
// ==============================

// Signup Function
async function signup(username, email, password) {
    try {
        const response = await fetch(`${BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        console.log('Signup:', data);
        alert(data.message || 'Signup Successful!');
    } catch (error) {
        console.error('Signup Error:', error);
    }
}

// Login Function
async function login(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token); // Store token for authentication
            console.log('Login Successful:', data);
            alert('Login Successful!');
        } else {
            alert('Login Failed: ' + data.message);
        }
    } catch (error) {
        console.error('Login Error:', error);
    }
}

// Logout Function
function logout() {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
}

// ==============================
// 2️⃣ Movie Management
// ==============================

// Fetch All Movies
async function fetchMovies() {
    try {
        const response = await fetch(`${BASE_URL}/movies`);
        const movies = await response.json();
        console.log('Movies:', movies);
        displayMovies(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Add a New Movie
async function addMovie(title, description, genre, releaseYear, rating) {
    try {
        const response = await fetch(`${BASE_URL}/movies`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ title, description, genre, releaseYear, rating })
        });
        const data = await response.json();
        console.log('Added Movie:', data);
        fetchMovies(); // Refresh movie list
    } catch (error) {
        console.error('Error adding movie:', error);
    }
}

// Update a Movie
async function updateMovie(movieId, newRating) {
    try {
        const response = await fetch(`${BASE_URL}/movies/${movieId}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ rating: newRating })
        });
        const data = await response.json();
        console.log('Updated Movie:', data);
        fetchMovies();
    } catch (error) {
        console.error('Error updating movie:', error);
    }
}

// Delete a Movie
async function deleteMovie(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movies/${movieId}`, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        console.log('Deleted Movie:', data);
        fetchMovies();
    } catch (error) {
        console.error('Error deleting movie:', error);
    }
}

// ==============================
// 3️⃣ Reviews Management
// ==============================

// Fetch Reviews for a Movie
async function fetchReviews(movieTitle) {
    try {
        const response = await fetch(`${BASE_URL}/reviews?movie=${movieTitle}`);
        const reviews = await response.json();
        console.log(`Reviews for ${movieTitle}:`, reviews);
        displayReviews(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

// Add a Review
async function addReview(username, movie, review, rating) {
    try {
        const response = await fetch(`${BASE_URL}/reviews`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ username, movie, review, rating })
        });
        const data = await response.json();
        console.log('Added Review:', data);
        fetchReviews(movie);
    } catch (error) {
        console.error('Error adding review:', error);
    }
}

// ==============================
// 4️⃣ Display Functions (For UI)
// ==============================

// Display Movies in UI
function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies-list');
    if (!moviesContainer) return;

    moviesContainer.innerHTML = ''; // Clear previous movies
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.innerHTML = `
            <h3>${movie.title} (${movie.releaseYear})</h3>
            <p>${movie.description}</p>
            <p>Genre: ${movie.genre} | Rating: ${movie.rating}</p>
            <button onclick="updateMovie('${movie._id}', 9)">Update Rating</button>
            <button onclick="deleteMovie('${movie._id}')">Delete</button>
            <button onclick="fetchReviews('${movie.title}')">View Reviews</button>
        `;
        moviesContainer.appendChild(movieElement);
    });
}

// Display Reviews in UI
function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('reviews-list');
    if (!reviewsContainer) return;

    reviewsContainer.innerHTML = ''; // Clear previous reviews
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.innerHTML = `
            <p><strong>${review.username}:</strong> ${review.review} (Rating: ${review.rating})</p>
        `;
        reviewsContainer.appendChild(reviewElement);
    });
}

// ==============================
// 5️⃣ Event Listeners (For Buttons in HTML)
// ==============================
document.getElementById('fetchMoviesBtn')?.addEventListener('click', fetchMovies);
document.getElementById('signupBtn')?.addEventListener('click', () => {
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    signup(username, email, password);
});
document.getElementById('loginBtn')?.addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    login(email, password);
});
document.getElementById('logoutBtn')?.addEventListener('click', logout);
document.getElementById('addMovieBtn')?.addEventListener('click', () => {
    const title = document.getElementById('movieTitle').value;
    const description = document.getElementById('movieDescription').value;
    const genre = document.getElementById('movieGenre').value;
    const releaseYear = document.getElementById('movieReleaseYear').value;
    const rating = document.getElementById('movieRating').value;
    addMovie(title, description, genre, parseInt(releaseYear), parseFloat(rating));
});
document.getElementById('addReviewBtn')?.addEventListener('click', () => {
    const username = document.getElementById('reviewUsername').value;
    const movie = document.getElementById('reviewMovie').value;
    const review = document.getElementById('reviewText').value;
    const rating = document.getElementById('reviewRating').value;
    addReview(username, movie, review, parseInt(rating));
});
