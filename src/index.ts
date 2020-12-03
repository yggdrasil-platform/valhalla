import { ExpressServer } from './server';

(async (): Promise<void> => {
  const server: ExpressServer = new ExpressServer();

  server.config();
  await server.database();
  await server.api();
  await server.graphql();
  await server.listen(parseInt(process.env.PORT || '3010', 10));
})();
