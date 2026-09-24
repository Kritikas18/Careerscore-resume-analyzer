import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function geminiServerPlugin(): Plugin {
  return {
    name: 'gemini-server-endpoint',
    configureServer(server) {
      server.middlewares.use('/api/ai-assist', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const payload = JSON.parse(body || '{}');
            const apiKey = process.env.GEMINI_API_KEY;

            if (!apiKey) {
              res.statusCode = 200;
              res.end(JSON.stringify({ success: false, reason: 'NO_API_KEY' }));
              return;
            }

            const { GoogleGenAI } = await import('@google/genai');
            const ai = new GoogleGenAI({ apiKey });

            let prompt = '';
            const action = payload.action;
            const role = payload.role || 'Software Engineer';
            const context = payload.context || '';
            const skills = (payload.skills || []).join(', ');

            if (action === 'summary') {
              prompt = `You are an elite executive resume writer. Generate 3 distinct, high-impact professional resume summaries (2-3 sentences each) for a ${role}. Incorporate these skills if appropriate: ${skills}. Context: ${context}. Return ONLY a JSON array of 3 strings.`;
            } else if (action === 'enhance-bullet') {
              prompt = `You are a FAANG recruiter and resume expert. Transform this draft bullet point into 3 high-impact, quantified achievement bullets using strong action verbs and the Google X-Y-Z formula: "Accomplished [X] as measured by [Y], by doing [Z]". Target role: ${role}. Draft: "${context}". Return ONLY a JSON array of 3 strings.`;
            } else if (action === 'skills') {
              prompt = `List the top 10 most in-demand technical and soft skills for a ${role} that pass ATS screenings in 2025. Return ONLY a JSON array of skill names as strings.`;
            } else if (action === 'rewrite') {
              prompt = `Rewrite this resume text to sound highly professional, active, confident, and ATS-optimized for a ${role}: "${context}". Return a JSON object with key "result" containing the rewritten text.`;
            } else if (action === 'achievement') {
              prompt = `Enhance this achievement to make it sound prestigious, quantified, and high-impact for a resume: "${context}". Return a JSON object with key "result" containing the improved achievement.`;
            } else {
              prompt = `Provide 8 high-priority ATS keywords for the target role "${role}". Return ONLY a JSON array of keywords.`;
            }

            const response = await ai.models.generateContent({
              model: 'gemini-3.8-flash',
              contents: prompt,
            });

            const textOutput = response.text || '';
            let parsedResult: any = textOutput;

            // Try to extract JSON if it was enclosed in markdown blocks
            try {
              const cleaned = textOutput.replace(/```json/g, '').replace(/```/g, '').trim();
              parsedResult = JSON.parse(cleaned);
              if (parsedResult && parsedResult.result) {
                parsedResult = parsedResult.result;
              }
            } catch {
              // fallback to string text
              parsedResult = textOutput.trim();
            }

            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, result: parsedResult, provider: 'gemini' }));
          } catch (err: any) {
            console.error('Gemini server error:', err);
            res.statusCode = 200;
            res.end(JSON.stringify({ success: false, error: err.message }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

