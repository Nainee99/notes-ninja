"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading2,
} from "lucide-react";

export function EditorToolbar({ editor }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex space-x-2 mb-2 p-2 bg-gray-800 border-b border-gray-700">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold") ? "bg-purple-700 text-white" : "text-gray-300"
        }
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "bg-purple-700 text-white"
            : "text-gray-300"
        }
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={
          editor.isActive("underline")
            ? "bg-purple-700 text-white"
            : "text-gray-300"
        }
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "bg-purple-700 text-white"
            : "text-gray-300"
        }
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "bg-purple-700 text-white"
            : "text-gray-300"
        }
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "bg-purple-700 text-white"
            : "text-gray-300"
        }
      >
        <Heading2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
