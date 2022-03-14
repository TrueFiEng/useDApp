const codes = body.querySelectorAll('code');

codes.forEach((code) => {
	const numberOfLines = code.textContent.split("\n").length - 1;
	const linesHolder = document.createElement("span");
	linesHolder.classList.add('code__lines');
	let linesString = [...new Array(numberOfLines)].map((item, index) => index + 1).join("<br />");
	linesHolder.innerHTML = linesString;
	code.appendChild(linesHolder);
});


