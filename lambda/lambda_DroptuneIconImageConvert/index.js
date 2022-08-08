console.log("Loading function");

const aws = require("aws-sdk");
const s3 = new aws.S3({ apiVersion: "2006-03-01" });
const fs = require("fs");
const execSync = require("child_process").execSync;
process.env.PATH += ":/var/task/bin";

exports.handler = async (event, context) => {
  console.log("Received event:", JSON.stringify(event));

  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  const extension = key.split("/")[key.split("/").length - 1].split(".")[1];
  const filename = key.split("/")[key.split("/").length - 1].split(".")[0];
  const params = {
    Bucket: bucket,
    Key: key,
  };
  const message =
    "extension : " +
    extension +
    ", filename : " +
    filename +
    ", Bucket : " +
    params.Bucket +
    ", key : " +
    params.Key;
  console.log(message);

  const uploaded_data = await s3
    .getObject(params)
    .promise()
    .catch((err) => {
      console.log(err);
      const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
      console.log(message);
      throw new Error(message);
    });

  fs.writeFileSync("/tmp/" + filename + "." + extension, uploaded_data.Body);

  let ffmpegCommand = "";
  if (extension == "png") {
    ffmpegCommand =
      "ffmpeg -i /tmp/" + filename + ".png -q 3 /tmp/" + filename + ".jpg";
  } else if (extension == "gif") {
    ffmpegCommand =
      "ffmpeg -i /tmp/" + filename + ".gif /tmp/" + filename + ".jpg";
  } else if (extension == "jpeg") {
    ffmpegCommand =
      "ffmpeg -i /tmp/" + filename + ".jpeg /tmp/" + filename + ".jpg";
  } else if (extension == "jpg") {
    const fileStream = fs.createReadStream("/tmp/" + filename + ".jpg");
    fileStream.on("error", function (error) {
      console.log(error);
      throw new Error(error);
    });
    await s3
      .putObject({
        Bucket: "droptune-test01",
        Key: key.replace(extension, "jpg"),
        Body: fileStream,
        ContentType: "image/jpeg",
      })
      .promise(() => {
        const message = key.replace(extension, "jpg");
        console.log(message);
      })
      .catch((err) => {
        console.log(err);
        const message = `Error putting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
        console.log(message);
        throw new Error(message);
      });

    fs.unlinkSync("/tmp/" + filename + ".jpg", uploaded_data.Body);

    await s3.deleteObject(params).promise();

    return `Success getting and putting object ${key} from bucket ${bucket}.`;
  }

  execSync(ffmpegCommand);

  const fileStream = fs.createReadStream("/tmp/" + filename + ".jpg");
  fileStream.on("error", function (error) {
    console.log(error);
    throw new Error(error);
  });

  await s3
    .putObject({
      Bucket: "droptune-test01",
      Key: key.replace(extension, "jpg"),
      Body: fileStream,
      ContentType: "image/jpg",
    })
    .promise(() => {
      const message = key.replace(extension, "jpg");
      console.log(message);
    })
    .catch((err) => {
      console.log(err);
      const message = `Error putting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
      console.log(message);
      throw new Error(message);
    });

  fs.unlinkSync("/tmp/" + filename + "." + extension, uploaded_data.Body);
  fs.unlinkSync("/tmp/" + filename + ".jpg", uploaded_data.Body);

  await s3.deleteObject(params).promise();

  return `Success getting and putting object ${key} from bucket ${bucket}.`;
};
