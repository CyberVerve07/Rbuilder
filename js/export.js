// Logic for Exporting the Preview Pane to PDF

document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-btn');
    const resumeDocument = document.getElementById('resume-document');

    downloadBtn.addEventListener('click', () => {

        // Add a loading state to button
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = "<i class='bx bx-loader bx-spin'></i> Generating...";
        downloadBtn.disabled = true;

        // Get the first and last name for the file name
        const fName = document.getElementById('firstName').value.trim() || 'My';
        const lName = document.getElementById('lastName').value.trim() || 'Resume';
        const filename = `${fName}_${lName}_Resume.pdf`.replace(/\s+/g, '_');

        // Configure html2pdf options
        const opt = {
            margin: 0,
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Generate PDF
        html2pdf()
            .set(opt)
            .from(resumeDocument)
            .save()
            .then(() => {
                // Restore button state
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
            })
            .catch(err => {
                console.error("PDF Generation error:", err);
                alert("Failed to generate PDF. Check console for details.");
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
            });
    });
});
