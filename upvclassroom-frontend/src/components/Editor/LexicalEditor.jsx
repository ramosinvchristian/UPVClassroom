import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./ToolbarPlugin";
import { $generateHtmlFromNodes } from '@lexical/html';

const editorConfig = {
  namespace: "ClassroomEditor",
  nodes: [
    HeadingNode,
    QuoteNode,
    ListItemNode,
    ListNode,
    LinkNode
  ],
  onError(error) {
    console.error(error);
  },
  theme: {
    text: {
      bold: "font-bold",
      italic: "italic",
      underline: "underline",
      strikethrough: "line-through"
    },
    link: "text-blue-600 hover:underline",
    heading: {
      h1: "text-2xl font-bold",
      h2: "text-xl font-bold",
      h3: "text-lg font-bold"
    }
  }
};

export default function LexicalEditor({ onChange }) {
  const handleChange = (editorState) => {
    editorState.read(() => {
      const html = $generateHtmlFromNodes(editorState);
      onChange(html);
    });
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <ToolbarPlugin />
        <div className="relative bg-white">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[200px] p-4 focus:outline-none" />
            }
            placeholder={
              <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
                Escribe el contenido del aviso aquí...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <LinkPlugin />
          <ListPlugin />
          <OnChangePlugin onChange={handleChange} />
        </div>
      </div>
    </LexicalComposer>
  );
}