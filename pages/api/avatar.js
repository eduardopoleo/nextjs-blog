import getGravatarInfo from '../../lib/gravatar'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return await fetchGravatarInfo(req, res)
  } else {
    return res.status(405).json({ message: "Method not allowed", success: false })
  }
}

async function fetchGravatarInfo(req, res) {
  try {
    const profileInfo = await getGravatarInfo(req.body.email)
    return res.status(200).json({ ...profileInfo }, { success: true })
  } catch (error) {
    console.error("Request Error", error)
    res.status(500).json({ error: "Error creating comment", success:false });
  }
}
