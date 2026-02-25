import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Heading2, Heading3, List, ListOrdered, Quote } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const exec = (command: string, val?: string) => {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const formatBlock = (tag: string) => {
    document.execCommand("formatBlock", false, tag);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="border border-input rounded-xl overflow-hidden bg-background">
      <div className="flex items-center gap-1 p-2 border-b border-border/50 bg-muted/30 flex-wrap">
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => exec("bold")}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => exec("italic")}>
          <Italic className="h-4 w-4" />
        </Button>
        <div className="w-px h-5 bg-border/50 mx-1" />
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => formatBlock("h2")}>
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => formatBlock("h3")}>
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => formatBlock("p")}>
          <span className="text-xs font-medium">P</span>
        </Button>
        <div className="w-px h-5 bg-border/50 mx-1" />
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => exec("insertUnorderedList")}>
          <List className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => exec("insertOrderedList")}>
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => formatBlock("blockquote")}>
          <Quote className="h-4 w-4" />
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[300px] p-4 outline-none prose prose-sm max-w-none text-foreground [&_h2]:text-xl [&_h2]:font-display [&_h2]:font-medium [&_h2]:mt-6 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-display [&_h3]:font-medium [&_h3]:mt-4 [&_h3]:mb-2 [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground"
        onInput={() => {
          if (editorRef.current) onChange(editorRef.current.innerHTML);
        }}
        dangerouslySetInnerHTML={{ __html: value }}
        suppressContentEditableWarning
      />
    </div>
  );
};

export default RichTextEditor;
