"use client";

import {
  AtomicBlockUtils,
  DefaultDraftBlockRenderMap,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { convertToRaw } from "draft-js";
import Immutable from "immutable";
import React, { useEffect, useState } from "react";
import {
  AliwangwangOutlined,
  BoldOutlined,
  CodeOutlined,
  FileImageOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import PrimaryButton from "../../UI/Buttons/PrimaryButton";
import Stepper from "../../UI/Navigation/Stepper";
import { atom, useAtom } from "jotai";
import {
  editorAtom,
  ideaParsedTextAtom,
} from "@/app/utils/stateStore/ideaAtoms";

const BlockStyleButton = ({
  onToggle,
  blockType,
  label,
  toolbarState,
  setToolbarState,
  acronym,
}) => {
  const onMouseDown = (e) => {
    e.preventDefault();
    onToggle(blockType);
  };

  return (
    <button
      onMouseDown={onMouseDown}
      className={`p-2 ${
        toolbarState["blockType"] === acronym
          ? "bg-black text-white scale-110 p-3"
          : null
      }`}
      // if block type is already set, deset it also
      onClick={() =>
        setToolbarState({
          ...toolbarState,
          blockType:
            toolbarState["blockType"] === acronym ? "unstyled" : acronym,
        })
      }
    >
      {label}
    </button>
  );
};

const StyleButton = ({
  onToggle,
  style,
  label,
  toolbarState,
  stateAcronym,
  setToolbarState,
}) => {
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        onToggle(style);
      }}
      className={`px-2 py-2 transition-all ${
        toolbarState[`is${stateAcronym}`]
          ? `bg-black scale-110 p-3 text-white`
          : null
      }`}
      onClick={() =>
        setToolbarState({
          ...toolbarState,
          [`is${stateAcronym}`]: !toolbarState[`is${stateAcronym}`],
        })
      }
    >
      {label}
    </button>
  );
};

const ImageComponent = ({ block, contentState }) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, alt } = entity.getData();
  return <img src={src} alt={alt} style={{ maxWidth: "100%" }} />;
};

function blockRendererFn(block, { getEditorState }) {
  if (block.getType() === "atomic") {
    const contentState = getEditorState().getCurrentContent();
    const entity = contentState.getEntity(block.getEntityAt(0));
    const entityType = entity.getType();

    if (entityType === "IMAGE") {
      return {
        component: ImageComponent,
        editable: false, // Images should not be editable
        props: {
          contentState: contentState,
          block: block,
        },
      };
    }
  }

  return null;
}

function insertImage(editorState, url, altText) {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    "IMAGE",
    "IMMUTABLE",
    { src: url, alt: altText }
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });

  return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
}

const ImageAddButton = ({ editorState, setEditorState }) => {
  const addImage = () => {
    const url = window.prompt("Enter image URL");
    const alt = window.prompt("Enter alt text");
    if (url) {
      setEditorState(insertImage(editorState, url, alt));
    }
  };

  return (
    <button onClick={addImage} className="btm-shadow px-2 py-1 ">
      <FileImageOutlined />
    </button>
  );
};

const updateToolbarState = (editorState, setToolbarState) => {
  const inlineStyles = editorState.getCurrentInlineStyle();
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  setToolbarState({
    isBold: inlineStyles.has("BOLD"),
    isItalic: inlineStyles.has("ITALIC"),
    // ... other styles
    blockType: blockType,
  });
};

const Toolbar = ({
  onToggleInline,
  onToggleBlock,
  editorState,
  setEditorState,
  toolbarState,
  setToolbarState,
}) => {
  // Call this function whenever the editor state changes

  return (
    <div className="flex items-center w-full justify-between px-6 mb-3 border-b-1 border-dashed border-black py-3">
      <StyleButton
        onToggle={onToggleInline}
        style="BOLD"
        label={<BoldOutlined />}
        toolbarState={toolbarState}
        stateAcronym={"Bold"}
        setToolbarState={setToolbarState}
      />
      <StyleButton
        onToggle={onToggleInline}
        style="ITALIC"
        label={<ItalicOutlined />}
        toolbarState={toolbarState}
        stateAcronym={"Italic"}
        setToolbarState={setToolbarState}
      />
      <BlockStyleButton
        onToggle={onToggleBlock}
        blockType="unordered-list-item"
        label={<UnorderedListOutlined />}
        toolbarState={toolbarState}
        setToolbarState={setToolbarState}
        acronym={"unordered-list-item"}
      />
      <BlockStyleButton
        onToggle={onToggleBlock}
        blockType="ordered-list-item"
        label={<OrderedListOutlined />}
        toolbarState={toolbarState}
        setToolbarState={setToolbarState}
        acronym={"ordered-list-item"}
      />
      <BlockStyleButton
        onToggle={onToggleBlock}
        blockType="code-block"
        label={<CodeOutlined />}
        toolbarState={toolbarState}
        setToolbarState={setToolbarState}
        acronym={"code-block"}
      />

      <ImageAddButton
        editorState={editorState}
        setEditorState={setEditorState}
      />

      {/* Add more buttons for other styles and blocks */}
    </div>
  );
};

const RichtextEditor = () => {
  const [parsedText, setParsedText] = useAtom(ideaParsedTextAtom);
  const [editorState, setEditorState] = useAtom(editorAtom);

  const [mount, setMount] = useState(false);
  const [toolbarState, setToolbarState] = useState({
    isBold: false,
    isItalic: false,
    // ... other styles
    blockType: "unstyled",
  });

  useEffect(() => {
    setMount(true);
  }, []);

  const parseEditorContent = (editorState) => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    let parsedContent = "";

    rawContent.blocks.forEach((block) => {
      switch (block.type) {
        case "unstyled":
          parsedContent += block.text + "\n";
          break;
        case "unordered-list-item":
        case "ordered-list-item":
          parsedContent += `• ${block.text}\n`; // Replace with numbers for ordered list if needed
          break;
        case "code-block":
          parsedContent += `Code block string '${block.text}'\n`;
          break;
        case "atomic":
          const entityKey = block.entityRanges[0]?.key;
          const entity = rawContent.entityMap[entityKey];
          if (entity && entity.type === "IMAGE") {
            const { src } = entity.data;
            parsedContent += `Image url: '${src}'\n`;
          }
          break;
        default:
          parsedContent += block.text + "\n";
          break;
      }

      // Handling inline styles (like strong)
      if (block.inlineStyleRanges.length > 0) {
        block.inlineStyleRanges.forEach((styleRange) => {
          if (styleRange.style === "BOLD") {
            const start = styleRange.offset;
            const end = start + styleRange.length;
            const boldText = block.text.slice(start, end);
            parsedContent = parsedContent.replace(
              boldText,
              `Emphasized point: ${boldText}`
            );
          }
        });
      }
    });

    return parsedContent;
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleParse = () => {
    const parsedContent = parseEditorContent(editorState);
    console.log(parsedContent);
    setParsedText(parsedContent);
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <div className="mx-12 my-4 border-1 rounded-2xl border-black pb-2 editor w-full">
      <Toolbar
        onToggleInline={toggleInlineStyle}
        onToggleBlock={toggleBlockType}
        editorState={editorState}
        setEditorState={setEditorState}
        toolbarState={toolbarState}
        setToolbarState={setToolbarState}
      />
      {mount && (
        <div className="px-4 h-80 overflow-y-auto">
          <Editor
            editorState={editorState}
            onChange={(state) => {
              setEditorState(state);
              updateToolbarState(state, setToolbarState);
            }}
            blockRendererFn={(block) =>
              blockRendererFn(block, { getEditorState: () => editorState })
            }
            handleKeyCommand={handleKeyCommand}
          />
        </div>
      )}

      <div className="my-3 py-2 px-6 border-y-1 border-black flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3">Live</div>
          <div className="flex items-center gap-2">
            <AliwangwangOutlined />
            <AliwangwangOutlined />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AliwangwangOutlined />
          <AliwangwangOutlined />
          <AliwangwangOutlined />
        </div>
      </div>

      <div className="flex items-center justify-around pb-2">
        <PrimaryButton onClick={() => handleParse()} className={"ml-4"}>
          Parse
        </PrimaryButton>
      </div>
    </div>
  );
};

export default RichtextEditor;
