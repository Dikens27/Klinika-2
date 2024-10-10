document.addEventListener('DOMContentLoaded', function () {
  const servicesList = document.querySelector('.services-list');
  const diseasesList = document.getElementById('diseases-list');
  const backToServicesBtn = document.querySelector('.back-to-services');

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
      });
    });

  // Функція для відображення списку хвороб
  function renderDiseases(diseases) {
    // Приховуємо список послуг
    servicesList.style.display = 'none';

    // Очищаємо список хвороб
    diseasesList.innerHTML = '';

    // Додаємо HTML для кожної хвороби за допомогою insertAdjacentHTML
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

    // Показуємо список хвороб та кнопку повернення
    diseasesList.style.display = 'flex';
    backToServicesBtn.style.display = 'block';
  }
});
