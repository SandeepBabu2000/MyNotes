export type Note = {
  id: string;
  title: string;
  content: string;
  lastEdited: Date;
  ownerId: number;
  owner: {
    id: number;
    email: string;
  };
};

export type AddNote = {
  title: string;
  content: string;
};
