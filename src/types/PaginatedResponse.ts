import type { Post } from './Post';

export interface PaginatedResponse {
    items: Post[];
    totalItems: number;
}