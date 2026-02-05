import type { APIRoute } from "astro";
import { Upload } from "@aws-sdk/lib-storage";
import {S3Client} from "@aws-sdk/client-s3";
export const POST:APIRoute = async (context) => {
    try {
        const body = await context.request.formData();
        const file = body.get("file") as File;
        if (!file) {
            return new Response(JSON.stringify({ error: "No se envió ningun archivo" }), { status: 400, headers: { "Content-Type": "application/json" } });
        }

        const env = (context.locals as any).runtime.env;

        const clave = `imagenes/${Date.now()}-${file.name}`;
        const bucket = env.R2_BUCKET_NAME;
        const token = env.R2_TOKEN_VALUE;
        const accessKey = env.R2_ACCESS_KEY;
        const secretKey = env.R2_SECRET_KEY;
        const cdnUrl = env.R2_CDN_URL;

        const s3 = new S3Client({
            region: "auto",
            endpoint: cdnUrl,
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretKey,
            },
        });

        const subida = new Upload({
            client: s3,
            params: {
                Bucket: bucket,
                Key: clave,
                Body: file.stream(),
                ACL: "private",
                ContentType: file.type,
            },
            queueSize:4, 
            leavePartsOnError: false,
        });

        await subida.done();

        return new Response(JSON.stringify({ clave }), { status: 200, headers: { "Content-Type": "application/json" } });
         
    } catch (error) {
        
        return new Response(JSON.stringify({ error: "Error al subir el archivo, " + error }), { status: 500, headers: { "Content-Type": "application/json" } });   
    }
}