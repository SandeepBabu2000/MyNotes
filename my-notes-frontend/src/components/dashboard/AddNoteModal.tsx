import { useState, useRef } from "react";
import CloseIcon from "../../assets/icons/CloseIcon.png";
import {
  BtnBold,
  BtnItalic,
  BtnUnderline,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import { noteService } from "../../services/notesServices/NoteServices";

interface AddNoteModalProps {
  onAdd: () => void;
  onClose: () => void;
}

export default function AddNoteModal({ onAdd, onClose }: AddNoteModalProps) {
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] p-3 overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-700">Add New Note</h2>
            <div
              onClick={handleClose}
              className="cursor-pointer hover:scale-110 transition-transform duration-200"
            >
              <img src={CloseIcon} alt="Close" className="w-8 h-8" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col items-start">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter note title..."
                  required
                />
              </div>

              <div className="flex flex-col items-start">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-2 "
                >
                  Content
                </label>
                <Editor
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{
                    minHeight: "200px",
                    height: "300px",
                    minWidth: "600px",
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

          <div className="flex items-center justify-end space-x-3 pt-2 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!title.trim() || !content.trim()}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md transition-colors duration-200"
            >
              Create Note
            </button>
          </div>
        </div>
      </div>
    </EditorProvider>
  );
}
