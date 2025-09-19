import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/ehab-guitarrista-site/' : '/',
  plugins: [
    react(),
    {
      name: 'static-cms-middleware',
      configureServer(server) {
        // Content load endpoint
        server.middlewares.use('/api/load-content', async (req, res, next) => {
          if (req.method === 'GET') {
            try {
              const fs = await import('fs');
              const contentPath = path.resolve(__dirname, 'dist/content.json');

              if (fs.existsSync(contentPath)) {
                const content = fs.readFileSync(contentPath, 'utf-8');
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.end(content);
              } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Content not found' }));
              }
            } catch (error) {
              console.error('Load error:', error);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Failed to load content' }));
            }
          } else {
            next();
          }
        });

        // Simple content save endpoint for static deployment
        server.middlewares.use('/api/save-content', async (req, res, next) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', async () => {
              try {
                const content = JSON.parse(body);
                const fs = await import('fs');
                const contentPath = path.resolve(__dirname, 'content.json');

                fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } catch (error) {
                console.error('Save error:', error);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Failed to save content' }));
              }
            });
          } else {
            next();
          }
        });

        // Content regeneration endpoint - runs the generate-content-json.js script
        server.middlewares.use('/api/regenerate-content', async (req, res, next) => {
          if (req.method === 'POST') {
            try {
              const { spawn } = await import('child_process');
              const process = spawn('node', ['generate-content-json.js'], {
                cwd: path.resolve(__dirname),
                stdio: 'pipe'
              });

              let output = '';
              let error = '';

              process.stdout.on('data', (data) => {
                output += data.toString();
              });

              process.stderr.on('data', (data) => {
                error += data.toString();
              });

              process.on('close', (code) => {
                if (code === 0) {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({
                    success: true,
                    message: 'Content regenerated successfully',
                    output: output
                  }));
                } else {
                  res.statusCode = 500;
                  res.end(JSON.stringify({
                    success: false,
                    error: 'Content regeneration failed',
                    output: error
                  }));
                }
              });

            } catch (error) {
              console.error('Regeneration error:', error);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Failed to regenerate content' }));
            }
          } else {
            next();
          }
        });
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8081,
    host: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
}))
