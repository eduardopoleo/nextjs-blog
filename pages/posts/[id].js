import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { useRef, useState } from 'react'

export default function Post({ postData, staticComments }) {
  const [comments, setComments] = useState(staticComments)
  const [lastCommentId, setLastCommentId] = useState(3)
  const commentTextRef = useRef()

  const addComment = (event) => {
    // Do some async persist in here
    setLastCommentId(lastCommentId + 1)
    setComments([{ text: commentTextRef.current.value, id: lastCommentId }, ...comments])
    commentTextRef.current.value = ''
  }

  return(
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX}>{postData.title}</h1>
        <div className={utilStyles.lightTest}>
          <Date dateString={postData.date} />
        </div>
      </article>
      <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
      <section>
      <h2>Comments</h2>
        <p>Add Comment</p>
        <textarea type='text' ref={commentTextRef} placeholder="Comment Here!"/>
        <br/>
        <button onClick={addComment}>Add Comment</button>

        <ul>
          {
            comments && comments.map(comment => {
              return <li key={comment.id}>
                {comment.text}
              </li>
            })
          }
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)

  return {
    props: {
      postData,
      staticComments: [
        { text: 'Hi I love you post keep going', id: 1 },
        { text: 'This is great!', id: 2 },
        { text: 'noha loha', id: 3 }
      ]
    }
  }
}