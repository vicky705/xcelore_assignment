
// import express from 'express';
// import { createUser, getUser, updateUser, deleteUser, getUserList, login } from '../controller/userController.js';
// const userRouter = express.Router();

// userRouter.post('/', createUser);
// userRouter.post('/new',verifyToken, createUser);
// userRouter.post('/login', login);
// userRouter.get('/',verifyToken, getUserList);
// userRouter.get('/:id', verifyToken, getUser);
// userRouter.put('/:id', verifyToken, updateUser);
// userRouter.delete('/:id',verifyToken, deleteUser);

// export default userRouter;

import express from 'express';
import { 
  createUser, 
  createUserByAdmin, 
  getUser, 
  updateUser, 
  updateUserByAdmin, 
  deleteUser, 
  getUserList, 
  login 
} from '../controller/userController.js';
import { verifyToken } from '../middleware/verityToken.js';

const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.post('/new', verifyToken, createUserByAdmin); 
userRouter.post('/login', login);
userRouter.get('/', verifyToken, getUserList);
userRouter.get('/:id', verifyToken, getUser);
userRouter.put('/:id', verifyToken, updateUser);
userRouter.put('/admin/:id', verifyToken, updateUserByAdmin); 
userRouter.delete('/:id', verifyToken, deleteUser);

export default userRouter;
