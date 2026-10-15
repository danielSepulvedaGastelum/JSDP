import express from 'express';

const portInput = process.env.PORT ?? '3000';
const port = Number(portInput);

if (!/^\d+$/.test(portInput) || !Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('PORT debe ser un entero entre 1 y 65535.');
  process.exit(1);
}

const app = express();

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'express' });
});

app.listen(port, '127.0.0.1', (error?: NodeJS.ErrnoException) => {
  if (error) {
    console.error(
      error.code === 'EADDRINUSE'
        ? `El puerto ${port} está ocupado.`
        : 'No fue posible iniciar el servidor.',
    );
    process.exitCode = 1;
    return;
  }

  console.log(`Express disponible en http://127.0.0.1:${port}`);
});
