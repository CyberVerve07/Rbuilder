// App State
let zoom = 1;
let expData = [{ title: 'Software Engineer', company: 'Tech Inc', date: '2020 - Present', desc: 'Developed web applications.' }];
let projectData = [{ title: 'Resume Forge', link: 'github.com/user/resume-forge', desc: 'A premium resume builder with real-time preview.' }];
let eduData = [{ degree: 'BCA', school: 'ABC University', date: '2016 - 2019' }];
let skillsData = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'];
let certsData = [{ name: 'AWS Certified Developer', issuer: 'Amazon Web Services', date: '2023' }];
let langsData = [{ name: 'English', level: 'Native' }, { name: 'Spanish', level: 'Intermediate' }];
let interestsData = 'Coding, AI, Open Source, Hiking';

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

    const tabs = ['personal', 'experience', 'projects', 'education', 'skills', 'certs', 'languages', 'templates'];
    const index = tabs.indexOf(tab);
    document.getElementById('progress').style.width = `${((index + 1) / tabs.length) * 100}%`;
}

// Simple bi-directional update for plain text fields
function updatePreview(id, val) {
    const el = document.getElementById(`prev-${id}`);
    if (el) el.innerText = val;
}

// Template Switcher
function setTemplate(className, el) {
    document.querySelectorAll('.template-card').forEach((card) => card.classList.remove('active'));
    el.classList.add('active');

    const resume = document.getElementById('resume');
    resume.className = `resume-sheet ${className}`;

    const contactBlock = document.getElementById('r-contact-container');
    if (['resume-t2', 'resume-t4', 'resume-t5', 'resume-t6', 'resume-t7', 'resume-t9', 'resume-t10'].includes(className)) {
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
        projectData = [];
        eduData = [];
        skillsData = [];
        certsData = [];
        langsData = [];
        interestsData = '';

        ['r-name', 'r-title', 'r-contact-email', 'r-contact-phone', 'r-contact-loc', 'r-contact-link', 'r-summary-text'].forEach((id) => {
            const el = document.getElementById(`prev-${id}`);
            if (el) el.innerText = '';
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

// Project Logic
function addProject() {
    projectData.push({ title: '', link: '', desc: '' });
    renderProjects();
}

function updateProject(index, field, val) {
    projectData[index][field] = val;
    renderProjectsPreview();
}

function removeProject(index) {
    projectData.splice(index, 1);
    renderProjects();
}

function renderProjects() {
    document.getElementById('project-list').innerHTML = projectData.map((p, i) => `
    <div class="entry-card">
      <div class="entry-card-header">
        <div class="entry-card-title">Project ${i + 1}</div>
        <button class="btn-remove" onclick="removeProject(${i})">&times;</button>
      </div>
      <input class="form-input" value="${p.title}" oninput="updateProject(${i}, 'title', this.value)" placeholder="Project Title">
      <input class="form-input" value="${p.link}" oninput="updateProject(${i}, 'link', this.value)" placeholder="Link (GitHub / Demo)">
      <textarea class="form-textarea" oninput="updateProject(${i}, 'desc', this.value)" placeholder="Project Description">${p.desc}</textarea>
    </div>
  `).join('');
    renderProjectsPreview();
}

function renderProjectsPreview() {
    document.getElementById('prev-project-list').innerHTML = projectData.map((p) => `
    <div class="r-entry">
      <div class="r-entry-title">${p.title} ${p.link ? `<small style="font-weight:400; color:var(--accent); margin-left:8px;">${p.link}</small>` : ''}</div>
      <div class="r-entry-desc">${p.desc}</div>
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

// Interests Logic
function updateInterests(val) {
    interestsData = val;
    document.getElementById('prev-interests-list').innerText = val;
}

// Certifications Logic
function addCert() {
    certsData.push({ name: '', issuer: '', date: '' });
    renderCerts();
}

function updateCert(index, field, val) {
    certsData[index][field] = val;
    renderCertsPreview();
}

function removeCert(index) {
    certsData.splice(index, 1);
    renderCerts();
}

function renderCerts() {
    document.getElementById('certs-list').innerHTML = certsData.map((c, i) => `
    <div class="entry-card">
      <div class="entry-card-header">
        <div class="entry-card-title">Certification ${i + 1}</div>
        <button class="btn-remove" onclick="removeCert(${i})">&times;</button>
      </div>
      <input class="form-input" value="${c.name}" oninput="updateCert(${i}, 'name', this.value)" placeholder="Certification Name">
      <input class="form-input" value="${c.issuer}" oninput="updateCert(${i}, 'issuer', this.value)" placeholder="Issuing Organization">
      <input class="form-input" value="${c.date}" oninput="updateCert(${i}, 'date', this.value)" placeholder="Date">
    </div>
  `).join('');
    renderCertsPreview();
}

function renderCertsPreview() {
    document.getElementById('prev-certs-list').innerHTML = certsData.map((c) => `
    <div class="r-entry">
      <div class="r-entry-title">${c.name}</div>
      <div class="r-entry-sub">${c.issuer} | ${c.date}</div>
    </div>
  `).join('');
}

// Languages Logic
function addLang() {
    langsData.push({ name: '', level: '' });
    renderLangs();
}

function updateLang(index, field, val) {
    langsData[index][field] = val;
    renderLangsPreview();
}

function removeLang(index) {
    langsData.splice(index, 1);
    renderLangs();
}

function renderLangs() {
    document.getElementById('langs-list').innerHTML = langsData.map((l, i) => `
    <div class="entry-card">
      <div class="entry-card-header">
        <div class="entry-card-title">Language ${i + 1}</div>
        <button class="btn-remove" onclick="removeLang(${i})">&times;</button>
      </div>
      <input class="form-input" value="${l.name}" oninput="updateLang(${i}, 'name', this.value)" placeholder="Language (e.g. English)">
      <input class="form-input" value="${l.level}" oninput="updateLang(${i}, 'level', this.value)" placeholder="Proficiency (e.g. Native)">
    </div>
  `).join('');
    renderLangsPreview();
}

function renderLangsPreview() {
    document.getElementById('prev-langs-list').innerHTML = langsData.map((l) => `
    <div class="r-entry" style="display:flex; justify-content:space-between;">
      <span style="font-weight:600;">${l.name}</span>
      <span style="color:var(--accent); font-size:12px;">${l.level}</span>
    </div>
  `).join('');
}

function renderDynamic() {
    renderExp();
    renderProjects();
    renderEdu();
    renderSkills();
    renderCerts();
    renderLangs();
    document.getElementById('inp-interests').value = interestsData;
    document.getElementById('prev-interests-list').innerText = interestsData;
}

// Export PDF Logic (Spring Boot Backend)
function getResumeFileName() {
    return `${(resumeData.name || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`;
}

function downloadPDF() {
    const element = document.getElementById('resume');
    const btn = document.getElementById('download-btn');
    const originalText = btn.innerHTML;

    btn.innerHTML = 'Generating (Backend)...';
    btn.disabled = true;

    // Clone the resume component and clean it up for the PDF
    const resumeClone = element.cloneNode(true);
    resumeClone.style.transform = 'none'; // Remove any preview scaling

    // Get all Styles from the document to include in the PDF
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
        .map(el => el.outerHTML)
        .join('\n');

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            ${styles}
            <style>
                body { background: white; margin: 0; padding: 0; }
                .resume-sheet { box-shadow: none !important; margin: 0 !important; transform: none !important; }
            </style>
        </head>
        <body>
            ${resumeClone.outerHTML}
        </body>
        </html>
    `;

    fetch('http://localhost:8080/api/pdf/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ htmlContent: htmlContent })
    })
    .then(response => {
        if (!response.ok) throw new Error('Backend error');
        return response.blob();
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${(document.getElementById('prev-r-name').innerText || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        
        btn.innerHTML = originalText;
        btn.disabled = false;
        showToast("PDF Downloaded (Backend)!");
    })
    .catch(err => {
        console.error("Backend PDF failed, falling back to frontend:", err);
        // Fallback to html2pdf.js if backend is not running
        const opt = {
            margin: 10,
            filename: `${(document.getElementById('prev-r-name').innerText || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            showToast("PDF Downloaded (Frontend Fallback)!");
        });
    });
}

// Initialize
window.onload = function () {
    renderDynamic();
    fitPreview();
};

function showToast(msg) {
    let toast = document.createElement('div');
    toast.innerText = msg;
    toast.style.cssText = `
        position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
        background: var(--sidebar-bg); color: #fff; padding: 12px 24px;
        border-radius: 30px; font-weight: 600; font-size: 13px;
        box-shadow: var(--shadow-lg); z-index: 1000; transition: opacity 0.3s;
    `;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
}
