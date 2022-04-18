CREATE DATABASE "self-employed";
CREATE SCHEMA core;
CREATE SCHEMA roles;
CREATE SCHEMA users;
CREATE SCHEMA services;
CREATE SCHEMA rooms;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE roles.roles (
	role_id uuid DEFAULT uuid_generate_v4() NOT NULL,
	description character varying,
	value character varying not null,
	CONSTRAINT roles_pk PRIMARY KEY (role_id)
);

INSERT INTO roles.roles (value, description) VALUES
('ADMIN', 'Администратор помещений.'),
('SPECIALIST', 'Специалист, мастер, снимает помещения и предоставляет услуги.'),
('USER', 'Пользователь, клиент специалистов. Записываетя на услуги.');

CREATE TABLE roles.user_roles (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	role_id uuid NOT NULL,
	user_id uuid NOT NULL,
	CONSTRAINT user_role_pk PRIMARY KEY (role_id, user_id)
);

CREATE TABLE users.users_profile (
	profile_id UUID NOT NULL,
	full_name CHARACTER VARYING not null,
	birthday date,
	contacts jsonb DEFAULT '{
		"email": "",
		"vk.com": "",
		"phone": "",
		"instagram": ""
	}',
	profession CHARACTER VARYING,
	CONSTRAINT users_profile_pk PRIMARY KEY (profile_id)
);

CREATE TABLE users.accounts (
	account_id UUID DEFAULT uuid_generate_v4() NOT NULL,
	email CHARACTER VARYING NOT NULL,
	password CHARACTER VARYING NOT NULL,
	description TEXT DEFAULT null,
	created timestamp with time zone DEFAULT now() NOT NULL,
	modified timestamp with time zone DEFAULT now() NOT NULL,
	modified_by UUID NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY (account_id)
);

CREATE TABLE services.services (
	service_id UUID DEFAULT uuid_generate_v4() NOT NULL,
	title CHARACTER VARYING not null,
	description TEXT NOT NULL,
	price FLOAT NOT NULL,
	duration INTEGER NOT NULL,
	type CHARACTER VARYING NOT NULL,
	created timestamp with time zone DEFAULT now() NOT NULL,
	modified timestamp with time zone DEFAULT now() NOT NULL,
	created_by UUID NOT NULL,
	modified_by UUID NOT NULL,
	in_basket BOOLEAN DEFAULT false NOT NULL,
	CONSTRAINT service_pk PRIMARY KEY (service_id)
);

CREATE TABLE services.records (
	record_id UUID DEFAULT uuid_generate_v4() NOT NULL,
	service_id UUID NOT NULL,
	record_date timestamp with time zone NOT NULL,
	status CHARACTER VARYING DEFAULT 'sent' NOT NULL,
	in_basket BOOLEAN DEFAULT false NOT NULL,
	created timestamp with time zone DEFAULT now() NOT NULL,
	modified timestamp with time zone DEFAULT now() NOT NULL,
	created_by UUID NOT NULL,
	modified_by UUID NOT NULL,
	CONSTRAINT record_pk PRIMARY KEY (record_id)
);

CREATE TABLE core.tokens (
	token_id UUID DEFAULT uuid_generate_v4() NOT NULL,
	user_id UUID NOT NULL,
	refresh_token CHARACTER VARYING NOT NULL,
	created timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT token_id_pk PRIMARY KEY (token_id)
);

CREATE TABLE rooms.rooms (
	room_id UUID DEFAULT uuid_generate_v4() NOT NULL,
	price FLOAT NOT NULL,
	title CHARACTER VARYING NOT NULL,
	description TEXT,
	type CHARACTER VARYING NOT NULL,
	in_basket BOOLEAN DEFAULT false NOT NULL,
	created timestamp with time zone DEFAULT now() NOT NULL,
	created_by UUID NOT NULL,
	modified timestamp with time zone DEFAULT now() NOT NULL,
	modified_by UUID NOT NULL,
	CONSTRAINT room_id_pk PRIMARY KEY (room_id)
);

CREATE TABLE rooms.rentals (
	rental_id UUID DEFAULT uuid_generate_v4() NOT NULL,
	specialist_id UUID NOT NULL,
	room_id UUID NOT NULL,
	start_date timestamp with time zone NOT NULL,
	finish_date timestamp with time zone NOT NULL,
	created timestamp with time zone DEFAULT now() NOT NULL,
	created_by UUID NOT NULL,
	modified timestamp with time zone DEFAULT now() NOT NULL,
	modified_by UUID NOT NULL,
	in_basket BOOLEAN DEFAULT false NOT NULL,
	CONSTRAINT rental_id_pk PRIMARY KEY (rental_id)
);