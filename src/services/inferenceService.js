const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()

        const classes = ['Cancer', 'Non-cancer'];

        const prediction = model.predict(tensor);
        const predictionValue = prediction.dataSync()[0];
        let label, suggestion;

        if (predictionValue >= 0.5) {
            label = classes[0]; // "Cancer"
            suggestion = "Segera periksa ke dokter!";
        } 
        else {
            label = classes[1]; // "Non-cancer"
            suggestion = "Anda sehat!";
        }

        return { label, suggestion };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan dalam melakukan prediksi`)
    }
}

module.exports = predictClassification;