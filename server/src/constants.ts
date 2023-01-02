interface EndPointInterface {
    post: string;
    user: string;
    bookmark: string;
}

export const endPoint: EndPointInterface = {
    post: '/api/post',
    user: '/api/user',
    bookmark: '/api/bookmark',
}