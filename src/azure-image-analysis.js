const key = process.env.VISION_KEY;
const endpoint = process.env.VISION_ENDPOINT;

console.log(key);
console.log(endpoint);

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
    const requestUrl = `${endpoint}computervision/imageanalysis:analyze&api-version=2023-02-01-preview&features=${visualFeatures.join(',')}`;
    log(`requesed Url = ${requestUrl}`);


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

    if(!response.ok) {
        throw new Error(`An error has occured: ${response.status}`);
    }

    const analysis = await response.json();

    return analysis;

};

export { analyzeImage };