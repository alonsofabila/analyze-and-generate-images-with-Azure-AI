const key = process.env.AZURE_SECRET_VISION_KEY;
const endpoint = process.env.AZURE_SECRET_VISION_ENDPOINT;

console.log(`key = ${key}`)
console.log(`endpoint = ${endpoint}`)

// Cognitive Services API 
const visualFeatures = [
    "tags",
    "read",
    "caption",
    "denseCaptions",
    "smartCrops",
    "objects",
    "people"
];


const analyzeImage = async (imageUrl) => {
    const requestUrl = `${endpoint}computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=${visualFeatures.join(',')}`;
    console.log(`requestUrl = ${requestUrl}`)


    try {
        //Analyze the image from imageURL
        const response = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': key
            },
            body: JSON.stringify({url: imageUrl}),
            features: visualFeatures.join(',')
        });

        if (!response.ok) {
            throw new Error(`Computer Vision request failed: ${response.status} (${response.statusText})`);
        }

        const analysis = await response.json();

        return { "URL": urlToAnalyze, ...analysis};
    } catch (error) {
        console.log(error);
        throw error;
    }

};

export { analyzeImage };