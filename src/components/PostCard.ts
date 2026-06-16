import type { Post } from '../types/Post';

export function createPostCard(post: Post): HTMLElement {
    const card = document.createElement('div');
    card.className = 'post-card';

    const title = document.createElement('h3');
    title.textContent = post.title;

    const body = document.createElement('p');
    body.textContent = post.body;

    card.appendChild(title);
    card.appendChild(body);

    return card;
}