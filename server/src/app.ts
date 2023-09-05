import express from 'express';
import asyncHandler from 'express-async-handler';
import { signupHandler, signinHandler } from './handlers/usersHandler';
import {
  filmesList250,
  userFilmesList250,
  addToMyWatchList,
  removeFromMyWatchList,
  addToMyLibrary,
  removeFromMyLibrary,
} from './handlers/filmesHandler';
import { authMiddleware } from './middleware/authMiddleware';
const app: express.Application = express();
app.use(express.json());

// Users
app.post('/users/signup', asyncHandler(signupHandler));
app.post('/users/signin', asyncHandler(signinHandler));
// filme
app.get('/filmes', asyncHandler(filmesList250));

// Protected API's
app.get('/filmes/list250', authMiddleware, asyncHandler(userFilmesList250));

app.post(
  '/filmes/mywatched/add',
  authMiddleware,
  asyncHandler(addToMyWatchList)
);
app.post(
  '/filmes/mywatched/remove',
  authMiddleware,
  asyncHandler(removeFromMyWatchList)
);
app.post('/filmes/mylibrary/add', authMiddleware, asyncHandler(addToMyLibrary));
app.post(
  '/filmes/mylibrary/remove',
  authMiddleware,
  asyncHandler(removeFromMyLibrary)
);
export default app;
