const { Firestore } = require('@google-cloud/firestore');

async function getHistories() {
    const db = new Firestore();

    const predictCollection = db.collection('Predictions');
    const snapshot = await predictCollection.get();
    const histories = [];

    snapshot.forEach((doc) => {
        const historyData = doc.data();
        const history = {
            id: doc.id,
            history: {
                result: historyData.result,
                createdAt: historyData.createdAt,
                suggestion: historyData.suggestion,
                id: doc.id
            }
        };
        histories.push(history);
    });

    return histories;
}

module.exports = getHistories;
