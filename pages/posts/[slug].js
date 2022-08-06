import Layout from '../../components/layout'
import { getAllPostSlugs, getPostData, getPostComments } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

export default function Post({ postContent, postData, staticPostComments, postId }) {
  const [postComments, setpostComments] = useState(staticPostComments)
  const commentTextRef = useRef()
  const authorEmailRef = useRef()

  const addComment = async event => {
    event.preventDefault()
    const body = {
      postId,
      text: commentTextRef.current.value,
      author_email: authorEmailRef.current.value
    }
    let response;
    try {
      response = await fetch("/api/comments", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
      });

      response = await response.json()
    } catch (error) {
      console.log("there was an error submitting", error);
      return
    }
    setpostComments([{ text: response.text, id: response.id }, ...postComments])
    commentTextRef.current.value = ''
    authorEmailRef.current.value = ''
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
        <label>Email</label>
        <br/>
        <input type="email" ref={authorEmailRef} />
        <br/>
        <label>Comment</label>
        <br/>
        <textarea type='text' ref={commentTextRef} placeholder="Comment Here!"/>
        <br/>
        <button onClick={addComment}>Add Comment</button>

        <ul>
          {
            postComments && postComments.map(comment => {
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
  const paths = getAllPostSlugs()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postInfo = await getPostData(params.slug)
  const staticPostComments = await getPostComments(postInfo.data.id)

  return {
    props: {
      postId: postInfo.data.id,
      postData: postInfo.data,
      postContent: postInfo.content,
      staticPostComments: staticPostComments
    }
  }
}