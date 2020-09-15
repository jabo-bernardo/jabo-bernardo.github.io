/**
 * Style Imports
 */
import '../scss/index.scss'; // Global defaults
import '../pcss/index.pcss'; // Tailwind
import 'regenerator-runtime/runtime';

const blogsParent = document.getElementById('blogs');
async function showBlogPosts() {
	const posts = await getLatestPosts();
	posts.forEach(post => {
		blogsParent.innerHTML += buildBlogTemplate(post)
	});
}

showBlogPosts();

function buildBlogTemplate(post) {
	return `
	<div class="p-4 w-1/3 md:w-full hover:shadow-lg hover:-translate-y-2 transition duration-200">
		<div class="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
			<img class="lg:h-48 md:h-36 w-full object-cover object-center" src="${post.coverImage}" alt="blog">
			<div class="p-6">
				<h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">JABO.HASHNODE.DEV</h2>
				<h1 class="title-font text-lg font-medium text-gray-900 mb-3">${post.title}</h1>
				<p class="leading-relaxed mb-3">${post.brief.slice(0, 99)}...</p>
				<div class="flex items-center flex-wrap ">
				<a href='https://jabo.hashnode.dev/${post.slug}' target='_blank' class="text-orange-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
					<svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path d="M5 12h14"></path>
					<path d="M12 5l7 7-7 7"></path>
					</svg>
				</a>
				<span class="text-gray-600 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-300">
					<svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
					<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
					<circle cx="12" cy="12" r="3"></circle>
					</svg>${post.totalReactions}
				</span>
				<span class="text-gray-600 inline-flex items-center leading-none text-sm">
					<svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
					<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
					</svg>${post.replyCount}
				</span>
				</div>
			</div>
		</div>
  	</div>
	`
}

async function fetchPostsFromHashnode() {
	const query = `
		{
			user(username: "jabo") {
			  	publication {
					posts(page: 0) {
				  		slug
				  		title
			  			brief
			  			coverImage
			  			replyCount
			  			totalReactions
					}
		  		}
			}
		}
	`
	const request = await fetch('https://api.hashnode.com', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			query
		})
	});
	const response = await request.json();
	return response.data.user.publication.posts;
}

async function getLatestPosts() {
	return (await fetchPostsFromHashnode()).slice(0, 2)
}