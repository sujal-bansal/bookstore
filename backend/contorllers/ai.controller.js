import { GoogleGenAI } from "@google/genai";
import Book from "../models/book.model.js";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

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

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const prompt = `You are an assistant that helps improve book reviews with light editing.

Original book review: "${content}"

Task: Enhance this book review by making slight improvements to grammar, flow, and clarity. 
Keep the same opinions and sentiment, but make the writing more polished.
The improved version should be approximately the same length as the original.
Do not add any prefix like "Enhanced review:" - just provide the improved text directly.`;

    try {
      console.log("Calling Google Gemini API using SDK...");

      const generationConfig = {
        temperature: 0.4,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: content.length * 3,
      };

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        generationConfig,
      });

      console.log("Gemini response received");

      let refinedText = response.text;

      if (!refinedText) {
        console.log("Empty response from Gemini");
        throw new Error("Empty response from Gemini API");
      }

      refinedText = refinedText
        .replace(
          /^(Improved review:|Enhanced review:|Polished review:|Here's the improved version:|Here is the enhanced review:)/i,
          ""
        )
        .trim();

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
      console.log(refinedText);
      res.status(200).json({
        original: content,
        refined: refinedText,
      });
    } catch (error) {
      console.log("Error calling Gemini API:", error);

      let errorMessage = "Unable to refine review using Google Gemini";
      let errorDetails = error.message;

      if (error.status) {
        console.log("Error status:", error.status);

        if (error.status === 400) {
          errorMessage = "Invalid request to Gemini API";
        } else if (error.status === 401 || error.status === 403) {
          errorMessage =
            "Authentication failed for Gemini API - check your API key";
        } else if (error.status === 429) {
          errorMessage = "Rate limit exceeded for Gemini API";
        }
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
