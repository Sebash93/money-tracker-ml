import { getFullUrl, train } from './train.service';

export const trainController = async (req, res) => {
    const { masterData } = req.body;
    try {
        const { classifierFileName } = await train({ masterData })
        const classifierUrl = getFullUrl(req, classifierFileName)
        res.send({ message: 'Training Successful', classifierUrl })
    } catch (error) {
        res.send({ error })
    }
}