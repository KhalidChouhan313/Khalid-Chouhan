export interface BlogPayload {
  title: string;
  description: string;
  image: string;
  data: [];
}
export interface BlogFormValues {
  title: string;
  content: string;
  image: FileList;
}
export interface BlogTypes {
  _id: string;
  title: string;
  description: string;
  image: string;
  views: number;
  createdAt: string;
}

export interface BlogResponse {
  data: BlogTypes[];
}
