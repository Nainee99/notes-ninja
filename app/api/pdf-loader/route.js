import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function GET(req) {
  // Extract the PDF URL from the request's query parameters
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const PDFUrl = searchParams.get("PDFUrl");
  console.log(PDFUrl);

  // Step 1: Fetch the PDF file from the provided URL
  const response = await fetch(PDFUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const pdf = await loader.load();

  // Concatenate all page contents from the loaded PDF
  let pdfTextContent = "";
  pdf.forEach((doc) => {
    pdfTextContent += doc.pageContent;
  });

  // Step 2: Split the concatenated text into smaller chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });
  const output = await splitter.createDocuments([pdfTextContent]);

  // Prepare a list of text chunks for the response
  const splitterList = [];
  output.forEach((doc) => {
    splitterList.push(doc.pageContent);
  });

  // Return the list of text chunks as a JSON response
  return NextResponse.json({ result: splitterList });
}

/* 
This server-side function handles GET requests to process a PDF file. It performs the following operations:
1. Extract PDF URL: Retrieves the `PDFUrl` from the incoming request's query parameters.
2. Fetch PDF Data: Downloads the PDF file from the specified URL and loads its content using `WebPDFLoader`.
3. Concatenate Text: Combines the text content from all pages of the PDF into a single string.
4. Split Text into Chunks: Utilizes `RecursiveCharacterTextSplitter` to divide the concatenated text into smaller, manageable chunks with a specified size and overlap.
5. Prepare Response: Compiles the text chunks into an array and sends them back as a JSON response.

This setup is useful for processing large PDF documents by breaking them down into smaller sections, which can then be used for tasks such as indexing, searching, or further text analysis.
*/
