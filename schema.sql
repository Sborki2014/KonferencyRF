-- =============================================================
-- База данных портала «Конференции.РФ»
-- Запуск: psql -h localhost -U conf_user -d conferences -f schema.sql
-- =============================================================
 
-- Удаляем старые таблицы, чтобы скрипт можно было запускать повторно
DROP TABLE IF EXISTS reviews, bookings, rooms, users CASCADE;
 
-- Пользователи системы (и обычные пользователи, и администратор)
CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    login         VARCHAR(50)  NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name     VARCHAR(150) NOT NULL,
    phone         VARCHAR(20)  NOT NULL,
    email         VARCHAR(100) NOT NULL,
    role          VARCHAR(10)  NOT NULL DEFAULT 'user'
                  CHECK (role IN ('user', 'admin'))
);
 
-- Помещения для конференций
CREATE TABLE rooms (
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(100) NOT NULL UNIQUE,
    room_type VARCHAR(30)  NOT NULL
              CHECK (room_type IN ('Аудитория', 'Коворкинг', 'Кинозал'))
);
 
-- Заявки на бронирование
CREATE TABLE bookings (
    id             SERIAL PRIMARY KEY,
    user_id        INTEGER     NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    room_id        INTEGER     NOT NULL REFERENCES rooms (id),
    start_date     DATE        NOT NULL,
    payment_method VARCHAR(30) NOT NULL
                   CHECK (payment_method IN ('При очном посещении', 'Перевод по СБП')),
    status         VARCHAR(30) NOT NULL DEFAULT 'Новая'
                   CHECK (status IN ('Новая', 'Мероприятие назначено', 'Завершено')),
    created_at     TIMESTAMP   NOT NULL DEFAULT NOW()
);
 
-- Отзывы о проведённых мероприятиях (один отзыв на одну заявку)
CREATE TABLE reviews (
    id         SERIAL PRIMARY KEY,
    booking_id INTEGER   NOT NULL UNIQUE REFERENCES bookings (id) ON DELETE CASCADE,
    text       TEXT      NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
 
-- Справочник помещений
INSERT INTO rooms (name, room_type) VALUES
    ('Аудитория «Москва»',   'Аудитория'),
    ('Аудитория «Байкал»',   'Аудитория'),
    ('Коворкинг «Сириус»',   'Коворкинг'),
    ('Кинозал «Премьер»',    'Кинозал');
