interface EndPointInterface {
    post: string;
    user: string;
    bookmark: string;
}

export const endPoint: EndPointInterface = {
    post: '/post',
    user: '/user',
    bookmark: '/bookmark',
}