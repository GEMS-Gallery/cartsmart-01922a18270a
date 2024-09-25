import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('add-item-form');
  const input = document.getElementById('new-item');
  const list = document.getElementById('shopping-list');

  // Load initial items
  await loadItems();

  // Add new item
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const description = input.value.trim();
    if (description) {
      await backend.addItem(description);
      input.value = '';
      await loadItems();
    }
  });

  // Load and display items
  async function loadItems() {
    const items = await backend.getItems();
    list.innerHTML = '';
    items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="${item.completed ? 'completed' : ''}">${item.description}</span>
        <button class="complete-btn" data-id="${item.id}"><i class="fas fa-check"></i></button>
        <button class="delete-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
      `;
      list.appendChild(li);
    });

    // Add event listeners for complete and delete buttons
    document.querySelectorAll('.complete-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = parseInt(btn.getAttribute('data-id'));
        await backend.completeItem(id);
        await loadItems();
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = parseInt(btn.getAttribute('data-id'));
        await backend.deleteItem(id);
        await loadItems();
      });
    });
  }
});
