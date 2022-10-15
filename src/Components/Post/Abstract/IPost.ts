export interface IPost{
    PostId: number;
    PostTitle: string;
    PostAuthor: string;
    PostContent: string;
    IsLiked: boolean;
}

export interface TestimonialCardProps {
    name: string;
    role: string;
    title: string;
    content: string;
    index: number;
}

export interface TestimonialCardPropsUser {
    name: string;
    role: string;
    title: string;
    content: string;
    avatar: string;
    index: number;
}