export type postsState={
    posts:null | [Post] ,
    postDetails:null | Post
}
export type commentsState={
    comments:[] | [Comments],
}
export interface ApiResponse{
    message:string;
    paginationInfo:PaginationInfo;
    posts:Post[];
}

export interface PaginationInfo{
  currentPage:number;
  numberOfPages:  number;
  limit:number;
  nextPage:number | null;
  total:number;
}

export interface Post{
    _id:string;
    body:string;
    image:string;
    user:User;
    createdAt:string;
    comments:Comments[];
    id:string;
}
export interface User{
    _id:string;
    name:string;
    photo:string;

}

export interface Comments{
    _id:string;
    content:string;
    commentCreator:User;
    post:string;
    createdAt:string;
}