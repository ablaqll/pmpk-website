import Fastify from 'fastify';
import cors from '@fastify/cors';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import superjson from 'superjson';
import { appRouter } from './routers';
import { createContext } from './trpc';

const fastify = Fastify({
  logger: true,
  trustProxy: true, // Important for Railway/production
});

async function main() {
  // Determine allowed origins based on environment
  const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173', 'http://localhost:3000'];

  // Add Netlify domain in production
  if (process.env.NETLIFY_URL) {
    allowedOrigins.push(`https://${process.env.NETLIFY_URL}`);
  }
  if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
  }

  await fastify.register(cors, {
    origin: (origin, cb) => {
      // Allow all origins in development, whitelist in production
      if (!origin || process.env.NODE_ENV !== 'production') {
        cb(null, true);
        return;
      }
      
      if (allowedOrigins.some(allowed => origin.includes(allowed) || allowed === true)) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true,
  });

  await fastify.register(fastifyTRPCPlugin, {
    prefix: '/api/trpc',
    trpcOptions: {
      router: appRouter,
      createContext,
      transformer: superjson, // Must match client transformer
    },
  });

  // Health check endpoint for Railway/monitoring
  fastify.get('/health', async (request, reply) => {
    return { 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      port: parseInt(process.env.PORT || '3000')
    };
  });

  // Root endpoint
  fastify.get('/', async (request, reply) => {
    return { 
      message: 'PMPK Backend API',
      version: '1.0.0',
      endpoints: {
        api: '/api/trpc',
        health: '/health'
      }
    };
  });

  const PORT = parseInt(process.env.PORT || '3000');
  const HOST = process.env.HOST || '0.0.0.0';

  try {
    await fastify.listen({ port: PORT, host: HOST });
    console.log(`
🚀 PMPK Backend Server Started
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Environment: ${process.env.NODE_ENV || 'development'}
Port: ${PORT}
Host: ${HOST}
API: http://${HOST}:${PORT}/api/trpc
Health: http://${HOST}:${PORT}/health
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
