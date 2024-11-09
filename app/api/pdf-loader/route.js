import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
const PDFUrl =
  "https://robust-panther-449.convex.cloud/api/storage/1f648b97-ce82-4e89-b91c-e1eb5e409b55";
export async function GET(req) {
  //1. load the pdf file
  const response = await fetch(PDFUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const pdf = await loader.load();

  let pdfTextContent = "";
  pdf.forEach((doc) => {
    pdfTextContent = pdfTextContent + doc.pageContent;
  });

  //2. split the text into smaller chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });
  const output = await splitter.createDocuments([pdfTextContent]);

  const splitterList = [];
  output.forEach((doc) => {
    splitterList.push(doc.pageContent);
  });

  return NextResponse.json({ result: splitterList });
}
