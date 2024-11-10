// app/workspace/_components/TextEditor.jsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import { EditorToolbar } from "./EditorToolbar";

export function TextEditor() {
  const [question, setQuestion] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Ask your PDF....",
      }),
      BulletList,
      OrderedList,
      ListItem,
      Underline,
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "focus:outline-none prose prose-invert max-w-none p-4 min-h-[10rem]",
      },
    },
    onUpdate: ({ editor }) => {
      setQuestion(editor.getText());
    },
  });

  const handleQuestionSubmit = () => {
    console.log("Question submitted:", question);
    if (editor) {
      editor.commands.setContent("");
    }
    setQuestion("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-1/2 p-6 bg-gray-800"
    >
      <h2 className="text-2xl font-bold text-white mb-4">Ask about the PDF</h2>
      <div className="mb-4 bg-gray-700 rounded-lg overflow-hidden">
        <EditorToolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      <Button
        onClick={handleQuestionSubmit}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        <Send className="mr-2 h-4 w-4" /> Submit Question
      </Button>
    </motion.div>
  );
}
