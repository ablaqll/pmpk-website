import Fastify from 'fastify';
import cors from '@fastify/cors';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { appRouter } from './routers';
import { createContext } from './trpc';

const fastify = Fastify({
  logger: true,
});

async function main() {
  await fastify.register(cors, {
    origin: true, // Allow all origins for dev
    credentials: true,
  });

  await fastify.register(fastifyTRPCPlugin, {
    prefix: '/api/trpc',
    trpcOptions: {
      router: appRouter,
      createContext,
    },
  });

  try {
    await fastify.listen({ port: 3000 });
    console.log('Server listening on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();

