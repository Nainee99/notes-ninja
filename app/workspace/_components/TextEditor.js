"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, Save } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import { EditorToolbar } from "./EditorToolbar";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { chatSession } from "@/configs/AIModel";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

export function TextEditor() {
  const { fileId } = useParams(); // Retrieve fileId from URL params
  const { user } = useUser(); // Access user information from Clerk
  const [question, setQuestion] = useState(""); // State to store the user's question

  // Convex actions and queries
  const SearchAi = useAction(api.myActions.search); // Action for AI search
  const saveNotes = useMutation(api.notes.AddNote); // Mutation to save notes
  const getNotes = useQuery(api.notes.getNotes, { fileId }); // Query to fetch saved notes

  // Step 1: Initialize the editor with necessary extensions
  // We set up the editor with the StarterKit, placeholder extension, list extensions, and underline.
  // We also define editor content behavior, including the onUpdate callback to track the question text.
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Ask your PDF...." }),
      BulletList,
      OrderedList,
      ListItem,
      Underline,
    ],
    content: "", // Initially empty content
    editorProps: {
      attributes: {
        class:
          "focus:outline-none prose prose-invert max-w-none p-4 min-h-[10rem] overflow-y-auto",
      },
    },
    onUpdate: ({ editor }) => setQuestion(editor.getText()), // Update the question as user types
  });

  // Step 2: Load saved notes into the editor on mount
  // We fetch saved notes for the given fileId and set them as the editor's content if they exist.
  // If no notes are found, default content is set in the editor.
  useEffect(() => {
    console.log("Fetching saved notes for fileId:", fileId);
    if (getNotes) {
      console.log("getNotes response:", getNotes);
      if (getNotes.notes) {
        console.log("Setting editor content...");
        editor.commands.setContent(getNotes.notes); // Set saved notes in the editor
      } else {
        console.log("No notes found for the given fileId.");
        editor.commands.setContent("<p>No notes found. Start typing...</p>"); // Default content if no notes
      }
    }
  }, [getNotes, editor, fileId]);

  // Step 3: Handle question submission to AI model
  // When the user submits a question, we send it to the AI model using the SearchAi action.
  // We then format the question and document content into a prompt for the AI model and get a response.
  // The response is added to the editor.
  const handleQuestionSubmit = async () => {
    console.log("Submitting question:", question);
    try {
      const result = await SearchAi({ query: question, fileId });
      console.log("AI search result:", result);

      const answer = JSON.parse(result);
      const PROMPT = `
        Given the question: "${question}" 
        and the content of the document: "${answer}",
        provide a concise, relevant answer in HTML format (Only HTML content is allowed).
        Ensure the answer is well-structured and preserves the key points clearly.
      `;

      const AiModelResult = await chatSession.sendMessage(PROMPT);
      const response = await AiModelResult.response.text();
      console.log("AI Model Response:", response);
      toast("AI is working.....");

      const existingContent = editor.getHTML();
      editor.commands.setContent(existingContent + `<p>${response}</p>`); // Append AI response to editor
    } catch (error) {
      console.error("Error in SearchAi:", error);
      toast("Error in SearchAi");
    }
  };

  // Step 4: Handle saving the notes
  // We get the current content of the editor and save it using the saveNotes mutation.
  // The notes are saved with the associated fileId and user details.
  const handleSave = async () => {
    const content = editor?.getHTML() || ""; // Get the current editor content
    console.log("Saving content:", content);
    console.log("Using fileId:", fileId); // Log fileId to ensure it's correct

    try {
      await saveNotes({
        fileId,
        notes: content,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      toast("Content saved successfully");
    } catch (error) {
      console.error("Error saving notes:", error);
      toast("Error saving content");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-1/2 p-6 bg-gray-800"
    >
      <h2 className="text-2xl font-bold text-white mb-4">Ask about the PDF</h2>

      <div className="mb-4 bg-gray-700 h-[450px] rounded-lg overflow-hidden">
        {/* Step 5: Editor toolbar and editor content */}
        <EditorToolbar editor={editor} />
        <div className="h-[400px] overflow-y-auto">
          <EditorContent editor={editor} />
        </div>
      </div>

      <div className="flex space-x-4">
        {/* Step 6: Button to submit the question to the AI model */}
        <Button
          onClick={handleQuestionSubmit}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Send className="mr-2 h-4 w-4" /> Submit Question
        </Button>
        {/* Step 7: Button to save the notes */}
        <Button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Save className="mr-2 h-4 w-4" /> Save
        </Button>
      </div>
    </motion.div>
  );
}
