import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import prisma from './prisma'
import getGravatarInfo from './gravatar'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map((fileName) => {
    // parses the name of the posts and sets it as the id 
    const postSlug = fileName.replace(/\.md$/, '')
    // get the full path  
    const fullPath = path.join(postsDirectory, fileName)
    // parses the content of the posts
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    // uses the matter library to parse the matter info
    const matterResult = matter(fileContents)

    return {
      postSlug, // is the post info
      ...matterResult.data, // an object containing all the other info
    }
  })

  // Sorts all the posts in here. Similar to using the spaceship operator in enumerable in ruby
  return allPostsData.sort(({ date: a}, {date: b}) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory)

  // wondering how to deal with nested dynamic params
  return fileNames.map(fileName => {
    return {
      params: { // this params always has to be there
        slug: fileName.replace(/\.md$/, '') // this key id must match the key used in the file name
      }
    }
  })
}

export async function getPostComments(postId) {
  let comments = await prisma.comment.findMany({ where: { postId: postId } });
  comments = await Promise.all(comments.map(async comment => {
    const profileInfo = await getGravatarInfo(comment.author_email)

    return { ...profileInfo, ...comment }
  }));

  return JSON.parse(JSON.stringify(comments))
}

export async function getPostData(postSlug) {
  const fullPath = path.join(postsDirectory, `${postSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)
  /*
    Turns our string into an object like this:
    {
      data: {
        title: 'hello',
        date: 'hello'
      },
      content: "hello"
    }
    It does not process the markdown we need another library such as remark
  */

  return {
    postSlug,
    ...matterResult,
  }
}