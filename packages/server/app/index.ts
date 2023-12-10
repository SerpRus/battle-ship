import { dbConnect } from './init';

export function startApp() {
  dbConnect().then();
}
