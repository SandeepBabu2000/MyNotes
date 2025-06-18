import { useState } from "react";
import type { Note } from "../../types/CommonTypes";
import CloseIcon from "../../assets/icons/CloseIcon.png";
import {
  BtnBold,
  BtnItalic,
  BtnUnderline,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import { noteService } from "../../services/notesServices/noteServices";
import ShareIcon from "../../assets/icons/ShareIcon.png";
import DeleteIcon from "../../assets/icons/DeleteIcon.png";
import EditIcon from "../../assets/icons/EditIcon.png";

interface NoteModalProps {
  note: Note;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export default function NoteModal({
  note,
  onClose,
  onDelete,
  onEdit,
}: NoteModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [lastEdited, setLastEdited] = useState(note.lastEdited);

  const handleSave = async () => {
    if (editTitle.trim() && editContent.trim()) {
      const editedNote = await noteService.updateNote({
        id: note.id,
        title: editTitle.trim(),
        content: editContent.trim(),
        lastEdited: new Date(),
      });
      setLastEdited(editedNote.lastEdited);
      onEdit();
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    noteService.deleteNote(note.id);
    onDelete();
  };

  const handleClose = () => {
    if (
      isEditing &&
      (editTitle !== note.title || editContent !== note.content)
    ) {
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
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden p-3">
          <div className="flex items-center justify-between  ">
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="text-2xl font-bold text-gray-900 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                placeholder="Enter title..."
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-900">{editTitle}</h2>
            )}
            <div
              onClick={handleClose}
              className="cursor-pointer hover:scale-110 transition-transform duration-200"
            >
              <img src={CloseIcon} alt="Close" className="w-8 h-8" />
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {isEditing ? (
              <Editor
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                style={{
                  minHeight: "200px",
                  height: "300px",
                }}
              >
                <Toolbar>
                  <BtnBold />
                  <BtnItalic />
                  <BtnUnderline />
                </Toolbar>
              </Editor>
            ) : (
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {editContent}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 ">
            <div className="text-sm text-gray-500">
              <span>
                Last Updated:{" "}
                {new Date(lastEdited).toLocaleString([], {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!editTitle.trim() || !editContent.trim()}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md transition-colors duration-200"
                  >
                    Save
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-5">
                  <div
                    onClick={() => setIsEditing(true)}
                    className="cursor-pointer hover:scale-110 transition-transform duration-200"
                  >
                    <img src={EditIcon} alt="Edit" className="w-6 h-6" />
                  </div>
                  <div
                    onClick={() => {}}
                    className="cursor-pointer hover:scale-110 transition-transform duration-200"
                  >
                    <img src={ShareIcon} alt="Edit" className="w-6 h-6" />
                  </div>
                  <div
                    onClick={handleDelete}
                    className="cursor-pointer hover:scale-110 transition-transform duration-200"
                  >
                    <img src={DeleteIcon} alt="Delete" className="w-6 h-6" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </EditorProvider>
  );
}
