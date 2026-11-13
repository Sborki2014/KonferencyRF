// ПРАВИЛА
const rules = {
    // Минимум 6 символов
    login: /^[a-zA-Z0-9]{6,}$/,

    // Только кириллица и пробелы. Минимум 2 символа
    fullname: /^[а-яА-яёЁ\s]{2,}$/,

    // Строгий формат 8(XXX)XXX-XX-XX
    phone: /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/,

    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    password: /^.{6,}$/
};

// ФУНКЦИЯ ПРОВЕРКИ
function validateField(fieldName, value) {
    return rules[fieldName].test(value);
}

// ПРОВЕРКА ДАННЫХ ИЗ ТАБЛИЦЫ
console.log("=== ПРОВЕРКА ПО ТАБЛИЦЕ ===");

console.log("Логин 'ivanov2027' (ожидается true):", validateField('login', 'ivanov2027'));
console.log("Логин 'ivan' (ожидается false):", validateField('login', 'ivan'));
console.log("Логин 'иванов2027' (ожидается false):", validateField('login', 'иванов2027'));

console.log("ФИО 'Иванов Иван' (ожидается true):", validateField('fullname', 'Иванов Иван'));
console.log("ФИО 'Ivanov Ivan' (ожидается false):", validateField('fullname', 'Ivanov Ivan'));

console.log("Телефон '8(900)123-45-67' (ожидается true):", validateField('phone', '8(900)123-45-67'));
console.log("Телефон '89001234567' (ожидается false):", validateField('phone', '89001234567'));
console.log("Телефон '+7(900)123-45-67' (ожидается false):", validateField('phone', '+7(900)123-45-67'));

console.log("E-mail 'anna@mail.ru' (ожидается true):", validateField('email', 'anna@mail.ru'));
console.log("E-mail 'anna.mail.ru' (ожидается false):", validateField('email', 'anna.mail.ru'));