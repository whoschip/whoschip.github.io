let currentPage = 'home';
const toggleBtn = document.getElementById('toggle-style-btn');
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Update navigation
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('onclick') === `showPage('${pageId}')`) {
                    link.classList.add('active');
                }
            });
            
            currentPage = pageId;
            
            // Move footer to the active page
            const footer = document.getElementById('footer');
            const activePage = document.getElementById(pageId);
            activePage.appendChild(footer);
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Initialize footer position
        window.addEventListener('DOMContentLoaded', () => {
            const footer = document.getElementById('footer');
            const homePage = document.getElementById('home');
            homePage.appendChild(footer);
        });
