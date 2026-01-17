export interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogFormValues {
  title: string;
  content: string;
  image: FileList;
}

export interface BlogPayload {
  title: string;
  description: string;
  image: string;
}

export interface BlogResponse {
  success: boolean;
  message?: string;
  data?: Blog[];
}
export interface BlogsUploadProps {
  editingBlog: Blog | null;
  setEditingBlog: (blog: Blog | null) => void;
  showBlogForm: boolean;
  setShowBlogForm: (val: boolean) => void;
}
