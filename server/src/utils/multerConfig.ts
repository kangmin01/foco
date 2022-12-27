import { Request } from "express"; 
import multer from "multer";
const multerS3 = require("multer-s3-transform");
import { bucketName, s3AccessKey, s3SecretKey } from "../config";
import { S3Client } from "@aws-sdk/client-s3";
import sharp from "sharp";

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
        acl: 'public-read-write',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        shouldTransform: true,
        transforms: [
            {
                id: "resized",
                key: function (req: Request, file: any, cb: FileNameCallback) {
                    cb(null, `${Date.now()}_${file.originalname}`);
                },
                transform: function (req: Request, file: any, cb: FileNameCallback) {
                    //cb(null, sharp().resize(100, 100));
                },
            },
        ],
    }),
    limits: {fileSize: 5 * 1024 * 1024 },
});