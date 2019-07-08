class slideToggle {
    constructor(target) {
        if (target) {
            this.target = target;
        }
        this.duration = 1;
    }

    setTarget(target) {
        this.target = target;
        return this;
    }


    slideUp(el, timing = 500) {
        const style = el.style;
        style.transitionProperty = 'height, margin, padding';
        style.transitionDuration = `${timing}ms`;
        style.boxSizing = 'border-box';
        style.height = `${el.offsetHeight}px`;
        style.overflow = 'hidden';
        style.height = 0;
        style.paddingTop = 0;
        style.paddingBottom = 0;
        style.marginTop = 0;
        style.marginBottom = 0;
        
        window.setTimeout( () => {
            style.display = 'none';
            style.removeProperty('height');
            style.removeProperty('padding-top');
            style.removeProperty('padding-bottom');
            style.removeProperty('margin-top');
            style.removeProperty('margin-bottom');
            style.removeProperty('overflow');
            style.removeProperty('transition-duration');
            style.removeProperty('transition-property');
        }, timing);
    }
    
    slideDown (el, timing = 500) {
        let display = window.getComputedStyle(el).display;
        let height = null;
        const style = el.style;
        style.removeProperty('display');
        if (display === 'none') {
            display = 'block';
        }
        
        style.display = display;
        height = el.offsetHeight;
        style.overflow = 'hidden';
        style.height = 0;
        style.paddingTop = 0;
        style.paddingBottom = 0;
        style.marginTop = 0;
        style.marginBottom = 0;
        el.offsetHeight;
        style.boxSizing = 'border-box';
        style.transitionProperty = "height, margin, padding";
        style.transitionDuration = `${timing}ms`;
        style.height = `${height}px`;
        style.removeProperty('padding-top');
        style.removeProperty('padding-bottom');
        style.removeProperty('margin-top');
        style.removeProperty('margin-bottom');
        window.setTimeout( () => {
            style.removeProperty('height');
            style.removeProperty('overflow');
            style.removeProperty('transition-duration');
            style.removeProperty('transition-property');
        }, timing);
    }

    main() {

        if (window.getComputedStyle(this.target).display === 'none') {
            this.slideDown(this.target, 500);
        } else {
            this.slideUp(this.target, 500);
        }
    }
}
