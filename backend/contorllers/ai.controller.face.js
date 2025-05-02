import axios from "axios";
import Book from "../models/book.model.js";
import dotenv from "dotenv";

dotenv.config();

const HUGGING_FACE_API_TOKEN = process.env.HUGGING_FACE_API_TOKEN;

// Using DeepSeek Coder model - smaller version that should load automatically
const MODEL_URL =
  "https://api-inference.huggingface.co/models/deepseek-ai/deepseek-coder-1.3b-instruct";

// Alternative DeepSeek models you can try:
// https://api-inference.huggingface.co/models/deepseek-ai/deepseek-coder-1.3b-base;
// - https://api-inference.huggingface.co/models/deepseek-ai/deepseek-coder-1.3b-instruct
// - https://api-inference.huggingface.co/models/deepseek-ai/deepseek-math-7b-instruct

export const refineReview = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Review content is required" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Prompt for DeepSeek models
    const prompt = `You are a helpful assistant that improves book reviews.
    
Original review: ${content}

Task: Enhance this book review by making slight improvements to grammar, flow, and clarity. 
Keep the same opinions and sentiment, but make the writing more polished.
The improved version should be approximately the same length as the original.

Improved review:`;

    try {
      console.log("Calling DeepSeek model...");

      const response = await axios.post(
        MODEL_URL,
        {
          inputs: prompt,
          parameters: {
            max_new_tokens: content.length * 1.2,
            temperature: 0.5,
            top_p: 0.9,
            do_sample: true,
            return_full_text: false,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${HUGGING_FACE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );

      console.log("Model response received:", response.data);

      // Extract the generated text
      let refinedText = "";

      if (Array.isArray(response.data) && response.data.length > 0) {
        if (response.data[0]?.generated_text) {
          refinedText = response.data[0].generated_text;
        } else {
          refinedText = JSON.stringify(response.data[0]);
        }
      } else if (typeof response.data === "string") {
        refinedText = response.data;
      } else if (response.data?.generated_text) {
        refinedText = response.data.generated_text;
      } else {
        refinedText = JSON.stringify(response.data);
      }

      // Clean up the text
      refinedText = refinedText
        .replace(/^(Improved review:|Enhanced review:|Polished review:)/i, "")
        .trim();

      // If the model output is too short or identical, return an error
      if (
        refinedText === content ||
        refinedText.length < content.length * 0.7
      ) {
        console.log("Model generated inadequate content:", refinedText);
        return res.status(422).json({
          message: "The AI model failed to properly enhance the review.",
          original: content,
          modelOutput: refinedText,
        });
      }

      console.log("Successfully refined review");
      res.status(200).json({
        original: content,
        refined: refinedText,
      });
    } catch (error) {
      console.log("Error calling model API:", error);

      // Provide more detailed error information
      let errorMessage = "Unable to refine review using the selected model";
      let errorDetails = error.message;

      // Check for common Hugging Face API errors
      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);

        if (error.response.status === 503) {
          errorMessage = "Model is currently loading or not deployed";
        } else if (
          error.response.status === 401 ||
          error.response.status === 403
        ) {
          errorMessage = "Authentication failed for Hugging Face API";
          if (
            error.response.data &&
            error.response.data.error &&
            error.response.data.error.includes("too large")
          ) {
            errorMessage =
              "Selected model is too large to be loaded automatically";
          }
        }

        errorDetails = error.response.data || error.message;
      }

      return res.status(503).json({
        message: errorMessage,
        error: errorDetails,
      });
    }
  } catch (error) {
    console.log("Error in refineReview controller:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
