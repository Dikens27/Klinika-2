document.addEventListener('DOMContentLoaded', function () {
  const servicesList = document.querySelector('.services-list');
  const diseasesList = document.getElementById('diseases-list');
  const backToServicesBtn = document.querySelector('.back-to-services');
  const paginationContainer = document.createElement('div'); // Контейнер для кнопок пагінації
  paginationContainer.classList.add('pagination-container');

  let currentPage = 1;
  const itemsPerPage = 4; // Кількість елементів на сторінку
  let isPaginated = window.innerWidth < 768; // Перевірка розміру екрана

  // Завантажуємо дані з JSON-файлу
  fetch('services.json')
    .then(response => response.json())
    .then(data => {
      servicesList.addEventListener('click', function (e) {
        if (e.target.closest('.services-btn')) {
          const serviceBtn = e.target.closest('.services-btn');
          const serviceTitle =
            serviceBtn.querySelector('.services-title').textContent;

          if (data[serviceTitle]) {
            renderDiseases(data[serviceTitle]);
          }
        }
      });

      // Додаємо функціонал для кнопки повернення
      backToServicesBtn.addEventListener('click', function () {
        diseasesList.style.display = 'none';
        backToServicesBtn.style.display = 'none';
        servicesList.style.display = 'flex'; // Показуємо список послуг
        if (isPaginated) paginationContainer.style.display = 'none'; // Приховуємо кнопки пагінації
      });

      // Обробляємо зміни розміру вікна
      window.addEventListener('resize', function () {
        isPaginated = window.innerWidth < 768; // Оновлюємо флаг пагінації
        renderDiseases(data[serviceTitle]);
      });
    });

  // Функція для відображення списку хвороб з або без пагінації
  function renderDiseases(diseases) {
    // Приховуємо список послуг
    servicesList.style.display = 'none';

    // Очищаємо список хвороб і контейнер пагінації
    diseasesList.innerHTML = '';
    paginationContainer.innerHTML = '';

    // Якщо екран менший за 768px, використовуємо пагінацію
    if (isPaginated) {
      const totalPages = Math.ceil(diseases.length / itemsPerPage);

      for (let i = 1; i <= totalPages; i++) {
        const radioBtn = document.createElement('input');
        radioBtn.type = 'radio';
        radioBtn.name = 'pagination';
        radioBtn.value = i;
        radioBtn.id = `page-${i}`;
        if (i === 1) radioBtn.checked = true; // Показуємо першу сторінку за замовчуванням

        const label = document.createElement('label');
        label.setAttribute('for', `page-${i}`);
        label.textContent = i;

        paginationContainer.appendChild(radioBtn);
        paginationContainer.appendChild(label);

        radioBtn.addEventListener('change', function () {
          currentPage = i;
          renderPage(diseases, currentPage);
        });
      }

      diseasesList.insertAdjacentElement('afterend', paginationContainer);

      // Відображаємо першу сторінку
      renderPage(diseases, currentPage);
      paginationContainer.style.display = 'flex'; // Показуємо кнопки пагінації
    } else {
      // Відображаємо всі елементи без пагінації
      diseases.forEach(disease => {
        diseasesList.insertAdjacentHTML(
          'beforeend',
          `
          <li class="diseases-item">
            <h3 class="diseases-item-title">${disease}</h3>
          </li>
        `
        );
      });

      paginationContainer.style.display = 'none'; // Приховуємо пагінацію
    }

    // Показуємо список хвороб та кнопку повернення
    diseasesList.style.display = 'flex';
    backToServicesBtn.style.display = 'block';
  }

  // Функція для відображення елементів на конкретній сторінці
  function renderPage(diseases, page) {
    diseasesList.innerHTML = ''; // Очищаємо список хвороб

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const diseasesToShow = diseases.slice(startIndex, endIndex);

    diseasesToShow.forEach(disease => {
      diseasesList.insertAdjacentHTML(
        'beforeend',
        `
        <li class="diseases-item">
          <h3 class="diseases-item-title">${disease}</h3>
        </li>
      `
      );
    });

    // Додаємо плавну анімацію
    diseasesList.style.opacity = '0';
    setTimeout(() => {
      diseasesList.style.opacity = '1';
    }, 200);
  }
});
