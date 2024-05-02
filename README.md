# Система бронирования мероприятий

Этот проект представляет собой систему бронирования мероприятий, которая позволяет пользователям просматривать мероприятия, просматривать подробную информацию о каждом мероприятии и бронировать места. Система построена с использованием Rest для интерфейса и Node.js с помощью Express для серверной части, с базой данных MySQL, управляющей данными.

## Особенности

- Просмотр предстоящих мероприятий в виде таблицы.
- Просмотр подробной информации о каждом мероприятии, включая дату, описание и место проведения.
- Бронирование конкретных мест на мероприятия.
- Просмотр количества доступных мест на каждое мероприятие в режиме реального времени.

## Требования

- Node.js
- MySQL
- React

## Инструкции по установке

### Настройка базы данных

1. ** База данных MySQL:**
   - Установите MySQL, если он еще не установлен.
   - Создайте новую схему базы данных, выполнив следующие команды SQL:

```sql
CREATE SCHEMA factorial;
USE factorial;

CREATE TABLE EVENT(
    eventID int primary key auto_increment,
    eventName varchar(50) not null,
    eventDate date not null,
    descript varchar(200) not null,
    place varchar(50) not null
);

CREATE TABLE BOOKING(
    bookID INT PRIMARY KEY AUTO_INCREMENT,
    eventID INT NOT NULL,
    bookRow INT NOT NULL,
    bookColumn INT NOT NULL,
    FOREIGN KEY (eventID) REFERENCES EVENT(eventID)
);

INSERT INTO EVENT (eventName, eventDate, descript, place) 
VALUES ('Music Concert', '2024-05-10', 'An evening of live music', 'Concert Hall');

INSERT INTO EVENT (eventName, eventDate, descript, place) 
VALUES ('Art Exhibition', '2024-06-15', 'Discover stunning artworks', 'Art Gallery');
```
### Настройка бэкэнда

1. **Настройка Node.js:**
   - Перейдите в каталог `сервер`.
   - Запустите `npm install" для установки зависимостей.
   - Запустите сервер с помощью `npm start`.

### Настройка интерфейса

1. **Настройка React:**
   - Перейдите в каталог "клиент".
   - Запустите `npm install" для установки зависимостей.
   - Запустите сервер разработки React, используя `npm start`.
   - Откройте приложение по адресу `http://localhost:3000`.

## Использование

После запуска приложения вы можете использовать веб-интерфейс для просмотра и бронирования мероприятий. На странице с подробной информацией о каждом мероприятии представлена информация и возможность напрямую выбрать и забронировать места.

Если у вас возникнут какие-либо вопросы или предложения, пожалуйста, обратитесь к разделу "Проблемы" репозитория или отправьте запрос на получение информации.