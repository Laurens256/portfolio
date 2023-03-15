import React from 'react';

export default function Home({ posts }: any) {
	return (
		<div>
			<h1>Latest Posts</h1>
			<ul>
				{posts.map((post: any) => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
		</div>
	);
}

export async function getStaticProps() {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	const posts = await response.json();

	return {
		props: {
			posts
		}
	};
}
