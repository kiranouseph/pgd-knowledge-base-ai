import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIAXSC4OBTGGTJCWXFF",
    secretAccessKey: "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",
  },
});
const BUCKET = "pgd-react-app";

export const uploadToS3 = async (file, key) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  try {
    await s3.send(command);
  } catch (err) {
    console.log(err);
  }
};
