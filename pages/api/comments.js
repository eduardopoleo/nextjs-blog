import prisma from '../../lib/prisma'
import getGravatarInfo from '../../lib/gravatar'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return await createComment(req, res)
  } else {
    return res.status(405).json({ message: "Method not allowed", success: false })
  }
}

async function createComment(req, res) {
  const data = req.body

  try {
    const newComment = await prisma.comment.create({
      data: {
        author_email: data.author_email,
        postId: data.postId,
        text: data.text
      }
    })

    let gravatarInfo = await getGravatarInfo(data.author_email)

    const body = { ...newComment, ...gravatarInfo }

    return res.status(200).json(body, { success: true })
  } catch (error) {
    console.error("Request Error", error)
    res.status(500).json({ error: "Error creating comment", success:false });
  }
}