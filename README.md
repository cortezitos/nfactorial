# Система бронирования мероприятий

Этот проект представляет собой систему бронирования мероприятий, которая позволяет пользователям просматривать мероприятия, просматривать подробную информацию о каждом мероприятии и бронировать места. Система построена с использованием React для интерфейса и Node.js для серверной части, с базой данных MySQL.

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

1. **База данных MySQL:**
   - Установите MySQL.
   - Поставьте следующие параметры:
   ```
   host: '127.0.0.1'
   username: 'root'
   password: '12345'
   ```
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
   - Перейдите в папку 'server'.
   - Запустите "npm install".
   - Запустите сервер с помощью `npm start`.

### Настройка интерфейса

1. **Настройка React:**
   - Перейдите в папку 'client'.
   - Запустите "npm install".
   - Запустите сервер разработки React, используя `npm start`.
   - Откройте приложение по адресу `http://localhost:3000`.

## Использование

- После открытия вебсайта вы можете просматривать мероприятия
- Нажав на view deatails под мероприятием вас перенесет на страницу мероприятия
- Находясь на странице мероприятия вы можете вернуться назад нажав на кнопку Back
- При нажатии на кнопку Register, пролистните ниже и вы увидите сеточку свободных мест
- При нажатии на место оно начнет мигать, не пугайтесь, подождите и оно станет черным
- Чтобы зарегистрировать место после выбора нажмите Book
- Чтобы увидеть измененное количество свободных мест, обновите страницу
