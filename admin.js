// Sample data for categories and content
const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' }
];

const content = [
    { id: 1, categoryId: 1, title: 'Content 1', description: 'Description of Content 1' },
    { id: 2, categoryId: 1, title: 'Content 2', description: 'Description of Content 2' },
    { id: 3, categoryId: 2, title: 'Content 3', description: 'Description of Content 3' },
    { id: 4, categoryId: 3, title: 'Content 4', description: 'Description of Content 4' }
];

// Function to render categories
function renderCategories() {
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';

    categories.forEach(category => {
        const li = document.createElement('li');
        li.textContent = category.name;
        li.addEventListener('click', () => renderContent(category.id));
        categoryList.appendChild(li);
    });
}

// Function to render content based on the selected category
function renderContent(categoryId) {
    const contentList = document.getElementById('content-list');
    contentList.innerHTML = '';

    const filteredContent = content.filter(item => item.categoryId === categoryId);

    filteredContent.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('content-item');
        div.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
        contentList.appendChild(div);
    });
}

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
});