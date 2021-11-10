import aws from 'aws-sdk';
import env from 'dotenv';

env.config();
const { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, AWS_UPLOAD_BUCKET, AWS_REGION } = process.env;

aws.config.update({
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  accessKeyId: AWS_ACCESS_KEY_ID,
  region: AWS_REGION,
});

const s3 = new aws.S3({ params: { Bucket: AWS_UPLOAD_BUCKET } });


export { s3 };