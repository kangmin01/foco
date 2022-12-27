import { Request } from "express"; 
import multer from "multer";
import multerS3 from "multer-s3";
import { bucketName, s3AccessKey, s3SecretKey } from "../config";
import { S3Client } from "@aws-sdk/client-s3";

type FileNameCallback = (error: Error | null, filename: string) => void

export const uploads = multer({
    storage: multerS3({
        s3: new S3Client({
            credentials: {
                accessKeyId: s3AccessKey as string,
                secretAccessKey: s3SecretKey as string,
            },
            region: 'ap-northeast-2',
        }),
        bucket: bucketName as string,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req: Request, file: any, cb: FileNameCallback) {
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024 },
});