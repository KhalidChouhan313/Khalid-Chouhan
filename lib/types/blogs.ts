export interface Blog {
  _id: string;
  slug?: string;
  title: string;
  description: string;
  image: string;
  views: number;
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

/** Text fields only; the cover image is tracked separately as a File. */
export interface BlogFormValues {
  title: string;
  content: string;
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

export interface SingleBlogResponse {
  success: boolean;
  message?: string;
  data?: Blog;
}
