import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { createRequire } from "module";
import dotenv from "dotenv";

dotenv.config();

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const PDF_PATH = path.join(ROOT, "Resume_copy.pdf");
const OUTPUT_PATH = path.join(ROOT, "src/data/portfolio.js");

const DEFAULT_NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const SCHEMA_PROMPT = `You are a strict resume-to-JSON extractor. Copy content from the resume faithfully. Do NOT rewrite, elaborate, summarize, or improve the text.

Return this exact JSON shape:
{
  "personal": {
    "name": "string",
    "title": "string",
    "location": "string",
    "email": "string",
    "phone": "string",
    "summary": "string"
  },
  "skills": [{ "category": "string", "items": ["string"] }],
  "experience": [{
    "role": "string",
    "company": "string",
    "location": "string",
    "period": "string",
    "highlights": ["string"]
  }],
  "education": [{
    "degree": "string",
    "school": "string",
    "period": "string",
    "detail": "string"
  }],
  "projects": [{
    "title": "string",
    "subtitle": "string",
    "description": "string",
    "tech": ["string"],
    "link": "string or null",
    "status": "optional string e.g. In Progress"
  }]
}

STRICT RULES:
1. VERBATIM EXTRACTION: Copy wording from the resume as closely as possible. Do not paraphrase, shuffle, or reorder sentences.
2. NO INVENTION: Do not add skills, tools, metrics, companies, dates, links, or achievements that are not explicitly in the resume.
3. NO OMISSION: Include every experience bullet, education entry, skill item, and project from the resume. Do not shorten or drop content.
4. ONE-TO-ONE BULLETS: Each resume bullet point becomes exactly one string in "highlights". Keep bullets in the same order as the resume. If a job has 6 bullets in the resume, the highlights array MUST have 6 strings.
5. ALL JOBS: Include every role listed under Professional Experience and Internship Experience as separate experience entries.
6. SUMMARY: Copy the full Professional Summary paragraph word-for-word. Do not truncate or rewrite it.
7. SKILLS: Use the exact category names and skill items from the resume. Do not merge, split, or rename categories.
8. EXPERIENCE: Parse each job separately. Use exact role, company, location, and dates from the resume. Period format: "2025 – Present" or "Jun 2024 – Dec 2024".
9. EDUCATION: Copy the full degree name, school, year, and CGPA/percentage exactly as written.
10. PROJECTS: Only include projects explicitly listed under Projects/Project on the resume. Copy the full description. Put technologies in "tech" only if listed on the resume. Do not leave description empty.
11. CLEANUP ONLY: You may fix obvious PDF spacing issues (double spaces, broken line wraps). Do not change meaning.
12. LINKS: Set "link" only if a URL appears in the resume for that project. Otherwise use null. Do not guess URLs.
13. OUTPUT: Return ONLY valid JSON. No markdown, no comments, no extra fields. Do not stop early — include complete data for all sections.`;

async function extractPdfText(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Resume PDF not found at ${filePath}`);
  }

  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  const text = data.text?.trim();

  if (!text) {
    throw new Error("No text could be extracted from the PDF");
  }

  return text;
}

function parseJsonFromText(text) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonText = fenced ? fenced[1].trim() : trimmed;
  return JSON.parse(jsonText);
}

function cleanText(value) {
  if (typeof value === "string") {
    return value.replace(/\s+/g, " ").trim();
  }
  if (Array.isArray(value)) {
    return value.map(cleanText);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, cleanText(val)]),
    );
  }
  return value;
}

async function parseWithAI(resumeText) {
  const host = process.env.OLLAMA_HOST || "http://localhost:11434";
  const model = process.env.OLLAMA_MODEL || "llama3.2";

  const response = await fetch(`${host}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      stream: false,
      format: "json",
      options: {
        temperature: 0,
        num_predict: 8192,
      },
      messages: [
        { role: "system", content: SCHEMA_PROMPT },
        { role: "user", content: `Extract data from this resume. Copy text faithfully — do not rewrite.\n\n${resumeText}` },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Ollama error: ${response.status} ${err}`);
  }

  const json = await response.json();
  const content = json.message?.content;

  if (!content) {
    throw new Error(
      "Ollama returned no content. Is Ollama running? Install from https://ollama.com and run: ollama pull llama3.2",
    );
  }

  return cleanText(parseJsonFromText(content));
}

async function loadExistingPortfolio() {
  if (!fs.existsSync(OUTPUT_PATH)) {
    return {
      personal: {},
      skills: [],
      experience: [],
      education: [],
      projects: [],
      navLinks: DEFAULT_NAV_LINKS,
    };
  }

  const module = await import(`${pathToFileURL(OUTPUT_PATH).href}?t=${Date.now()}`);
  return {
    personal: module.personal ?? {},
    skills: module.skills ?? [],
    experience: module.experience ?? [],
    education: module.education ?? [],
    projects: module.projects ?? [],
    navLinks: module.navLinks ?? DEFAULT_NAV_LINKS,
  };
}

function pickResumeOrFallback(resumeValue, fallbackValue) {
  if (!Array.isArray(resumeValue) || resumeValue.length === 0) {
    return fallbackValue ?? [];
  }

  if (Array.isArray(fallbackValue) && fallbackValue.length > resumeValue.length) {
    return fallbackValue;
  }

  return resumeValue;
}

function mergeExperience(resumeExperience, existingExperience) {
  const existing = existingExperience ?? [];
  if (!Array.isArray(resumeExperience) || resumeExperience.length === 0) {
    return existing;
  }

  const merged = resumeExperience.map((job) => {
    const match = existing.find(
      (item) =>
        item.company?.toLowerCase() === job.company?.toLowerCase() &&
        item.period === job.period,
    );

    if (
      match?.highlights?.length &&
      (job.highlights?.length ?? 0) < match.highlights.length
    ) {
      return { ...job, highlights: match.highlights };
    }

    return job;
  });

  const resumeKeys = new Set(
    resumeExperience.map((job) => `${job.company}|${job.period}`.toLowerCase()),
  );
  const siteOnly = existing.filter(
    (job) => !resumeKeys.has(`${job.company}|${job.period}`.toLowerCase()),
  );

  return [...merged, ...siteOnly];
}

function mergeProjects(resumeProjects, existingProjects) {
  const existing = existingProjects ?? [];
  const validResume = (resumeProjects ?? []).filter(
    (project) =>
      project.title?.trim() &&
      (project.description?.trim() || project.subtitle?.trim()),
  );

  if (validResume.length === 0) {
    return existing;
  }

  const mergedFromResume = validResume.map((project) => {
    const match = existing.find(
      (item) => item.title?.toLowerCase() === project.title?.toLowerCase(),
    );

    return {
      ...project,
      link: project.link ?? match?.link ?? null,
      ...(match?.status && !project.status ? { status: match.status } : {}),
      ...(project.status ? { status: project.status } : {}),
    };
  });

  const resumeTitles = new Set(
    validResume.map((project) => project.title?.toLowerCase()).filter(Boolean),
  );
  const siteOnlyProjects = existing.filter(
    (project) => project.title && !resumeTitles.has(project.title.toLowerCase()),
  );

  return [...mergedFromResume, ...siteOnlyProjects];
}

function mergeData(resumeData, existing) {
  return {
    personal: {
      ...resumeData.personal,
      linkedin: resumeData.personal?.linkedin || existing.personal?.linkedin,
      github: resumeData.personal?.github || existing.personal?.github,
    },
    skills: pickResumeOrFallback(resumeData.skills, existing.skills),
    experience: mergeExperience(resumeData.experience, existing.experience),
    education: pickResumeOrFallback(resumeData.education, existing.education),
    projects: mergeProjects(resumeData.projects, existing.projects),
    navLinks: existing.navLinks ?? DEFAULT_NAV_LINKS,
  };
}

function formatValue(value, indent = 0) {
  const pad = "  ".repeat(indent);

  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((item) => `${pad}  ${formatValue(item, indent + 1)}`).join(",\n");
    return `[\n${items},\n${pad}]`;
  }

  const entries = Object.entries(value)
    .filter(([, v]) => v !== undefined)
    .map(([key, v]) => `${pad}  ${key}: ${formatValue(v, indent + 1)}`)
    .join(",\n");

  return `{\n${entries},\n${pad}}`;
}

function writePortfolioJs(data) {
  const content = `// Updated by scripts/sync-from-pdf.js from Resume_copy.pdf
// Last synced: ${new Date().toISOString()}
// Run npm run sync after updating your resume PDF

export const personal = ${formatValue(data.personal)};

export const skills = ${formatValue(data.skills)};

export const experience = ${formatValue(data.experience)};

export const education = ${formatValue(data.education)};

export const projects = ${formatValue(data.projects)};

export const navLinks = ${formatValue(data.navLinks)};
`;

  fs.writeFileSync(OUTPUT_PATH, content, "utf-8");
}

async function main() {
  const existing = await loadExistingPortfolio();

  console.log("Reading PDF:", PDF_PATH);
  const resumeText = await extractPdfText(PDF_PATH);
  console.log(`Extracted ${resumeText.length} characters from PDF`);

  console.log(`Parsing with Ollama (${process.env.OLLAMA_MODEL || "llama3.2"})...`);
  const resumeData = await parseWithAI(resumeText);
  const merged = mergeData(resumeData, existing);

  if (
    !merged.skills.length &&
    !merged.experience.length &&
    !merged.education.length &&
    !merged.projects.length
  ) {
    throw new Error(
      "AI returned empty resume data and no existing portfolio content to fall back on.",
    );
  }

  writePortfolioJs(merged);
  console.log("Updated:", OUTPUT_PATH);
  console.log("Synced personal, skills, experience, education, and projects from resume PDF");
}

main().catch((err) => {
  console.error("Sync failed:", err.message);
  process.exit(1);
});
