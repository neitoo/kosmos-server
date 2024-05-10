CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Tasks (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    due_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    priority INT NOT NULL REFERENCES Priorities(id),
    status INT NOT NULL REFERENCES Statuses(id),
    creator uuid NOT NULL REFERENCES Users(id),
    assignee uuid NOT NULL REFERENCES Users(id)
);

CREATE TABLE Priorities(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE Statuses(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);


CREATE TABLE Users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    patronymic VARCHAR(100),
    login VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    director_id uuid
);


INSERT INTO Priorities (name) VALUES ('высокий'),('средний'),('низкий');
INSERT INTO Statuses (name) VALUES ('к выполнению'),('выполняется'),('выполнена'),('отменена');

-- psql \! chcp 1251

