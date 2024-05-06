export class PostsService {
    private static posts: any[] = []

    static getAllPosts(): any[] {
        return PostsService.posts;
    }
}