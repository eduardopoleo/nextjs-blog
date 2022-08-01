import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
// import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Post({ postContent, postData, staticComments }) {
  const [comments, setComments] = useState(staticComments)
  const [lastCommentId, setLastCommentId] = useState(3)
  const commentTextRef = useRef()

  const addComment = (event) => {
    // Do some async persist in here
    setLastCommentId(lastCommentId + 1)
    setComments([{ text: commentTextRef.current.value, id: lastCommentId }, ...comments])
    commentTextRef.current.value = ''
  }

  // debugger;
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
      <ReactMarkdown
        children={postContent}
        components={{
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      />
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
  const postInfo = await getPostData(params.id)

  return {
    props: {
      postData: postInfo.data,
      postContent: postInfo.content,
      staticComments: [
        { text: 'Hi I love you post keep going', id: 1 },
        { text: 'This is great!', id: 2 },
        { text: 'noha loha', id: 3 }
      ]
    }
  }
}