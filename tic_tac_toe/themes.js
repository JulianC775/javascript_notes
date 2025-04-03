// Theme Selector Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const themeToggle = document.getElementById('theme-toggle');
    const themeMenu = document.querySelector('.theme-menu');
    const closeThemeMenu = document.getElementById('close-theme-menu');
    const overlay = document.querySelector('.overlay');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Set a default theme
    const currentTheme = localStorage.getItem('selectedTheme') || 'default';
    setTheme(currentTheme);
    
    // Toggle theme menu visibility
    themeToggle.addEventListener('click', () => {
        themeMenu.classList.add('active');
        overlay.classList.add('active');
        
        // Highlight current theme
        themeOptions.forEach(option => {
            if (option.dataset.theme === currentTheme) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    });
    
    // Close theme menu
    closeThemeMenu.addEventListener('click', () => {
        themeMenu.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Close menu when overlay is clicked
    overlay.addEventListener('click', () => {
        themeMenu.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedTheme = option.dataset.theme;
            
            // Apply visual selection
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Apply theme after a short delay for better UX
            setTimeout(() => {
                setTheme(selectedTheme);
                localStorage.setItem('selectedTheme', selectedTheme);
                
                // Add transition effect to game boards
                addTransitionEffect();
                
                // Close menu after selection with a slight delay
                setTimeout(() => {
                    themeMenu.classList.remove('active');
                    overlay.classList.remove('active');
                }, 300);
            }, 100);
        });
    });
    
    /**
     * Sets the theme by applying the appropriate class to the body
     * @param {string} theme - The theme name to apply
     */
    function setTheme(theme) {
        // Remove all theme classes
        document.body.classList.remove(
            'default-theme',
            'neon-theme',
            'retro-theme',
            'pastel-theme',
            'dark-theme',
            'candy-theme'
        );
        
        // Apply selected theme
        if (theme !== 'default') {
            document.body.classList.add(`${theme}-theme`);
        }
        
        // Update button icon color based on theme
        updateThemeButtonAppearance(theme);
    }
    
    /**
     * Updates theme button appearance based on active theme
     * @param {string} theme - Current theme name
     */
    function updateThemeButtonAppearance(theme) {
        // Adjust button appearance based on theme
        if (theme === 'pastel-theme' || theme === 'candy-theme') {
            themeToggle.style.color = '#6c567b';
        } else {
            themeToggle.style.color = '';
        }
        
        // Change button background color based on theme
        switch (theme) {
            case 'neon-theme':
                themeToggle.style.backgroundColor = '#00f7ff';
                break;
            case 'retro-theme':
                themeToggle.style.backgroundColor = '#f9a11b';
                break;
            case 'pastel-theme':
                themeToggle.style.backgroundColor = '#77c3ec';
                break;
            case 'dark-theme':
                themeToggle.style.backgroundColor = '#ff4757';
                break;
            case 'candy-theme':
                themeToggle.style.backgroundColor = '#fd79a8';
                break;
            default:
                themeToggle.style.backgroundColor = '';
                break;
        }
    }
    
    /**
     * Adds transition effect to game boards when changing themes
     */
    function addTransitionEffect() {
        const gameBoards = document.querySelectorAll('.game-board');
        
        gameBoards.forEach(board => {
            // Add animation class
            board.classList.add('theme-transition');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                board.classList.remove('theme-transition');
            }, 500);
        });
    }
}); 