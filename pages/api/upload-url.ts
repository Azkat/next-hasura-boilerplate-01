import aws from 'aws-sdk'

function upload(file) {
  const date1 = new Date()
  const timestamp = date1.getTime()

  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_D,
    secretAccessKey: process.env.AWS_SECRET_KEY_D,
    region: process.env.AWS_REGION,
  })

  let prefix = 'post_image/'
  if (file.filetype == 'image/jpeg') {
    if (file.width < 1280) {
      prefix = 'post_image_noresize/'
    }
  } else {
    prefix = 'audio/'
  }

  if (file.prefix == 'user_icon') {
    prefix = 'user_icon/'
  }

  const s3 = new aws.S3()
  const params = {
    Bucket: process.env.S3_BUCKET_TEMP,
    Key: prefix + file.filename,
    ContentType: file.filetype,
  }

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', params, (err, url) => {
      if (err) {
        reject(err)
      }
      resolve(url)
    })
  })
}

const getUploadUrl = async (req, res) => {
  try {
    let url = await upload(req.query)
    return res.status(200).json({ url: url })
  } catch (error) {
    return res.status(401).send('You are unauthorised')
  }
}

export default getUploadUrl
