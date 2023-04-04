import { v2 as cloudinary } from "cloudinary";

import fs from 'fs';

export const uploadCloudinary = async (file: any) => {

    const upload = await cloudinary.uploader.upload(file!.path, (error: any, result: any) => result);
    // cloudinary.uploader.upload é o método que utilizamos para o upload
    // req.file!.path é o caminho da nossa imagem salva pelo multer na pasta upload

    fs.unlink(file!.path, (error) => {
        if (error) {
            console.log(error)
        }
    })

    //fs é uma lib nativa do node.js para manipulação do sistema operacional
    //fs.unlink esta apagando o arquivo da pasta upload após o envio ao cloudinary

    return { upload }
}


export const getImgCloudinary = async (public_id: string) => {
    const image = cloudinary.url(public_id)


    return { image }
}