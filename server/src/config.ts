import dotenv from "dotenv";
import AWS from "aws-sdk";

const envFound = dotenv.config();

if(envFound.error) {
    throw new Error('.env를 찾을수 엄서용');
}

if(process.env.MONGODB_URI === undefined) {
    throw new Error('MONGODB_URI를 설정해주세용');
}

const PORT = parseInt(process.env.PORT ?? '8000');
const MONGODB_URI = process.env.MONGODB_URI;
const s3AccessKey = process.env.S3_ACCESS_KEY;
const s3SecretKey = process.env.S3_SECRET_KEY;
const bucketName = process.env.BUCKET_NAME;
const secretKey = process.env.JWT_SECRET_KEY as string;
const SMTPID = process.env.SMTPID;
const SMTPPW = process.env.SMTPPW;

const storage: AWS.S3 = new AWS.S3({
    credentials: {
        accessKeyId: s3AccessKey as string,
        secretAccessKey: s3SecretKey as string,
    },
    region: 'ap-northeast-2',
})

export {
    PORT,
    MONGODB_URI,
    s3AccessKey,
    s3SecretKey,
    bucketName,
    storage,
    secretKey,
    SMTPID,
    SMTPPW
}