let model;

async function loadModel() {
    try {
        model = await tf.loadLayersModel('tfjs_model/model.json');
        console.log('Model loaded successfully');
    } catch (error) {
        console.error('Error loading the model:', error);
    }
}

document.getElementById('predict-btn').addEventListener('click', async () => {
    if (!model) {
        console.error('Model is not loaded yet!');
        return;
    }

    const inputText = document.getElementById('news-input').value;
    const processedInput = preprocessInput(inputText);

    const prediction = await model.predict(processedInput);
    const result = await prediction.array();
    console.log('Prediction:', result);
    document.getElementById('result').innerText = JSON.stringify(result);
});

function preprocessInput(text) {
    // Tokenize and prepare the input text into a tensor format
    const tensor = tf.tensor2d([[1, 2, 3, 4, 0, 0, 0, 0, 0, 0]]); // Replace this with your tokenization logic
    return tensor;
}

// Load the model when the page loads
loadModel();
