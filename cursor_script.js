// Get the cursor element
const cursor = document.querySelector('.custom-cursor');

// Update cursor position based on mouse movement
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});