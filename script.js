const categories = ['Programming', 'Misc', 'Dark', 'Pun', 'Spooky', 'Christmas'];
let selectedCategory = 'Any';

function initializeCategories() {
    const categoriesContainer = document.getElementById('categories');
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.textContent = category;
        btn.onclick = () => selectCategory(category);
        categoriesContainer.appendChild(btn);
    });
}

function selectCategory(category) {
    selectedCategory = category;
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === category) {
            btn.classList.add('active');
        }
    });
    getJoke();
}

async function getJoke() {
    const jokeText = document.getElementById('jokeText');
    const loading = document.getElementById('loading');
    
    try {
        loading.style.display = 'block';
        jokeText.style.opacity = '0.5';
        
        const response = await fetch(`https://v2.jokeapi.dev/joke/${selectedCategory}?safe-mode`);
        const data = await response.json();
        
        let joke = '';
        if (data.type === 'single') {
            joke = data.joke;
        } else {
            joke = `${data.setup}\n\n${data.delivery}`;
        }
        
        jokeText.textContent = joke;
        jokeText.style.opacity = '1';
    } catch (error) {
        jokeText.textContent = 'Oops! Failed to fetch joke. Please try again.';
    } finally {
        loading.style.display = 'none';
    }
}

async function shareJoke() {
    const jokeText = document.getElementById('jokeText').textContent;
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Funny Joke',
                text: jokeText,
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(jokeText);
        alert('Joke copied to clipboard!');
    }
}

// Initialize categories when page loads
window.onload = initializeCategories;