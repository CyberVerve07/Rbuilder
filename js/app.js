// App State
let zoom = 1;
let expData = [{ title: 'Software Engineer', company: 'Tech Inc', date: '2020 - Present', desc: 'Developed web applications.' }];
let eduData = [{ degree: 'BCA', school: 'ABC University', date: '2016 - 2019' }];
let skillsData = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'];

// Zoom controls
function zoomIn() {
    if (zoom < 2) zoom += 0.1;
    applyZoom();
}

function zoomOut() {
    if (zoom > 0.5) zoom -= 0.1;
    applyZoom();
}

function applyZoom() {
    document.getElementById('resume').style.transform = `scale(${zoom})`;
    document.getElementById('zoom-val').innerText = `${Math.round(zoom * 100)}%`;
}

function fitPreview() {
    const panel = document.querySelector('.preview-panel');
    const availableWidth = panel.clientWidth - 48;

    zoom = availableWidth < 794 ? availableWidth / 794 : 1;
    applyZoom();
}

window.addEventListener('resize', fitPreview);

// Tab switching
function switchTab(tab, trigger) {
    const clickedButton = trigger || window.event?.currentTarget;

    document.querySelectorAll('.tab-btn').forEach((button) => button.classList.remove('active'));
    document.querySelectorAll('.section-panel').forEach((panel) => panel.classList.remove('active'));

    if (clickedButton) {
        clickedButton.classList.add('active');
    }

    document.getElementById(`sec-${tab}`).classList.add('active');

    const index = ['personal', 'experience', 'education', 'skills', 'templates'].indexOf(tab);
    document.getElementById('progress').style.width = `${(index + 1) * 20}%`;
}

// Simple bi-directional update for plain text fields
function updatePreview(id, val) {
    document.getElementById(`prev-${id}`).innerText = val;
}

// Template Switcher
function setTemplate(className, el) {
    document.querySelectorAll('.template-card').forEach((card) => card.classList.remove('active'));
    el.classList.add('active');

    const resume = document.getElementById('resume');
    resume.className = `resume-sheet ${className}`;

    const contactBlock = document.getElementById('r-contact-container');
    if (['resume-t2', 'resume-t4', 'resume-t5', 'resume-t6', 'resume-t7'].includes(className)) {
        contactBlock.className = 'r-contact-row';
    } else {
        contactBlock.className = 'r-contact-block';
    }
}

function clearAll() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
        document.querySelectorAll('.form-input, .form-textarea').forEach((el) => {
            el.value = '';
        });

        expData = [];
        eduData = [];
        skillsData = [];

        ['r-name', 'r-title', 'r-contact-email', 'r-contact-phone', 'r-contact-loc', 'r-contact-link', 'r-summary-text'].forEach((id) => {
            document.getElementById(`prev-${id}`).innerText = '';
        });

        renderDynamic();
    }
}

// Experience Logic
function addExperience() {
    expData.push({ title: '', company: '', date: '', desc: '' });
    renderExp();
}

function updateExp(index, field, val) {
    expData[index][field] = val;
    renderExpPreview();
}

function removeExp(index) {
    expData.splice(index, 1);
    renderExp();
}

function renderExp() {
    document.getElementById('exp-list').innerHTML = expData.map((e, i) => `
    <div class="entry-card">
      <div class="entry-card-header">
        <div class="entry-card-title">Experience ${i + 1}</div>
        <button class="btn-remove" onclick="removeExp(${i})">&times;</button>
      </div>
      <input class="form-input" value="${e.title}" oninput="updateExp(${i}, 'title', this.value)" placeholder="Job Title">
      <input class="form-input" value="${e.company}" oninput="updateExp(${i}, 'company', this.value)" placeholder="Company">
      <input class="form-input" value="${e.date}" oninput="updateExp(${i}, 'date', this.value)" placeholder="Dates (e.g., 2020 - Present)">
      <textarea class="form-textarea" oninput="updateExp(${i}, 'desc', this.value)" placeholder="Job Description">${e.desc}</textarea>
    </div>
  `).join('');
    renderExpPreview();
}

function renderExpPreview() {
    document.getElementById('prev-exp-list').innerHTML = expData.map((e) => `
    <div class="r-entry">
      <div class="r-entry-title">${e.title}</div>
      ${e.company ? `<div class="r-entry-sub">${e.company}</div>` : ''}
      <div class="r-entry-date">${e.date}</div>
      <div class="r-entry-desc">${e.desc}</div>
    </div>
  `).join('');
}

// Education Logic
function addEducation() {
    eduData.push({ degree: '', school: '', date: '' });
    renderEdu();
}

function updateEdu(index, field, val) {
    eduData[index][field] = val;
    renderEduPreview();
}

function removeEdu(index) {
    eduData.splice(index, 1);
    renderEdu();
}

function renderEdu() {
    document.getElementById('edu-list').innerHTML = eduData.map((e, i) => `
    <div class="entry-card">
      <div class="entry-card-header">
        <div class="entry-card-title">Education ${i + 1}</div>
        <button class="btn-remove" onclick="removeEdu(${i})">&times;</button>
      </div>
      <input class="form-input" value="${e.degree}" oninput="updateEdu(${i}, 'degree', this.value)" placeholder="Degree / Course">
      <input class="form-input" value="${e.school}" oninput="updateEdu(${i}, 'school', this.value)" placeholder="School / University">
      <input class="form-input" value="${e.date}" oninput="updateEdu(${i}, 'date', this.value)" placeholder="Dates (e.g., 2016 - 2019)">
    </div>
  `).join('');
    renderEduPreview();
}

function renderEduPreview() {
    document.getElementById('prev-edu-list').innerHTML = eduData.map((e) => `
    <div class="r-entry">
      <div class="r-entry-title">${e.degree}</div>
      ${e.school ? `<div class="r-entry-sub">${e.school}</div>` : ''}
      <div class="r-entry-date">${e.date}</div>
    </div>
  `).join('');
}

// Skills Logic
function addSkill() {
    const value = document.getElementById('new-skill').value.trim();

    if (value && !skillsData.includes(value)) {
        skillsData.push(value);
        document.getElementById('new-skill').value = '';
        renderSkills();
    }
}

function removeSkill(index) {
    skillsData.splice(index, 1);
    renderSkills();
}

function renderSkills() {
    document.getElementById('skills-list').innerHTML = skillsData.map((s, i) => `
    <div class="skill-tag">${s} <button onclick="removeSkill(${i})">&times;</button></div>
  `).join('');

    document.getElementById('prev-skills-list').innerHTML = skillsData.map((s) => `
     <span class="r-skill-badge r-skill-item"><span class="r-skill-dot"></span>${s}</span>
  `).join('');
}

function renderDynamic() {
    renderExp();
    renderEdu();
    renderSkills();
}

// Export PDF Logic (Spring Boot Backend)
function getApiBaseUrl() {
    const { protocol, hostname, port } = window.location;

    if (protocol === 'file:') {
        return 'http://localhost:8080';
    }

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        if (!port || port === '8080') {
            return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
        }

        return 'http://localhost:8080';
    }

    return window.location.origin;
}

function getResumeFileName() {
    const fullName = document.getElementById('inp-name').value.trim() || 'Resume';
    return `${fullName.replace(/\s+/g, '_')}_Resume.pdf`;
}

function buildResumeHtmlForExport() {
    const resumeHtml = document.getElementById('resume').outerHTML
        .replace(/style="[^"]*transform:[^"]*"/g, 'style="transform: none;"');

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="${new URL('css/style.css', window.location.href).href}">
            <style>
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .resume-sheet { margin: 0; box-shadow: none; transform: none !important; }
            </style>
        </head>
        <body>
            ${resumeHtml}
        </body>
        </html>
    `;
}

async function downloadPDF() {
    const btn = document.getElementById('download-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Generating PDF...';
    btn.disabled = true;

    try {
        const response = await fetch(`${getApiBaseUrl()}/api/pdf/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ html: buildResumeHtmlForExport() })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `PDF generation failed with status ${response.status}.`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = getResumeFileName();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error(error);
        alert(`Failed to generate PDF. ${error.message} Make sure the Spring Boot backend is running on http://localhost:8080 and Playwright browsers are installed.`);
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// Initialize
window.onload = function () {
    renderDynamic();
    fitPreview();
};
