import { db } from '../datastore';
import { ExpressHandler, ExpressHandlerUser, Filme } from '../types';

interface Req {}
export const filmesList250: ExpressHandler<Req, { data: Filme[] }> = async (
  req,
  res
) => {
  const filmes = await db.filmesList250();
  filmes.forEach((filme) => {
    filme.originalName = undefined!;
  });
  res.status(200).send({ data: filmes });
};

export const userFilmesList250: ExpressHandlerUser<
  Req,
  { data: Filme[] }
> = async (req, res) => {
  const userId = req.body.user?.id;
  if (!userId) {
    return res.status(401).send({ error: 'user not exist' });
  }
  const filmesList = await db.filmesList250();
  const userWatchedList = await db.getWatchedUserList(userId);
  const userLibrary = await db.getLibraryUserList(userId);
  for (const filme of filmesList) {
    for (const filmeWatched of userWatchedList) {
      if (filmeWatched.filmeId === filme.id) {
        filme.watched = true;
      }
    }
    for (const filmeLibrary of userLibrary) {
      if (filmeLibrary.filmeId === filme.id) {
        filme.library = true;
      }
    }
  }

  res.status(200).send({ data: filmesList });
};

interface Req {
  filmeId: string;
  userId: string;
}
interface Res {
  status: string;
  filme?: Filme;
}

export const addToMyWatchList: ExpressHandlerUser<Req, Res> = async (
  req,
  res
) => {
  const filmeId = req.body.filmeId;
  const userId = req.body.user?.id;
  if (!filmeId || !userId) {
    return res.status(401).send({ error: 'somthing want error' });
  }
  const filme = await db.getFilmeById(filmeId);
  if (!filme) {
    return res.status(404).send({ error: 'filme not exist' });
  }

  const exist = await db.getWatchedUserFilme(userId, filmeId);
  if (exist) {
    filme.watched = true;
    return res.status(200).send({ status: 'success', filme: filme });
  }
  await db.addToWatchedList(userId, filmeId);
  filme.watched = true;

  res.status(200).send({ status: 'success', filme: filme });
};
export const removeFromMyWatchList: ExpressHandlerUser<Req, Res> = async (
  req,
  res
) => {
  const filmeId = req.body.filmeId;
  const userId = req.body.user?.id;
  if (!filmeId || !userId) {
    return res.status(401).send({ error: 'somthing want error' });
  }
  const filme = await db.getFilmeById(filmeId);
  if (!filme) {
    return res.status(404).send({ error: 'filme not exist' });
  }
  await db.removeFromWatchedList(userId, filmeId);
  filme.watched = false;
  res.status(200).send({ status: 'success', filme: filme });
};

export const addToMyLibrary: ExpressHandlerUser<Req, Res> = async (
  req,
  res
) => {
  const filmeId = req.body.filmeId;
  const userId = req.body.user?.id;
  if (!filmeId || !userId) {
    return res.status(401).send({ error: 'somthing want error' });
  }
  const filme = await db.getFilmeById(filmeId);
  if (!filme) {
    return res.status(404).send({ error: 'filme not exist' });
  }
  const exist = await db.getWatchedUserFilme(userId, filmeId);
  if (exist) {
    filme.library = true;
    return res.status(200).send({ status: 'success', filme: filme });
  }

  await db.addToLibrary(userId, filmeId);

  filme.library = true;
  res.status(200).send({ status: 'success', filme: filme });
};
export const removeFromMyLibrary: ExpressHandlerUser<Req, Res> = async (
  req,
  res
) => {
  const filmeId = req.body.filmeId;
  const userId = req.body.user?.id;
  if (!filmeId || !userId) {
    return res.status(401).send({ error: 'somthing want error' });
  }
  const filme = await db.getFilmeById(filmeId);
  if (!filme) {
    return res.status(404).send({ error: 'filme not exist' });
  }
  await db.removeFromLibrary(userId, filmeId);
  filme.library = false;
  res.status(200).send({ status: 'success', filme: filme });
};
