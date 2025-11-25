// Scroll shadow
const contentRight = document.querySelector('.content-right');

if (contentRight) {
    // Force show bottom shadow for testing
    contentRight.classList.add('has-more-content');
    
    contentRight.addEventListener('scroll', () => {
        console.log('scrollHeight:', contentRight.scrollHeight);
        console.log('scrollTop:', contentRight.scrollTop);
        console.log('clientHeight:', contentRight.clientHeight);
        console.log('Can scroll more?', contentRight.scrollHeight - contentRight.scrollTop > contentRight.clientHeight + 50);
        
        // Top shadow
        if (contentRight.scrollTop > 50) {
            contentRight.classList.add('scrolled');
        } else {
            contentRight.classList.remove('scrolled');
        }
        
        // Bottom shadow
        const isAtBottom = contentRight.scrollHeight - contentRight.scrollTop <= contentRight.clientHeight + 50;
        if (!isAtBottom) {
            contentRight.classList.add('has-more-content');
        } else {
            contentRight.classList.remove('has-more-content');
        }
    });
}

const pageContents = document.querySelectorAll('.page-content');

pageContents.forEach(pageContent => {
    pageContent.addEventListener('scroll', () => {
        if (pageContent.scrollTop > 50) {
            pageContent.classList.add('scrolled');
        } else {
            pageContent.classList.remove('scrolled');
        }
        
        const isAtBottom = pageContent.scrollHeight - pageContent.scrollTop <= pageContent.clientHeight + 50;
        if (!isAtBottom) {
            pageContent.classList.add('has-more-content');
        } else {
            pageContent.classList.remove('has-more-content');
        }
    });
    
    // Initial check for bottom shadow
    const isAtBottom = pageContent.scrollHeight - pageContent.scrollTop <= pageContent.clientHeight + 50;
    if (!isAtBottom) {
        pageContent.classList.add('has-more-content');
    }
});

// Chapter and page navigation
const pages = document.querySelectorAll('.project-page');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const chapterNumber = document.getElementById('chapter-number');
const totalChapters = document.getElementById('total-chapters');
const chapterDropdown = document.getElementById('chapter-dropdown');
const pageNumber = document.getElementById('page-number');
const totalPages = document.getElementById('total-pages');
const pageDropdown = document.getElementById('page-dropdown');

if (pages.length > 0 && prevBtn && nextBtn) {
    let currentChapter = 0;
    let currentPage = 0;
    
    // Calculate chapter structure
    const chapters = [];
    pages.forEach(page => {
        const chapter = parseInt(page.dataset.chapter);
        const pageNum = parseInt(page.dataset.page);
        
        if (!chapters[chapter]) {
            chapters[chapter] = [];
        }
        chapters[chapter].push(page);
    });
    
    function updatePageDropdown() {
        const pagesInChapter = chapters[currentChapter];
        pageDropdown.innerHTML = '';
        
        pagesInChapter.forEach((page, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = page.querySelector('h1, h2').textContent;
            pageDropdown.appendChild(option);
        });
        
        totalPages.textContent = pagesInChapter.length;
    }
    
    function showPage(chapter, page) {
    // Hide all pages
    pages.forEach(p => p.classList.remove('active'));
    
    // Show current page
    const targetPage = chapters[chapter][page];
    targetPage.classList.add('active');
    
    // Update UI
    currentChapter = chapter;
    currentPage = page;
    
    chapterNumber.textContent = chapter + 1;
    chapterDropdown.value = chapter;
    
    updatePageDropdown();
    
    pageNumber.textContent = page + 1;
    pageDropdown.value = page;

    const isFirstPage = chapter === 0 && page === 0;
    const isLastPage = chapter === chapters.length - 1 && page === chapters[chapter].length - 1;
    
    prevBtn.disabled = isFirstPage;
    nextBtn.disabled = isLastPage;
    
    window.scrollTo(0, 0);

    localStorage.setItem('currentChapter', chapter);
    localStorage.setItem('currentPage', page);
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            showPage(currentChapter, currentPage - 1);
        } else if (currentChapter > 0) {
            const prevChapter = currentChapter - 1;
            const lastPageInPrevChapter = chapters[prevChapter].length - 1;
            showPage(prevChapter, lastPageInPrevChapter);
        }
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
        if (currentPage < chapters[currentChapter].length - 1) {
            showPage(currentChapter, currentPage + 1);
        } else if (currentChapter < chapters.length - 1) {
            showPage(currentChapter + 1, 0);
        }
    });
    
    // Chapter dropdown
    chapterDropdown.addEventListener('change', (e) => {
        showPage(parseInt(e.target.value), 0);
    });
    
    // Page dropdown
    pageDropdown.addEventListener('change', (e) => {
        showPage(currentChapter, parseInt(e.target.value));
    });
    
    // Initialize
    totalChapters.textContent = chapters.length;

    const savedChapter = localStorage.getItem('currentChapter');

    const savedPage = localStorage.getItem('currentPage');

    if (savedChapter !== null && savedPage !== null) {
        const chapter = parseInt(savedChapter);
        const page = parseInt(savedPage);

        if (chapters[chapter] && chapters[chapter][page]) {
            showPage(chapter, page);
        } else {
            showPage(0, 0);
        }
    } else {
    showPage(0, 0);
    }

}


// Smooth Exit Animation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetUrl = link.getAttribute('href');
        
        const contentElements = document.querySelectorAll('.content, .content-right, .content-left');
        
        if (contentElements.length > 0) {
            contentElements.forEach(el => el.classList.add('exit'));
            
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500);
        } else {
            window.location.href = targetUrl;
        }
    });
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetUrl = link.getAttribute('href');
        
        document.body.classList.add('transitioning');
        const contentElements = document.querySelectorAll('.content, .content-right, .content-left');
        
        if (contentElements.length > 0) {
            contentElements.forEach(el => el.classList.add('exit'));
            
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500);
        } else {
            window.location.href = targetUrl;
        }
    });
});

// Tooltip functionality
const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');

tooltipTriggers.forEach(trigger => {
    const tooltipId = trigger.getAttribute('data-tooltip');
    const tooltipBox = document.getElementById(tooltipId);
    
    if (tooltipBox) {
        trigger.addEventListener('mouseenter', () => {
            tooltipBox.classList.add('active');
        });
        
        trigger.addEventListener('mouseleave', () => {
            tooltipBox.classList.remove('active');
        });
    }
});