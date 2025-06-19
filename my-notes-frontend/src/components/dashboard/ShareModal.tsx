import { useState } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import type { Note } from "../../types/CommonTypes";
import { noteService } from "../../services/notesServices/NoteServices";
import { toast } from "react-toastify";
import { closeShareModal } from "../../store/slices/uiSlice";
import { useAppDispatch } from "../../store/hooks";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note;
  onShare: () => void;
}

export default function ShareModal({
  isOpen,
  onClose,
  note,
  onShare,
}: ShareModalProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useAppDispatch();
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleShare = async () => {
    if (!email.trim()) {
      setError("Please enter an email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await noteService.shareNote(note.id, email);
      if (response.status === 200) {
        setEmail("");
        toast.success(response.message || "Note shared successfully");
        onShare();
        dispatch(closeShareModal());
      } else {
        toast.error(response.message || "Failed to share note");
      }
    } catch (err: unknown) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to share note. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    setSuccess("");
    dispatch(closeShareModal());
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Share Note"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          Share "<span className="font-semibold">{note.title}</span>" with
          someone
        </div>

        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address..."
          error={error}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleShare();
            }
          }}
        />

        {success && (
          <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md">
            {success}
          </div>
        )}

        <div className="flex items-center justify-end space-x-3 pt-4">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleShare} disabled={isLoading || !email.trim()}>
            {isLoading ? "Sharing..." : "Share"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
