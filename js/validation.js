const rules = {
    // Минимум 6 символов
    login: {
        regex: /^[a-zA-Z0-9]{6,}$/,
        error: 'Логин должен содержать минимум 6 латинских символов или цифр'
    },

    // Только кириллица и пробелы. Минимум 2 символа
    fullname: {
        regex: /^[а-яА-ЯёЁ\s]{2,}$/,
        error: 'ФИО должен содержать только кириллицу и пробелы (минимум 2 символа)'
    },

    // Строгий формат 8(XXX)XXX-XX-XX
    phone: {
        regex: /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/,
        error: 'Телефон должен быть в формате 8(XXX)XXX-XX-XX'
    },


    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        error: 'Введите корректный адрес электронной почты'
    },

    // Пароль должен содержать минимум 6 символов
    password: {
        regex: /^.{6,}$/,
        error: 'Пароль должен содержать минимум 6 символов'
    },
};


// ФУНКЦИЯ ПОКАЗА ОШИБКИ
function showError(input, text) {

    // Находим элемент, который идет сразу за input (.form__error)
    const errorBlock = input.nextElementSibling;

    // Добавляем класс ошибки
    input.classList.add('is-invalid');

    // роверяем, что соседний элемент существует и это действительно блок ошибки
    if (errorBlock && errorBlock.classList.contains('form__error')) {
        errorBlock.textContent = text;
    }
}


// ФУНКЦИЯ ОЧИСТКИ ОШИБКИ
function clearError(input) {
    const errorBlock = input.nextElementSibling;
    input.classList.remove('is-invalid');

    if (errorBlock && errorBlock.classList.contains('form__error')) {
        errorBlock.textContent = '';
    }
}



// ГЛАВНАЯ ФУНКЦИЯ ПРОВЕРКИ ОДНОГО ПОЛЯ
function checkField(input) {
    // Получаем значение поля и убираем случайные пробелы по краям
    const value = input.value.trim();

    // Находим правило для этого поля по его атрибуту name
    const rule = rules[input.name];

    // Проверка 1: Пустое ли поле
    if (value === '') {
        showError(input, 'Поле обязательно для заполнения');
        return false;
    }

    // Проверка 2: Подходит ли под re
    if (rule && !rule.regex.test(value)) {
        showError(input, rule.error);
        return false;
    }

    // Если всё верно 0 убираем ошибку и возвращаем true
    clearError(input);
    return true;
}


// Находим форму регистрации ИЛИ форму входа на текущей странице
const currentForm = document.querySelector('#registerForm') || document.querySelector('#loginForm');

// Выполняем код только если одна из форм найдена на странице
if (currentForm) {
    const formInputs = currentForm.querySelectorAll('input');

    // Вешаем проверку на событие blur (потеря фокуса) для каждого поля
    formInputs.forEach((input) => {
        input.addEventListener('blur', () => {
            checkField(input);
        });
    });

    // Вешаем проверку всех полей на отправку формы (submit)
    currentForm.addEventListener('submit', (event) => {
        let isFormValid = true;

        // Проверяем каждое поле по очереди
        formInputs.forEach((input) => {
            if (!checkField(input)) {
                isFormValid = false;
            }
        });

        // Если хотя бы одно поле не прошло проверку - отменяем отправку формы
        if (!isFormValid) {
            event.preventDefault();
        }
    });
}