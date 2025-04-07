import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { $wrapNodes, $createHeadingNode } from "@lexical/rich-text";
import { $createLinkNode } from "@lexical/link";
import { $createListItemNode, $createListNode } from "@lexical/list";

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const formatText = (command) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, command);
      }
    });
  };

  const insertLink = () => {
    const url = prompt("Ingresa la URL:");
    if (url) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const linkNode = $createLinkNode(url);
          $wrapNodes(selection, () => linkNode);
        }
      });
    }
  };

  const formatHeading = (level) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createHeadingNode(`h${level}`));
      }
    });
  };

  const formatList = (type) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const listItem = $createListItemNode();
        const list = $createListNode(type);
        list.append(listItem);
        $wrapNodes(selection, () => list);
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border-b bg-gray-50">
      <button
        type="button"
        onClick={() => formatText("bold")}
        className="p-2 rounded hover:bg-gray-200"
        aria-label="Negrita"
      >
        <span className="font-bold">B</span>
      </button>
      <button
        type="button"
        onClick={() => formatText("italic")}
        className="p-2 rounded hover:bg-gray-200"
        aria-label="Itálica"
      >
        <span className="italic">I</span>
      </button>
      <button
        type="button"
        onClick={() => formatText("underline")}
        className="p-2 rounded hover:bg-gray-200"
        aria-label="Subrayado"
      >
        <span className="underline">U</span>
      </button>
      <div className="h-6 w-px bg-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={() => formatHeading(1)}
        className="p-2 rounded hover:bg-gray-200 text-sm"
        aria-label="Título 1"
      >
        T1
      </button>
      <button
        type="button"
        onClick={() => formatHeading(2)}
        className="p-2 rounded hover:bg-gray-200 text-sm"
        aria-label="Título 2"
      >
        T2
      </button>
      <div className="h-6 w-px bg-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={() => formatList("bullet")}
        className="p-2 rounded hover:bg-gray-200"
        aria-label="Lista con viñetas"
      >
        <span className="text-lg">•</span>
      </button>
      <button
        type="button"
        onClick={() => formatList("number")}
        className="p-2 rounded hover:bg-gray-200"
        aria-label="Lista numerada"
      >
        <span className="text-sm">1.</span>
      </button>
      <button
        type="button"
        onClick={insertLink}
        className="p-2 rounded hover:bg-gray-200"
        aria-label="Insertar enlace"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </button>
    </div>
  );
};

export default ToolbarPlugin;