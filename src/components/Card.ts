import type Post from '../types/Post';

export default function Card({ post }: { post: Post }) {
    return `
        <div class="card">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <small>ID: ${post.id}</small>
        </div>
    `;
}