const key = 'c3cdae36a419425ea5b6dba2ad9c5656';
const endpoint = 'https://azure-image-analysis.cognitiveservices.azure.com/';

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

        return { "URL": imageUrl, ...analysis};
    } catch (error) {
        console.log(error);
        throw error;
    }

};

export { analyzeImage };