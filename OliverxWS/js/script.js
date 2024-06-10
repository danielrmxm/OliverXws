document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const enBtn = document.getElementById('en-btn');
    const esBtn = document.getElementById('es-btn');

    enBtn.addEventListener('click', () => {
        body.setAttribute('lang', 'en');
        // Additional code to switch the language of the content
    });

    esBtn.addEventListener('click', () => {
        body.setAttribute('lang', 'es');
        // Additional code to switch the language of the content
    });
});
