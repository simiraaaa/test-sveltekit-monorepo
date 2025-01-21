import { browser as iBrowser } from "#internal";

if (iBrowser) {
  console.log('browser')
} else {
  console.log('node')
}