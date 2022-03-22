const allAnimatedElements = body.querySelectorAll('.animate__animated');
let currentAnimatedSection = body.querySelector('.section.active');
let currentAnimatedElements = currentAnimatedSection.querySelectorAll('.animate__animated');

const showAnimations = () => {
	currentAnimatedElements.forEach((animatedElement) => {
		let elementAnimationsList = animatedElement.dataset.animations.split(' ');
		animatedElement.classList.add(...elementAnimationsList);
	});
};

showAnimations();

const animationsCallback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
			if (mutation.type === 'attributes') {
				currentAnimatedSection = body.querySelector('.section.active');
				currentAnimatedElements = currentAnimatedSection.querySelectorAll('.animate__animated');
				showAnimations();
			}
    }
};

const animationObserver = new MutationObserver(animationsCallback);
animationObserver.observe(body, config);
