export type imgBBPhoto = {
  data: {
    expiration?: string;
    url: string;
  };
};

export type Photo = {
  uploaderName: string;
  uploaderEmail: string;
  photoUrl: string;
  description?: string;
  createdAt?: Date;
  expiresAt?: string;
  upVoteCount?: number;
  comment?: string[];
};
