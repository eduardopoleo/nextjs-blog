import crypto from 'crypto'

export default async function getGravatarInfo(email) {
  const hash = crypto.createHash('md5').update(email).digest("hex")
  const gravatarInfo = await fetch(`https://www.gravatar.com/${hash}.json`)
  const infoInJson = await gravatarInfo.json()
  const info = infoInJson.entry
  if (info) {
    return { avatarUrl: info[0].thumbnailUrl, profileName: info[0].preferredUsername }
  } else {
    return { avatarUrl: 'https://gravatar.com/eduardopoleo', profileName: 'Anon' }
  }
}