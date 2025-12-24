export interface Article{
    _id?: string;
    title: string;
    body: string;
    isPublished?: boolean | false;
    imageUrl?: string | null;
    author?: {fullname: string, email: string, _id: string} | null;
    authorName?: string;
}