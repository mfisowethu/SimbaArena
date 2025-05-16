// DOM Elements
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const authModal = document.getElementById('authModal');
const closeModal = document.querySelector('.close-modal');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Toggle mobile menu
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Auth modal functionality
loginBtn.addEventListener('click', () => {
    authModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

registerBtn.addEventListener('click', () => {
    authModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // Switch to register tab
    tabBtns[1].click();
});

closeModal.addEventListener('click', () => {
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Tab switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Update active tab button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active tab content
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    });
});

// Load latest forum posts
async function loadLatestPosts() {
    try {
        const response = await fetch('/api/forums/latest');
        const posts = await response.json();
        
        const postsContainer = document.querySelector('.posts-container');
        postsContainer.innerHTML = '';
        
        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'post-card';
            postCard.innerHTML = `
                <img src="${post.image || 'images/default-post.jpg'}" alt="${post.title}" class="post-image">
                <div class="post-content">
                    <h3 class="post-title">${post.title}</h3>
                    <div class="post-meta">
                        <span>by ${post.author.username}</span>
                        <span>${new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <a href="forums.html?post=${post._id}" class="post-link">Read More</a>
                </div>
            `;
            postsContainer.appendChild(postCard);
        });
    } catch (err) {
        console.error('Failed to load posts:', err);
    }
}

// Load latest game deals
async function loadLatestDeals() {
    try {
        const response = await fetch('/api/deals/latest');
        const deals = await response.json();
        
        const dealsContainer = document.querySelector('.deals-container');
        dealsContainer.innerHTML = '';
        
        deals.forEach(deal => {
            const dealCard = document.createElement('div');
            dealCard.className = 'deal-card';
            dealCard.innerHTML = `
                <img src="${deal.image || 'images/default-game.jpg'}" alt="${deal.title}" class="deal-image">
                <div class="deal-content">
                    <h3 class="deal-title">${deal.title}</h3>
                    <div class="deal-meta">
                        <span>${deal.platform}</span>
                        <span class="deal-price">$${deal.price}</span>
                    </div>
                    <p class="deal-description">${deal.description.substring(0, 100)}...</p>
                    <a href="${deal.link}" target="_blank" class="deal-link">Get Deal</a>
                </div>
            `;
            dealsContainer.appendChild(dealCard);
        });
    } catch (err) {
        console.error('Failed to load deals:', err);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadLatestPosts();
    loadLatestDeals();
});