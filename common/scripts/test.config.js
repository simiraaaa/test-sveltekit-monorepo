import { BROWSER as browser } from 'esm-env';


export let serverConfig = browser ? null : {
  SERVER_VALUE: 111,
};

if (browser) {
  throw new Error('This file is only for server-side use');
}
