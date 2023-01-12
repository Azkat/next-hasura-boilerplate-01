console.log('Loading function')

const aws = require('aws-sdk')
const s3 = new aws.S3({ apiVersion: '2006-03-01' })
const fs = require('fs')
const execSync = require('child_process').execSync
process.env.PATH += ':/var/task/bin'

exports.handler = async (event, context) => {
  console.log('Received event:', JSON.stringify(event))

  /**********************************
    gif, mp4, mov, avi, webm → mp4
  **********************************/

  const bucket = event.Records[0].s3.bucket.name
  let destinationBucket = 'droptune-test01'
  if (bucket == 'droptune-tmp-pd') {
    destinationBucket = 'droptune-pd'
  }
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, ' ')
  )
  const extension = key.split('/')[key.split('/').length - 1].split('.')[1]
  const filename = key.split('/')[key.split('/').length - 1].split('.')[0]
  const params = {
    Bucket: bucket,
    Key: key,
  }
  const message =
    'extension : ' +
    extension +
    ', filename : ' +
    filename +
    ', Bucket : ' +
    params.Bucket +
    ', key : ' +
    params.Key
  console.log(message)

  const uploaded_data = await s3
    .getObject(params)
    .promise()
    .catch((err) => {
      console.log(err)
      const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`
      console.log(message)
      throw new Error(message)
    })

  fs.writeFileSync('/tmp/' + filename + '.' + extension, uploaded_data.Body)

  const ffmpegMp4Command =
    'ffmpeg -y -i /tmp/' +
    filename +
    '.' +
    extension +
    " -movflags faststart -pix_fmt yuv420p -vf 'scale=trunc(iw/2)*2:trunc(ih/2)*2' -c:v libx264 /tmp/" +
    filename +
    '.mp4'

  if (extension != 'mp4') {
    execSync(ffmpegMp4Command)
  }

  const ffmpegJpgCommand =
    'ffmpeg -y -i /tmp/' +
    filename +
    '.' +
    extension +
    " -vf 'scale=iw*sar:ih,setsar=1' -vframes 1 /tmp/" +
    filename +
    '.jpg'

  execSync(ffmpegJpgCommand)

  const mp4FileStream = fs.createReadStream('/tmp/' + filename + '.mp4')
  mp4FileStream.on('error', function (error) {
    console.log(error)
    throw new Error(error)
  })

  const jpgFileStream = fs.createReadStream('/tmp/' + filename + '.jpg')
  jpgFileStream.on('error', function (error) {
    console.log(error)
    throw new Error(error)
  })

  await s3
    .putObject({
      Bucket: destinationBucket,
      Key: 'post_image/' + filename + '.jpg',
      Body: jpgFileStream,
      ContentType: 'image/jpeg',
    })
    .promise(() => {
      const message = 'output/' + key.replace(extension, 'jpg')
      console.log(message)
    })
    .catch((err) => {
      console.log(err)
      const message = `Error putting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`
      console.log(message)
      throw new Error(message)
    })

  await s3
    .putObject({
      Bucket: destinationBucket,
      Key: 'video/' + filename + '.mp4',
      Body: mp4FileStream,
      ContentType: 'video/mp4',
    })
    .promise(() => {
      const message = 'output/' + key.replace(extension, 'mp4')
      console.log(message)
    })
    .catch((err) => {
      console.log(err)
      const message = `Error putting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`
      console.log(message)
      throw new Error(message)
    })

  /**********************************
      delete files
    **********************************/
  fs.unlinkSync('/tmp/' + filename + '.' + extension, uploaded_data.Body)
  fs.unlinkSync('/tmp/' + filename + '.mp4', uploaded_data.Body)
  fs.unlinkSync('/tmp/' + filename + '.jpg', uploaded_data.Body)

  await s3.deleteObject(params).promise()

  return `Success getting and putting object ${key} from bucket ${bucket}.`
}
