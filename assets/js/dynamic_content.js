
/*
	Returns an HTML card with the content
	from the lore object
*/
export function getLoreCard(lore) {
	/*
		lore: {
			name,
			imagePath,
			description,
			category
		}
	*/

	let name = lore.name;
	let imagePath = lore.imagePath;

	let cardDivString = 
		`<div class="p-2 col-6 col-md-4 col-lg-3">
	        <div class="card p-0">
	            <img src=${imagePath} alt="Imagem de ${name}" class="card-img-top">
	            <div class="card-body text-center">
	                <a class="card-title">${name}</a>
	            </div>
	        </div>
	    </div>`;

	return $(cardDivString);
}