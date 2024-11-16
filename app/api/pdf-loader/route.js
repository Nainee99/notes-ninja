import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function GET(req) {
  // Extract the PDF URL from the request's query parameters
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const PDFUrl = searchParams.get("PDFUrl");
  console.log(PDFUrl);

  /**
   * Step 1: Fetch the PDF file from the provided URL.
   * - The PDF file is fetched from the URL passed in the query parameter `PDFUrl`.
   * - A `WebPDFLoader` is used to load the fetched file as a PDF document.
   */
  const response = await fetch(PDFUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const pdf = await loader.load();

  // Concatenate all page contents from the loaded PDF
  let pdfTextContent = "";
  pdf.forEach((doc) => {
    pdfTextContent += doc.pageContent;
  });

  /**
   * Step 2: Split the concatenated text into smaller chunks.
   * - The concatenated text from all the PDF pages is split into smaller, manageable chunks.
   * - The `RecursiveCharacterTextSplitter` is configured with a `chunkSize` of 100 characters and a `chunkOverlap` of 20 characters to ensure smoother transitions between chunks.
   */
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });
  const output = await splitter.createDocuments([pdfTextContent]);

  /**
   * Step 3: Prepare a list of text chunks for the response.
   * - The output, which contains the split text chunks, is processed and pushed into an array (`splitterList`).
   */
  const splitterList = [];
  output.forEach((doc) => {
    splitterList.push(doc.pageContent);
  });

  // Return the list of text chunks as a JSON response
  return NextResponse.json({ result: splitterList });
}

/* 
This server-side function processes a PDF file provided via a query parameter and splits its content into smaller chunks. 

Steps:
1. **Extract PDF URL**: Retrieves the URL of the PDF file from the request query.
2. **Fetch PDF Data**: Downloads the PDF from the provided URL using `fetch` and loads it using `WebPDFLoader`.
3. **Concatenate Text**: Combines text from all pages into a single string for easier processing.
4. **Split Text**: Breaks the concatenated text into chunks using `RecursiveCharacterTextSplitter`, which helps in managing large documents.
5. **Prepare Response**: Returns the split text chunks as a JSON response for further processing.

This approach allows for efficient handling and processing of large PDFs by splitting the text into smaller sections for tasks like indexing, search, or further analysis.
*/
