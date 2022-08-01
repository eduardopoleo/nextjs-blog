import '../styles/global.css'

/*
  This is an actual internal component used by next (hence the underscore).
  We can override it in case that we need to do stuff
  https://nextjs.org/docs/advanced-features/custom-app

  Just importing the files enables the css.
*/

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}