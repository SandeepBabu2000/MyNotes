import { useEffect, useState } from "react";
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
import ShareIcon from "../../assets/icons/ShareIcon.png";
import DeleteIcon from "../../assets/icons/DeleteIcon.png";
import EditIcon from "../../assets/icons/EditIcon.png";
import { noteService } from "../../services/notesServices/NoteServices";
import ShareModal from "./ShareModal";
import Button from "../common/Button";
import { getCurrentUserId } from "../../utils/tokenUtils";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  closeEditNoteModal,
  closeNoteModal,
  closeShareModal,
  openEditNoteModal,
  openShareModal,
} from "../../store/slices/uiSlice";
import socket from "./socket";

interface NoteModalProps {
  note: Note | null;
  onDelete: () => void;
  onEdit: () => void;
}

export default function NoteModal({ note, onDelete, onEdit }: NoteModalProps) {
  const dispatch = useAppDispatch();

  const [editTitle, setEditTitle] = useState(note?.title ?? "");
  const [editContent, setEditContent] = useState(note?.content ?? "");
  const [lastEdited, setLastEdited] = useState(note?.lastEdited ?? new Date());
  const isShareModalOpen = useAppSelector((state) => state.ui.isShareModalOpen);
  const isEditNoteModalOpen = useAppSelector(
    (state) => state.ui.isEditNoteModalOpen
  );

  const currentUserId = getCurrentUserId();
  const isSharedNote = currentUserId && note?.ownerId !== currentUserId;

  useEffect(() => {
    if (note?.id) {
      socket.emit("join_note", { noteId: note.id });

      socket.on("edit_note", ({ content }) => {
        setEditContent(content);
      });

      return () => {
        socket.off("edit_note");
        socket.emit("leave_note", { noteId: note.id });
      };
    }
  }, [note?.id]);

  const handleSave = async () => {
    if (editTitle.trim() && editContent.trim() && note?.id && note?.ownerId) {
      const editedNote = await noteService.updateNote({
        id: note.id,
        title: editTitle.trim(),
        content: editContent.trim(),
        lastEdited: new Date(),
        ownerId: note.ownerId,
        owner: note?.owner,
      });
      if (editedNote.status === 200) {
        setLastEdited((editedNote.data as { lastEdited: Date }).lastEdited);
        onEdit();
        toast.success(editedNote.message || "Note updated successfully");
        dispatch(closeEditNoteModal());
      } else {
        toast.error(editedNote.message || "Note update failed");
      }
    }
  };

  const handleCancel = () => {
    setEditTitle(note?.title ?? "");
    setEditContent(note?.content ?? "");
    dispatch(closeEditNoteModal());
  };

  const handleDelete = async () => {
    const deletedNote = await noteService.deleteNote(note?.id ?? "");
    if (deletedNote.status === 204) {
      onDelete();
      toast.success(
        (deletedNote as { message?: string }).message ||
          "Note deleted successfully"
      );
    } else {
      toast.error(
        (deletedNote as { message?: string }).message || "Note deletion failed"
      );
    }
  };

  const handleClose = () => {
    dispatch(closeEditNoteModal());
    dispatch(closeNoteModal());
  };

  const handleEditorChange = (content: string) => {
    setEditContent(content);
    if (note?.id) {
      socket.emit("edit_note", { noteId: note.id, content });
    }
  };

  return (
    <EditorProvider>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full min-h-[40vh] max-h-[90vh]  overflow-hidden p-3 flex flex-col gap-3">
          <div className="flex items-center justify-between px-3">
            {isEditNoteModalOpen ? (
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
              <img src={CloseIcon} alt="Close" className="w-6 h-6" />
            </div>
          </div>

          <div className="border border-orange-500 rounded-md p-3 flex flex-col flex-1 min-h-0">
            <div className="flex items-center justify-end">
              {!isEditNoteModalOpen && (
                <div
                  onClick={() =>
                    dispatch(openEditNoteModal(note ?? ({} as Note)))
                  }
                  className="cursor-pointer hover:scale-110 transition-transform duration-200"
                >
                  <img src={EditIcon} alt="Edit" className="w-6 h-6" />
                </div>
              )}
            </div>
            <div className="overflow-y-auto flex-1 min-h-0 max-h-full">
              {isEditNoteModalOpen ? (
                <Editor
                  value={editContent}
                  onChange={(e) => handleEditorChange(e.target.value)}
                  style={{
                    minHeight: "200px",
                    height: "100%",
                    textAlign: "left",
                  }}
                >
                  <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                  </Toolbar>
                </Editor>
              ) : (
                <div
                  className="text-gray-700 leading-relaxed flex items-start h-full w-full"
                  dangerouslySetInnerHTML={{ __html: editContent }}
                ></div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
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
                {isEditNoteModalOpen ? (
                  <>
                    <Button variant="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={!editTitle.trim() || !editContent.trim()}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-5">
                    {isSharedNote ? (
                      <div className="text-gray-500 text-sm">
                        Shared by {note?.owner?.email}
                      </div>
                    ) : (
                      <>
                        <div className="text-gray-500 text-sm">
                          Shared with{" "}
                          {note?.shared?.map((user) => user.email).join(", ")}
                        </div>
                        <div
                          onClick={() => dispatch(openShareModal())}
                          className="cursor-pointer hover:scale-110 transition-transform duration-200"
                        >
                          <img
                            src={ShareIcon}
                            alt="Share"
                            className="w-6 h-6"
                          />
                        </div>
                        <div
                          onClick={handleDelete}
                          className="cursor-pointer hover:scale-110 transition-transform duration-200"
                        >
                          <img
                            src={DeleteIcon}
                            alt="Delete"
                            className="w-6 h-6"
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => dispatch(closeShareModal())}
        note={note ?? ({} as Note)}
      />
    </EditorProvider>
  );
}
