import natural from 'natural';
import path from 'path';
import crypto from "crypto";
import fs from "fs"
import url from "url"

const saveClassificationPromise = (classifierPath, classifier) => new Promise((resolve, reject) => {
    classifier.save(classifierPath, (err) => err ? reject(err) : resolve())
})

const getHashName = (userId) => {
    const name = `${new Date().toUTCString()}${userId}`
    return crypto.createHash('md5').update(name).digest('hex');
}

export const train = async ({ masterData }) => {
    const hashName = getHashName()
    const classifier = new natural.BayesClassifier()
    const classifierFileName = `${hashName}.json`
    const publicFolderPath =  path.join(path.resolve('./'), "/public")
    const classifierFilePath = path.join(publicFolderPath, classifierFileName)

    masterData.forEach(([masterText, label]) => classifier.addDocument(masterText, label))
    classifier.train();
    try {
        if (!fs.existsSync(publicFolderPath)) fs.mkdirSync(publicFolderPath);
        await saveClassificationPromise(classifierFilePath, classifier)
        return { classifierFileName }
    } catch (error) {
        throw new Error("An error occurred while saving a file" + error)
    }
}

export const getFullUrl = (req, fileUrl) => `${req.protocol}://${req.get('host')}/public/${fileUrl}`;