document.addEventListener("DOMContentLoaded", function () {
    const translateButton = document.getElementById("translateButton");
    const sourceText = document.getElementById("sourceText");
    const translatedText = document.getElementById("translatedText");
    const sourceLanguage = document.getElementById("sourceLanguage");
    const targetLanguage = document.getElementById("targetLanguage");

    translateButton.addEventListener("click", translateText);

    function translateText() {
        const textToTranslate = sourceText.value;
        const selectedSourceLanguage = sourceLanguage.value;
        const selectedTargetLanguage = targetLanguage.value;

        const apiKey = 'INSERT-YOUR API KEY'; // Substitua pela sua chave de API

        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
        const data = {
            q: textToTranslate,
            source: selectedSourceLanguage,
            target: selectedTargetLanguage
        };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(handleTranslation)
        .catch(handleError);
    }

    function handleTranslation(data) {
        const translated = data.data.translations[0].translatedText;
        translatedText.innerHTML = translated.replace(/\n/g, "<br>");
        clearTranslationResult();
        displayTranslationResult(translated);
    }

    function handleError(error) {
        console.error("Erro na tradução:", error);
    }

    function clearTranslationResult() {
        translatedText.innerHTML = '';
    }

    function displayTranslationResult(translated) {
        translatedText.innerHTML = translated.replace(/\n/g, "<br>");
    }
});