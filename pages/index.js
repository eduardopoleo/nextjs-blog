import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Date from '../components/date'

/*
  Link in next works differently than in react router
  It requires an a tag inside. Whereas link in RR is already
  an a tag
  Seems like home, equivalent to home={true}
*/

// This is NextJS thing. It tells it that we're gonna pre render the page as a static site
// this only would work on pages
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData,
    },
  }
}

// the props are now available in the home component.
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>Hey I'm Eduardo a web dev from Toronto! Welcome to my blog</p>
        <p>
          This is my blog and I'm learning NextJS with it. this is a second iteration
        </p>
      </section>
      
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} `}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
