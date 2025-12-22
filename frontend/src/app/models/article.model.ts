export interface Article{
    _id?: string;
    title: string;
    body: string;
    isPublished?: boolean | false;
    imageUrl?: string | null;
}