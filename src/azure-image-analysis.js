import { ImageAnalysisClient } from "@azure/cognitiveservices-vision-imageanalysis";

const key = process.env.VISION_KEY;
const endpoint = process.env.VISION_ENDPOINT;

const analyzeImage = async (imageUrl) => {
    const client = new ImageAnalysisClient({
      endpoint: endpoint,
      key: key,
    });
  
    const analysis = await client.analyzeImage({
      url: imageUrl,
    });
  
    return analysis;
  };
  
  export default analyzeImage;