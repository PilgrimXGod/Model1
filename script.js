let model;

async function loadModel() {
    // Завантаження моделі
    model = await tf.loadLayersModel('tfjs_model/model.json');
    console.log("Model loaded");
}

function preprocessInput(text, tokenizer, maxLength) {
    // Токенізація тексту
    const words = text.toLowerCase().split(/\s+/);
    const sequence = words.map(word => tokenizer[word] || tokenizer["<OOV>"]);
    // Доповнення до maxLength
    const paddedSequence = Array(maxLength).fill(0);
    for (let i = 0; i < Math.min(sequence.length, maxLength); i++) {
        paddedSequence[i] = sequence[i];
    }
    return tf.tensor2d([paddedSequence]);
}

async function predictNewsCategory() {
    const inputText = document.getElementById("news-input").value;

    if (!inputText.trim()) {
        alert("Please enter some text!");
        return;
    }

    const inputTensor = preprocessInput(inputText, tokenizer, 100); // 100 - MAX_LENGTH
    const prediction = model.predict(inputTensor);
    const probabilities = prediction.arraySync()[0];
    const maxIndex = probabilities.indexOf(Math.max(...probabilities));

    document.getElementById("result").textContent = `Predicted category: ${classNames[maxIndex]} (${(probabilities[maxIndex] * 100).toFixed(2)}%)`;
}

document.getElementById("predict-btn").addEventListener("click", predictNewsCategory);

// Завантаження моделі під час запуску сторінки
loadModel();

// Замінити токенайзер і назви класів на ті, що використовуються у вашій моделі
const tokenizer = {
    "<OOV>": 1,
    "example": 2,
    "news": 3,
    "headline": 4
};

const classNames = ["World", "Sports", "Business", "Sci/Tech"];
