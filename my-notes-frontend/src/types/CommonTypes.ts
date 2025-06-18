export type Note = {
  id: string;
  title: string;
  content: string;
  lastEdited: Date;
};

export type AddNote = {
  title: string;
  content: string;
};
