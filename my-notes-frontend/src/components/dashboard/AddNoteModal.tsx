import { useState, useRef } from "react";
import {
  BtnBold,
  BtnItalic,
  BtnUnderline,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import { noteService } from "../../services/notesServices/NoteServices";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Input from "../common/Input";

interface AddNoteModalProps {
  onAdd: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export default function AddNoteModal({
  onAdd,
  onClose,
  isOpen,
}: AddNoteModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      const response = await noteService.addNote({
        title: title.trim(),
        content: content.trim(),
      });
      onAdd();
      console.log(response);
    }
  };

  const handleClose = () => {
    const titleText = titleRef.current?.innerText || "";
    const contentText = contentRef.current?.innerHTML || "";

    if (titleText.trim() || contentText.trim()) {
      if (
        confirm("Are you sure you want to close? Your changes will be lost.")
      ) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <EditorProvider>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Add New Note"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
            required
          />

          <div className="flex flex-col items-start">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Content
            </label>
            <div className="w-full flex justify-center">
              <Editor
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  minHeight: "200px",
                  height: "300px",
                  minWidth: "650px",
                  textAlign: "left",
                }}
              >
                <Toolbar>
                  <BtnBold />
                  <BtnItalic />
                  <BtnUnderline />
                </Toolbar>
              </Editor>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim() || !content.trim()}
          >
            Create Note
          </Button>
        </div>
      </Modal>
    </EditorProvider>
  );
}
