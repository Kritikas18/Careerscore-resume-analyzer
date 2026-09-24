import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '../types/resume';

export async function exportToPdf(elementId: string, filename: string = 'Resume.pdf'): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Target element not found:', elementId);
    return false;
  }

  try {
    // Clone or capture target element with high scale for crisp vector-like text
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    
    // Standard A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Handle multi-page if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('PDF generation error:', error);
    // Fallback: trigger print
    window.print();
    return false;
  }
}

export function exportToDocx(resume: ResumeData, filename: string = 'Resume.doc'): void {
  // Generate Microsoft Word-compatible document formatted in semantic HTML
  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${resume.personalInfo.fullName} - Resume</title>
      <style>
        body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.35; color: #1a1a1a; margin: 20mm; }
        h1 { font-size: 20pt; margin-bottom: 2pt; color: #0f172a; text-transform: uppercase; }
        h2 { font-size: 12pt; margin-top: 14pt; margin-bottom: 4pt; border-bottom: 1.5pt solid #334155; text-transform: uppercase; letter-spacing: 0.5pt; color: #0f172a; }
        .contact { font-size: 10pt; color: #475569; margin-bottom: 12pt; }
        .role-header { display: flex; justify-content: space-between; font-weight: bold; margin-top: 8pt; }
        .company-line { font-style: italic; color: #334155; margin-bottom: 4pt; }
        ul { margin-top: 3pt; margin-bottom: 6pt; padding-left: 20pt; }
        li { margin-bottom: 3pt; }
        .skills-grid p { margin: 2pt 0; }
      </style>
    </head>
    <body>
      <h1>${resume.personalInfo.fullName}</h1>
      <div style="font-size: 13pt; font-weight: 600; color: #4338ca; margin-bottom: 4pt;">${resume.personalInfo.jobTitle}</div>
      <div class="contact">
        ${[
          resume.personalInfo.email,
          resume.personalInfo.phone,
          resume.personalInfo.location,
          resume.personalInfo.linkedin,
          resume.personalInfo.github,
          resume.personalInfo.portfolio,
        ].filter(Boolean).join(' | ')}
      </div>

      ${resume.summary ? `<h2>Professional Summary</h2><p>${resume.summary}</p>` : ''}

      ${resume.experience.length ? `<h2>Professional Experience</h2>` + resume.experience.map(exp => `
        <div style="margin-top: 8pt;">
          <strong>${exp.role}</strong> &mdash; <em>${exp.company}</em> (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})
          <div style="font-size: 9.5pt; color: #64748b;">${exp.location}</div>
          <ul>${exp.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
        </div>
      `).join('') : ''}

      ${resume.skills.length ? `<h2>Skills & Competencies</h2><div class="skills-grid">` + resume.skills.map(s => `
        <p><strong>${s.category}:</strong> ${s.skills.join(', ')}</p>
      `).join('') + `</div>` : ''}

      ${resume.education.length ? `<h2>Education</h2>` + resume.education.map(edu => `
        <div style="margin-top: 6pt;">
          <strong>${edu.degree} in ${edu.fieldOfStudy}</strong> &mdash; ${edu.institution} (${edu.startDate} - ${edu.endDate})
          ${edu.gpa ? `<div>GPA: ${edu.gpa}</div>` : ''}
          ${edu.achievements ? `<div><em>${edu.achievements}</em></div>` : ''}
        </div>
      `).join('') : ''}

      ${resume.projects.length ? `<h2>Featured Projects</h2>` + resume.projects.map(proj => `
        <div style="margin-top: 6pt;">
          <strong>${proj.title}</strong> &mdash; <em>${proj.tools}</em>
          <p style="margin: 2pt 0;">${proj.description}</p>
          <ul>${proj.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
        </div>
      `).join('') : ''}

      ${resume.certifications.length ? `<h2>Certifications</h2>` + resume.certifications.map(c => `
        <p style="margin: 2pt 0;"><strong>${c.name}</strong> &mdash; ${c.issuer} (${c.date})</p>
      `).join('') : ''}

      ${resume.achievements.length ? `<h2>Key Honors & Achievements</h2>` + resume.achievements.map(a => `
        <p style="margin: 2pt 0;"><strong>${a.title}</strong> &mdash; ${a.organization} (${a.date}): ${a.description}</p>
      `).join('') : ''}
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', content], {
    type: 'application/msword;charset=utf-8',
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportToJson(resume: ResumeData, filename: string = 'Resume_Backup.json'): void {
  const jsonStr = JSON.stringify(resume, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
