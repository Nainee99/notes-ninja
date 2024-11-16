const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

/**
 * Step-by-step process for configuring the generation settings:
 * 1. **Set Model Parameters**:
 *    - Define the configuration options for the model's generation, including temperature, topP, topK, and output token limits.
 * 2. **Set Maximum Output Tokens**:
 *    - Limits the number of tokens the model will generate in a single response (8192 tokens).
 * 3. **Response MIME Type**:
 *    - Specifies that the response should be in plain text format.
 */
const generationConfig = {
  temperature: 1, // Controls randomness, higher means more creative
  topP: 0.95, // Controls diversity, values near 1 encourage more diverse responses
  topK: 40, // Limits the number of possible token candidates for each step
  maxOutputTokens: 8192, // Max number of tokens generated
  responseMimeType: "text/plain", // Specifies the format of the response
};

/**
 * Step-by-step process for starting the chat session:
 * 1. **Start Chat**:
 *    - Initializes a chat session with the model, using the defined generation configuration.
 * 2. **History**:
 *    - The conversation history is initialized as an empty array to store the conversation context as it evolves.
 */
export const chatSession = model.startChat({
  generationConfig,
  history: [],
});
