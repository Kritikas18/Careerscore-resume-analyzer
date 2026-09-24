import React from 'react';
import { ResumeData, TemplateId } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  scale?: number;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, scale = 1 }) => {
  const { templateId, accentColor = '#4F46E5', personalInfo, summary, skills, experience, education, projects, certifications, achievements, extracurriculars } = data;

  return (
    <div className="w-full flex justify-center overflow-auto p-2 sm:p-4">
      <div
        id="resume-preview-sheet"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          width: '794px', // standard A4 at 96 DPI
          minHeight: '1123px', // standard A4 height
        }}
        className="bg-white text-slate-900 shadow-2xl rounded-sm p-10 font-sans transition-all duration-200 select-text print-sheet relative"
      >
        {templateId === 'ats' && (
          <ATSTemplate
            personalInfo={personalInfo}
            summary={summary}
            skills={skills}
            experience={experience}
            education={education}
            projects={projects}
            certifications={certifications}
            achievements={achievements}
            extracurriculars={extracurriculars}
          />
        )}

        {templateId === 'modern' && (
          <ModernTemplate
            accentColor={accentColor}
            personalInfo={personalInfo}
            summary={summary}
            skills={skills}
            experience={experience}
            education={education}
            projects={projects}
            certifications={certifications}
            achievements={achievements}
            extracurriculars={extracurriculars}
          />
        )}

        {templateId === 'corporate' && (
          <CorporateTemplate
            accentColor={accentColor}
            personalInfo={personalInfo}
            summary={summary}
            skills={skills}
            experience={experience}
            education={education}
            projects={projects}
            certifications={certifications}
            achievements={achievements}
            extracurriculars={extracurriculars}
          />
        )}

        {templateId === 'minimal' && (
          <MinimalTemplate
            personalInfo={personalInfo}
            summary={summary}
            skills={skills}
            experience={experience}
            education={education}
            projects={projects}
            certifications={certifications}
            achievements={achievements}
            extracurriculars={extracurriculars}
          />
        )}

        {templateId === 'student' && (
          <StudentTemplate
            accentColor={accentColor}
            personalInfo={personalInfo}
            summary={summary}
            skills={skills}
            experience={experience}
            education={education}
            projects={projects}
            certifications={certifications}
            achievements={achievements}
            extracurriculars={extracurriculars}
          />
        )}
      </div>
    </div>
  );
};

// 1. MODERN PROFESSIONAL TEMPLATE
const ModernTemplate: React.FC<any> = ({
  accentColor,
  personalInfo,
  summary,
  skills,
  experience,
  education,
  projects,
  certifications,
  achievements,
  extracurriculars,
}) => {
  return (
    <div className="space-y-6 text-[13px] leading-relaxed">
      {/* Header with Accent Border */}
      <div className="border-b-2 pb-5" style={{ borderColor: accentColor }}>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        <p className="text-base font-semibold mt-1" style={{ color: accentColor }}>
          {personalInfo.jobTitle || 'Target Career Title'}
        </p>

        {/* Contact Links */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>&bull; {personalInfo.phone}</span>}
          {personalInfo.location && <span>&bull; {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>&bull; {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>&bull; {personalInfo.github}</span>}
          {personalInfo.portfolio && <span>&bull; {personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: accentColor }}>
            Professional Summary
          </h2>
          <p className="text-slate-700 leading-normal">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b border-slate-200" style={{ color: accentColor }}>
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp: any) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{exp.role} &mdash; <span className="font-semibold text-slate-700">{exp.company}</span></span>
                  <span className="text-xs font-medium text-slate-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.location && <div className="text-xs text-slate-500 mb-1">{exp.location}</div>}
                <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
                  {exp.bullets.map((b: string, i: number) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b border-slate-200" style={{ color: accentColor }}>
            Technical & Professional Skills
          </h2>
          <div className="grid grid-cols-1 gap-1.5">
            {skills.map((s: any, idx: number) => (
              <div key={idx} className="text-xs">
                <strong className="text-slate-900">{s.category}:</strong>{' '}
                <span className="text-slate-700">{s.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b border-slate-200" style={{ color: accentColor }}>
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu: any) => (
              <div key={edu.id} className="flex justify-between items-baseline text-xs">
                <div>
                  <strong className="text-slate-900">{edu.degree} in {edu.fieldOfStudy}</strong> &mdash; {edu.institution}
                  {edu.gpa && <span className="text-slate-500 ml-2">(GPA: {edu.gpa})</span>}
                </div>
                <span className="text-slate-500">{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b border-slate-200" style={{ color: accentColor }}>
            Key Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj: any) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                  <span>{proj.title} <span className="font-normal text-slate-500">({proj.tools})</span></span>
                  {proj.liveUrl && <span className="text-slate-500 text-[11px] font-mono">{proj.liveUrl}</span>}
                </div>
                <p className="text-xs text-slate-700 my-1">{proj.description}</p>
                <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-slate-700">
                  {proj.bullets.map((b: string, i: number) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications & Achievements */}
      {(certifications.length > 0 || achievements.length > 0) && (
        <div className="grid grid-cols-2 gap-4 text-xs pt-1 border-t border-slate-200">
          {certifications.length > 0 && (
            <div>
              <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                Certifications
              </h3>
              {certifications.map((c: any) => (
                <div key={c.id} className="text-slate-700 mb-1">
                  <strong>{c.name}</strong> &bull; {c.issuer} ({c.date})
                </div>
              ))}
            </div>
          )}

          {achievements.length > 0 && (
            <div>
              <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-1" style={{ color: accentColor }}>
                Honors & Awards
              </h3>
              {achievements.map((a: any) => (
                <div key={a.id} className="text-slate-700 mb-1">
                  <strong>{a.title}</strong>: {a.description}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// 2. ATS-FRIENDLY SINGLE-COLUMN TEMPLATE (Highest machine parsability)
const ATSTemplate: React.FC<any> = ({
  personalInfo,
  summary,
  skills,
  experience,
  education,
  projects,
  certifications,
  achievements,
}) => {
  return (
    <div className="text-[12.5px] leading-relaxed text-black font-sans space-y-4">
      <div className="text-center pb-2 border-b border-black">
        <h1 className="text-2xl font-bold uppercase tracking-wide">{personalInfo.fullName}</h1>
        <div className="text-xs mt-1 space-x-2">
          <span>{personalInfo.email}</span>
          <span>|</span>
          <span>{personalInfo.phone}</span>
          <span>|</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedin && (
            <>
              <span>|</span>
              <span>{personalInfo.linkedin}</span>
            </>
          )}
        </div>
      </div>

      {summary && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
            Professional Summary
          </h2>
          <p>{summary}</p>
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
            Technical Skills
          </h2>
          {skills.map((s: any, idx: number) => (
            <div key={idx} className="text-xs">
              <strong>{s.category}:</strong> {s.skills.join(', ')}
            </div>
          ))}
        </div>
      )}

      {experience.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2">
            Work Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp: any) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-xs">
                  <span>{exp.company} &mdash; {exp.role}</span>
                  <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-[11px] text-gray-700 italic mb-1">{exp.location}</div>
                <ul className="list-disc ml-5 space-y-1 text-xs">
                  {exp.bullets.map((b: string, i: number) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5">
            Education
          </h2>
          {education.map((edu: any) => (
            <div key={edu.id} className="flex justify-between text-xs mb-1">
              <div>
                <strong>{edu.institution}</strong> &mdash; {edu.degree} in {edu.fieldOfStudy}
                {edu.gpa && <span> (GPA: {edu.gpa})</span>}
              </div>
              <span>{edu.startDate} – {edu.endDate}</span>
            </div>
          ))}
        </div>
      )}

      {projects.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2">
            Projects
          </h2>
          {projects.map((proj: any) => (
            <div key={proj.id} className="mb-2">
              <div className="font-bold text-xs">
                {proj.title} &mdash; <span className="font-normal italic">{proj.tools}</span>
              </div>
              <ul className="list-disc ml-5 text-xs space-y-0.5 mt-0.5">
                {proj.bullets.map((b: string, i: number) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 3. CORPORATE EXECUTIVE TEMPLATE
const CorporateTemplate: React.FC<any> = ({
  accentColor,
  personalInfo,
  summary,
  skills,
  experience,
  education,
  projects,
  certifications,
  achievements,
}) => {
  return (
    <div className="font-serif text-[13px] leading-relaxed text-slate-800 space-y-5">
      <div className="text-center border-b-2 border-slate-800 pb-3">
        <h1 className="text-3xl font-bold tracking-tight uppercase text-slate-900">
          {personalInfo.fullName}
        </h1>
        <p className="text-xs tracking-widest font-sans uppercase font-bold text-slate-600 mt-1">
          {personalInfo.jobTitle}
        </p>
        <div className="font-sans text-[11px] text-slate-600 mt-2 space-x-3">
          <span>{personalInfo.email}</span>
          <span>&bull;</span>
          <span>{personalInfo.phone}</span>
          <span>&bull;</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedin && (
            <>
              <span>&bull;</span>
              <span>{personalInfo.linkedin}</span>
            </>
          )}
        </div>
      </div>

      {summary && (
        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Executive Summary
          </h2>
          <p className="italic text-slate-700">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp: any) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold">
                  <span className="text-slate-900 text-sm">{exp.role}, {exp.company}</span>
                  <span className="font-sans text-xs text-slate-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-xs mt-1 text-slate-700">
                  {exp.bullets.map((b: string, i: number) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Academic Background
          </h2>
          {education.map((edu: any) => (
            <div key={edu.id} className="flex justify-between text-xs mb-1">
              <div>
                <strong>{edu.degree} in {edu.fieldOfStudy}</strong>, {edu.institution}
              </div>
              <span className="font-sans text-slate-600">{edu.startDate} - {edu.endDate}</span>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Core Competencies
          </h2>
          <div className="font-sans text-xs grid grid-cols-2 gap-2">
            {skills.map((s: any, idx: number) => (
              <div key={idx}>
                <strong>{s.category}:</strong> {s.skills.join(', ')}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// 4. MINIMAL SWISS TEMPLATE
const MinimalTemplate: React.FC<any> = ({
  personalInfo,
  summary,
  skills,
  experience,
  education,
  projects,
}) => {
  return (
    <div className="font-sans text-[12.5px] leading-relaxed text-slate-800 space-y-6">
      <div className="flex justify-between items-baseline border-b border-slate-300 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-black">{personalInfo.fullName}</h1>
          <p className="text-xs text-slate-600 font-medium">{personalInfo.jobTitle}</p>
        </div>
        <div className="text-right text-[11px] text-slate-500 space-y-0.5">
          <div>{personalInfo.email}</div>
          <div>{personalInfo.phone} &bull; {personalInfo.location}</div>
        </div>
      </div>

      {summary && (
        <p className="text-xs text-slate-600 max-w-xl">{summary}</p>
      )}

      {experience.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Experience</h2>
          {experience.map((exp: any) => (
            <div key={exp.id} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span>{exp.role} / {exp.company}</span>
                <span className="text-slate-400 font-normal">{exp.startDate} &mdash; {exp.current ? 'Now' : exp.endDate}</span>
              </div>
              <ul className="list-disc ml-4 text-xs text-slate-600 space-y-0.5">
                {exp.bullets.map((b: string, i: number) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Skills</h2>
          <div className="text-xs text-slate-600 space-y-1">
            {skills.map((s: any, idx: number) => (
              <div key={idx}>
                <span className="font-medium text-slate-900">{s.category}:</span> {s.skills.join(', ')}
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Education</h2>
          {education.map((edu: any) => (
            <div key={edu.id} className="flex justify-between text-xs text-slate-600">
              <span>{edu.degree} in {edu.fieldOfStudy}, {edu.institution}</span>
              <span className="text-slate-400">{edu.endDate}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 5. STUDENT & EARLY CAREER TEMPLATE (Prioritizes Education & Projects)
const StudentTemplate: React.FC<any> = ({
  accentColor,
  personalInfo,
  summary,
  skills,
  education,
  projects,
  experience,
  certifications,
  achievements,
  extracurriculars,
}) => {
  return (
    <div className="space-y-5 text-[12.5px] leading-relaxed text-slate-800">
      <div className="text-center pb-4 border-b-2" style={{ borderColor: accentColor }}>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{personalInfo.fullName}</h1>
        <p className="text-xs font-semibold mt-0.5" style={{ color: accentColor }}>{personalInfo.jobTitle}</p>
        <div className="text-xs text-slate-600 mt-2 flex justify-center flex-wrap gap-2">
          <span>{personalInfo.email}</span>
          <span>&bull;</span>
          <span>{personalInfo.phone}</span>
          <span>&bull;</span>
          <span>{personalInfo.location}</span>
          {personalInfo.github && <span>&bull; {personalInfo.github}</span>}
        </div>
      </div>

      {/* Education First for Students */}
      {education.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ color: accentColor, borderColor: accentColor }}>
            Education & Academic Honors
          </h2>
          {education.map((edu: any) => (
            <div key={edu.id} className="text-xs mb-2">
              <div className="flex justify-between font-bold text-slate-900">
                <span>{edu.institution} &mdash; {edu.degree} in {edu.fieldOfStudy}</span>
                <span className="font-normal text-slate-500">{edu.startDate} - {edu.endDate}</span>
              </div>
              {edu.gpa && <div className="text-slate-600 font-medium">Cumulative GPA: {edu.gpa}</div>}
              {edu.achievements && <div className="text-slate-500 italic mt-0.5">{edu.achievements}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Projects Forward */}
      {projects.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ color: accentColor, borderColor: accentColor }}>
            Featured Technical Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj: any) => (
              <div key={proj.id} className="text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{proj.title} <span className="font-normal text-slate-500">({proj.tools})</span></span>
                  {proj.githubUrl && <span className="text-[11px] font-mono text-slate-500">{proj.githubUrl}</span>}
                </div>
                <p className="text-slate-700 my-0.5">{proj.description}</p>
                <ul className="list-disc ml-4 space-y-0.5 text-slate-700">
                  {proj.bullets.map((b: string, i: number) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ color: accentColor, borderColor: accentColor }}>
            Technical Proficiencies
          </h2>
          {skills.map((s: any, idx: number) => (
            <div key={idx} className="text-xs">
              <strong>{s.category}:</strong> {s.skills.join(', ')}
            </div>
          ))}
        </div>
      )}

      {/* Internships & Work Experience */}
      {experience.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ color: accentColor, borderColor: accentColor }}>
            Internship & Professional Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp: any) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{exp.role} &bull; {exp.company}</span>
                  <span className="font-normal text-slate-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <ul className="list-disc ml-4 space-y-0.5 text-slate-700 mt-1">
                  {exp.bullets.map((b: string, i: number) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Extracurricular Activities */}
      {extracurriculars.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ color: accentColor, borderColor: accentColor }}>
            Leadership & Campus Activities
          </h2>
          {extracurriculars.map((extra: any) => (
            <div key={extra.id} className="text-xs mb-1">
              <strong>{extra.role}</strong> &mdash; {extra.organization} ({extra.duration}): {extra.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
