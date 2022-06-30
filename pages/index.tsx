import type { NextPage } from "next";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot, $getSelection, EditorState } from "lexical";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Editor />
    </div>
  );
};

function Editor() {
  return (
    <LexicalComposer
      initialConfig={{
        theme: {},
        namespace: "123",
        onError(error) {
          throw error;
        },
        nodes: [],
      }}
    >
      <div className="editor-container">
        <PlainTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<Placeholder />}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some plain text...</div>;
}

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState: EditorState) {
  console.log(editorState.toJSON());
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });
}

export default Home;
