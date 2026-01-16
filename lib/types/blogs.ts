export interface BlogPayload {
  title: string;
  description: string;
  image: string;
}
export interface BlogFormValues {
  title: string;
  content: string;
  image: FileList;
}
