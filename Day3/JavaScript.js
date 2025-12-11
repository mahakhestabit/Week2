console.log("Script loaded");

// Select all elements with class 'question'
let questions = document.querySelectorAll('.question');

questions.forEach(question => {
    question.addEventListener('click', () => {
        // 'question.parentElement' targets the <section class="faq-box">
        // We toggle the 'active' class on that PARENT section.
        question.parentElement.classList.toggle('active');
    });
});