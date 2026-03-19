// Logic for handling template switching

document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme-select');
    const resumeDocument = document.getElementById('resume-document');
    const styleLink = document.getElementById('template-css');

    themeSelect.addEventListener('change', (e) => {
        const selectedTheme = e.target.value;

        // 1. Update the CSS Link
        styleLink.href = `css/template-${selectedTheme}.css`;

        // 2. Update the document classes
        // Remove all previous theme classes
        resumeDocument.className = 'resume-document';
        // Add new theme class
        resumeDocument.classList.add(`${selectedTheme}-theme`);

        console.log(`Switched to ${selectedTheme} theme`);
    });
});
