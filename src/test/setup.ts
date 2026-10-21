import '@testing-library/jest-dom';

// Mock scrollTo on window and HTMLElement
window.scrollTo = () => {};
Element.prototype.scrollTo = () => {};
Element.prototype.scrollIntoView = () => {};

