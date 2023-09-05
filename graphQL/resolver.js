import { repository } from '../db/repository.js';

export const resolver = {

    users: (_, args, ctx) => {
      return repository.getUsers()
    }

};