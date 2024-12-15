let model;

async function loadModel() {
    try {
        model = await tf.loadLayersModel('tfjs_model/model.json');
        console.log('Model loaded successfully');
    } catch (error) {
        console.error('Error loading the model:', error);
    }
}

async function predictNewsCategory() {
    if (!model) {
        console.error('Model is not loaded yet!');
        return;
    }

    const inputText = document.getElementById('inputText').value;
    const processedInput = preprocessInput(inputText);

    const prediction = model.predict(processedInput);
    prediction.array().then(result => {
        console.log('Prediction:', result);
        document.getElementById('result').innerText = JSON.stringify(result);
    });
}

function preprocessInput(text) {
    // Тут потрібно токенізувати та підготувати введений текст у формат тензора
    const tensor = tf.tensor2d([[1, 2, 3, 4, 0, 0, 0, 0, 0, 0]]); // Замініть це на токенізацію
    return tensor;
}

// Завантаження моделі під час запуску сторінки
loadModel();
