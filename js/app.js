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
    document.getElementById('zoom-val').innerText = Math.round(zoom * 100) + '%';
}
function fitPreview() {
    const panel = document.querySelector('.preview-panel');
    const availableWidth = panel.clientWidth - 48; // padding
    if (availableWidth < 794) {
        zoom = availableWidth / 794;
    } else {
        zoom = 1;
    }
    applyZoom();
}
window.addEventListener('resize', fitPreview);

// Tab switching
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.getElementById('sec-' + tab).classList.add('active');

    // Progress bar simple update
    const index = ['personal', 'experience', 'education', 'skills', 'templates'].indexOf(tab);
    document.getElementById('progress').style.width = ((index + 1) * 20) + '%';
}

// Simple bi-directional update for plain text fields
function updatePreview(id, val) {
    document.getElementById('prev-' + id).innerText = val;
}

// Template Switcher
function setTemplate(className, el) {
    document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');

    const resume = document.getElementById('resume');
    resume.className = 'resume-sheet ' + className;

    // Also adjust the contact wrapper to be a row for t2, t4, t5
    const contactBlock = document.getElementById('r-contact-container');
    if (className === 'resume-t2' || className === 'resume-t4' || className === 'resume-t5') {
        contactBlock.className = 'r-contact-row';
    } else {
        contactBlock.className = 'r-contact-block';
    }
}

function clearAll() {
    if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
        document.querySelectorAll('.form-input, .form-textarea').forEach(el => el.value = '');
        expData = [];
        eduData = [];
        skillsData = [];

        // clear preview static fields
        ['r-name', 'r-title', 'r-contact-email', 'r-contact-phone', 'r-contact-loc', 'r-contact-link', 'r-summary-text'].forEach(id => {
            document.getElementById('prev-' + id).innerText = '';
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
        <button class="btn-remove" onclick="removeExp(${i})">×</button>
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
    document.getElementById('prev-exp-list').innerHTML = expData.map(e => `
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
        <button class="btn-remove" onclick="removeEdu(${i})">×</button>
      </div>
      <input class="form-input" value="${e.degree}" oninput="updateEdu(${i}, 'degree', this.value)" placeholder="Degree / Course">
      <input class="form-input" value="${e.school}" oninput="updateEdu(${i}, 'school', this.value)" placeholder="School / University">
      <input class="form-input" value="${e.date}" oninput="updateEdu(${i}, 'date', this.value)" placeholder="Dates (e.g., 2016 - 2019)">
    </div>
  `).join('');
    renderEduPreview();
}
function renderEduPreview() {
    document.getElementById('prev-edu-list').innerHTML = eduData.map(e => `
    <div class="r-entry">
      <div class="r-entry-title">${e.degree}</div>
      ${e.school ? `<div class="r-entry-sub">${e.school}</div>` : ''}
      <div class="r-entry-date">${e.date}</div>
    </div>
  `).join('');
}

// Skills Logic
function addSkill() {
    let v = document.getElementById('new-skill').value.trim();
    if (v && !skillsData.includes(v)) {
        skillsData.push(v);
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
    <div class="skill-tag">${s} <button onclick="removeSkill(${i})">×</button></div>
  `).join('');

    // T1 uses skill dot, T2 uses badge styling. Since we switch classes on root `resume`, 
    // we can use a general DOM that works well for both, or let CSS theme handle the look.
    // We'll give it classes that `style.css` looks for.
    document.getElementById('prev-skills-list').innerHTML = skillsData.map(s => `
     <span class="r-skill-badge r-skill-item"><div class="r-skill-dot"></div>${s}</span>
  `).join('');
}

function renderDynamic() {
    renderExp();
    renderEdu();
    renderSkills();
}

// Export PDF Logic (Spring Boot Backend)
async function downloadPDF() {
    const btn = document.getElementById('download-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Generating PDF...';
    btn.disabled = true;

    try {
        // Fetch current CSS
        const styleRes = await fetch('css/style.css');
        let styleText = '';
        if (styleRes.ok) {
            styleText = await styleRes.text();
        }

        // Prepare HTML for backend
        const resumeHtml = document.getElementById('resume').outerHTML;

        // Ensure scale is 1 in the backend HTML
        const cleanedHtml = resumeHtml.replace(/style="transform:\s*scale[^"]*"/g, 'style="transform: scale(1);"');

        const fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Lato:wght@300;400;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
            <style>
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                ${styleText}
                .resume-sheet { margin: 0; box-shadow: none; }
            </style>
        </head>
        <body>
            ${cleanedHtml}
        </body>
        </html>
        `;

        // POST to Java Spring Boot Backend
        const response = await fetch('/api/pdf/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ html: fullHtml })
        });

        if (!response.ok) {
            throw new Error('PDF Generation Failed on Server.');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ResumeForge_Project.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

    } catch (e) {
        console.error(e);
        alert('Failed to generate PDF. Make sure the Java Spring Boot backend is running on port 8080.');
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
