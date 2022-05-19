--
-- PostgreSQL database dump
--

-- Dumped from database version 12.10
-- Dumped by pg_dump version 12.10

-- Started on 2022-05-19 17:45:59

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 8 (class 2615 OID 24835)
-- Name: core; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA core;


ALTER SCHEMA core OWNER TO postgres;

--
-- TOC entry 13 (class 2615 OID 24836)
-- Name: roles; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA roles;


ALTER SCHEMA roles OWNER TO postgres;

--
-- TOC entry 9 (class 2615 OID 24839)
-- Name: rooms; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA rooms;


ALTER SCHEMA rooms OWNER TO postgres;

--
-- TOC entry 7 (class 2615 OID 24838)
-- Name: services; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA services;


ALTER SCHEMA services OWNER TO postgres;

--
-- TOC entry 12 (class 2615 OID 24837)
-- Name: users; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA users;


ALTER SCHEMA users OWNER TO postgres;

--
-- TOC entry 2 (class 3079 OID 24840)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 2934 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 24922)
-- Name: tokens; Type: TABLE; Schema: core; Owner: postgres
--

CREATE TABLE core.tokens (
    token_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    refresh_token character varying NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE core.tokens OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 24851)
-- Name: roles; Type: TABLE; Schema: roles; Owner: postgres
--

CREATE TABLE roles.roles (
    role_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    description character varying,
    value character varying NOT NULL
);


ALTER TABLE roles.roles OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 24860)
-- Name: user_roles; Type: TABLE; Schema: roles; Owner: postgres
--

CREATE TABLE roles.user_roles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    role_id uuid NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE roles.user_roles OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 24944)
-- Name: rentals; Type: TABLE; Schema: rooms; Owner: postgres
--

CREATE TABLE rooms.rentals (
    rental_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    specialist_id uuid NOT NULL,
    room_id uuid NOT NULL,
    start_date timestamp with time zone NOT NULL,
    finish_date timestamp with time zone NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    created_by uuid NOT NULL,
    modified timestamp with time zone DEFAULT now() NOT NULL,
    modified_by uuid NOT NULL,
    in_basket boolean DEFAULT false NOT NULL
);


ALTER TABLE rooms.rentals OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 24932)
-- Name: rooms; Type: TABLE; Schema: rooms; Owner: postgres
--

CREATE TABLE rooms.rooms (
    room_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    price double precision NOT NULL,
    title character varying NOT NULL,
    description text,
    type character varying NOT NULL,
    in_basket boolean DEFAULT false NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    created_by uuid NOT NULL,
    modified timestamp with time zone DEFAULT now() NOT NULL,
    modified_by uuid NOT NULL
);


ALTER TABLE rooms.rooms OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 24910)
-- Name: records; Type: TABLE; Schema: services; Owner: postgres
--

CREATE TABLE services.records (
    record_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    service_id uuid NOT NULL,
    specialist_id uuid NOT NULL,
    client_id uuid NOT NULL,
    room_id uuid NOT NULL,
    record_date timestamp with time zone NOT NULL,
    status character varying DEFAULT 'sent'::character varying NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    in_basket boolean DEFAULT false NOT NULL
);


ALTER TABLE services.records OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 24898)
-- Name: services; Type: TABLE; Schema: services; Owner: postgres
--

CREATE TABLE services.services (
    service_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    description text NOT NULL,
    price double precision NOT NULL,
    duration integer NOT NULL,
    type character varying NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    modified timestamp with time zone DEFAULT now() NOT NULL,
    created_by uuid NOT NULL,
    modified_by uuid NOT NULL,
    in_basket boolean DEFAULT false NOT NULL
);


ALTER TABLE services.services OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 24972)
-- Name: accounts; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.accounts (
    account_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    description text,
    created timestamp with time zone DEFAULT now() NOT NULL,
    modified timestamp with time zone DEFAULT now() NOT NULL,
    modified_by uuid NOT NULL
);


ALTER TABLE users.accounts OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24983)
-- Name: clients; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.clients (
    client_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    description text,
    email character varying NOT NULL,
    name character varying NOT NULL,
    phone character varying NOT NULL,
    in_basket boolean DEFAULT false NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    modified timestamp with time zone DEFAULT now() NOT NULL,
    modified_by uuid
);


ALTER TABLE users.clients OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24962)
-- Name: users_profile; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.users_profile (
    profile_id uuid NOT NULL,
    full_name character varying NOT NULL,
    birthday date,
    contacts jsonb DEFAULT '{"email": "", "phone": "", "vk.com": "", "instagram": ""}'::jsonb,
    profession character varying,
    description character varying,
    selected_room character varying
);


ALTER TABLE users.users_profile OWNER TO postgres;

--
-- TOC entry 2923 (class 0 OID 24922)
-- Dependencies: 212
-- Data for Name: tokens; Type: TABLE DATA; Schema: core; Owner: postgres
--

COPY core.tokens (token_id, user_id, refresh_token, created) FROM stdin;
12865292-9e5b-409a-beaa-dbaaa0c3a2cf	f1dbb051-4075-4c7c-970d-713f19faf6b9	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmMWRiYjA1MS00MDc1LTRjN2MtOTcwZC03MTNmMTlmYWY2YjkiLCJlbWFpbCI6InNwZWNpYWxpc3QiLCJyb2xlcyI6WyJTUEVDSUFMSVNUIl0sImlhdCI6MTY1Mjk2MTc0OSwiZXhwIjoxNjU1NTUzNzQ5fQ.4ZSjcr4nszIqQ_TLEQWV4VSIstVT2PjIWoHHaE3c7A8	2022-05-19 14:58:28+03
30005d4a-f162-4d0b-972e-ec133bc0257c	1722ea47-2304-477e-a021-b13c10aac5bd	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNzIyZWE0Ny0yMzA0LTQ3N2UtYTAyMS1iMTNjMTBhYWM1YmQiLCJlbWFpbCI6ImFkbWluIiwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNjUyOTYxNzcxLCJleHAiOjE2NTU1NTM3NzF9.dm0eil8zR588V0yUE99wUKkPpGO7cI00wu7WOYf4o7Q	2022-05-19 14:57:44+03
\.


--
-- TOC entry 2919 (class 0 OID 24851)
-- Dependencies: 208
-- Data for Name: roles; Type: TABLE DATA; Schema: roles; Owner: postgres
--

COPY roles.roles (role_id, description, value) FROM stdin;
f8c0634f-c28c-40d5-aa66-2a8390954239	Администратор помещений.	ADMIN
50875d2a-ef92-43be-8a44-691a9a13c02c	Специалист, мастер, снимает помещения и предоставляет услуги.	SPECIALIST
64151249-8e56-4b0c-a73b-5aa81ff5b885	Пользователь, клиент специалистов. Записываетя на услуги.	USER
\.


--
-- TOC entry 2920 (class 0 OID 24860)
-- Dependencies: 209
-- Data for Name: user_roles; Type: TABLE DATA; Schema: roles; Owner: postgres
--

COPY roles.user_roles (id, role_id, user_id) FROM stdin;
58da62d0-8c0c-4472-8822-c27c9119dc6a	50875d2a-ef92-43be-8a44-691a9a13c02c	1db89d25-0197-4078-a190-f34068ce2386
3a47ed7d-06dd-4154-9505-cc140def4c9c	50875d2a-ef92-43be-8a44-691a9a13c02c	f1dbb051-4075-4c7c-970d-713f19faf6b9
69067078-fee9-49b2-9683-c665deb39acf	f8c0634f-c28c-40d5-aa66-2a8390954239	1722ea47-2304-477e-a021-b13c10aac5bd
\.


--
-- TOC entry 2925 (class 0 OID 24944)
-- Dependencies: 214
-- Data for Name: rentals; Type: TABLE DATA; Schema: rooms; Owner: postgres
--

COPY rooms.rentals (rental_id, specialist_id, room_id, start_date, finish_date, created, created_by, modified, modified_by, in_basket) FROM stdin;
\.


--
-- TOC entry 2924 (class 0 OID 24932)
-- Dependencies: 213
-- Data for Name: rooms; Type: TABLE DATA; Schema: rooms; Owner: postgres
--

COPY rooms.rooms (room_id, price, title, description, type, in_basket, created, created_by, modified, modified_by) FROM stdin;
\.


--
-- TOC entry 2922 (class 0 OID 24910)
-- Dependencies: 211
-- Data for Name: records; Type: TABLE DATA; Schema: services; Owner: postgres
--

COPY services.records (record_id, service_id, specialist_id, client_id, room_id, record_date, status, created, in_basket) FROM stdin;
\.


--
-- TOC entry 2921 (class 0 OID 24898)
-- Dependencies: 210
-- Data for Name: services; Type: TABLE DATA; Schema: services; Owner: postgres
--

COPY services.services (service_id, title, description, price, duration, type, created, modified, created_by, modified_by, in_basket) FROM stdin;
\.


--
-- TOC entry 2927 (class 0 OID 24972)
-- Dependencies: 216
-- Data for Name: accounts; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.accounts (account_id, email, password, description, created, modified, modified_by) FROM stdin;
1722ea47-2304-477e-a021-b13c10aac5bd	admin	$2a$04$RUPdnbEgdJcKrOeYu2JEFOSFZROHvf.miON6ceyvp6.JegkH8IM3C	\N	2022-05-19 14:57:44+03	2022-05-19 14:57:44+03	1722ea47-2304-477e-a021-b13c10aac5bd
f1dbb051-4075-4c7c-970d-713f19faf6b9	specialist	$2a$04$9x7Ewe6BFVBvG/ikb4kDX.Sa/3rAz3VDm74OKxJCgM4/m39K9TH4O	\N	2022-05-19 14:58:28+03	2022-05-19 14:58:28+03	f1dbb051-4075-4c7c-970d-713f19faf6b9
\.


--
-- TOC entry 2928 (class 0 OID 24983)
-- Dependencies: 217
-- Data for Name: clients; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.clients (client_id, description, email, name, phone, in_basket, created, modified, modified_by) FROM stdin;
\.


--
-- TOC entry 2926 (class 0 OID 24962)
-- Dependencies: 215
-- Data for Name: users_profile; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.users_profile (profile_id, full_name, birthday, contacts, profession, description, selected_room) FROM stdin;
f1dbb051-4075-4c7c-970d-713f19faf6b9	Тестовый Мастер	\N	{"vk": "", "email": "specialist@asd.ru", "phone": "+7 999 555-44-22", "instagram": ""}	barber	\N	\N
1722ea47-2304-477e-a021-b13c10aac5bd	Администратор	\N	{"vk": "", "email": "admin", "phone": "+7 123 123-12-32", "instagram": ""}	\N	\N	\N
\.


--
-- TOC entry 2782 (class 2606 OID 24931)
-- Name: tokens token_id_pk; Type: CONSTRAINT; Schema: core; Owner: postgres
--

ALTER TABLE ONLY core.tokens
    ADD CONSTRAINT token_id_pk PRIMARY KEY (token_id);


--
-- TOC entry 2774 (class 2606 OID 24859)
-- Name: roles roles_pk; Type: CONSTRAINT; Schema: roles; Owner: postgres
--

ALTER TABLE ONLY roles.roles
    ADD CONSTRAINT roles_pk PRIMARY KEY (role_id);


--
-- TOC entry 2776 (class 2606 OID 24865)
-- Name: user_roles user_role_pk; Type: CONSTRAINT; Schema: roles; Owner: postgres
--

ALTER TABLE ONLY roles.user_roles
    ADD CONSTRAINT user_role_pk PRIMARY KEY (role_id, user_id);


--
-- TOC entry 2786 (class 2606 OID 24952)
-- Name: rentals rental_id_pk; Type: CONSTRAINT; Schema: rooms; Owner: postgres
--

ALTER TABLE ONLY rooms.rentals
    ADD CONSTRAINT rental_id_pk PRIMARY KEY (rental_id);


--
-- TOC entry 2784 (class 2606 OID 24943)
-- Name: rooms room_id_pk; Type: CONSTRAINT; Schema: rooms; Owner: postgres
--

ALTER TABLE ONLY rooms.rooms
    ADD CONSTRAINT room_id_pk PRIMARY KEY (room_id);


--
-- TOC entry 2780 (class 2606 OID 24921)
-- Name: records record_pk; Type: CONSTRAINT; Schema: services; Owner: postgres
--

ALTER TABLE ONLY services.records
    ADD CONSTRAINT record_pk PRIMARY KEY (record_id);


--
-- TOC entry 2778 (class 2606 OID 24909)
-- Name: services service_pk; Type: CONSTRAINT; Schema: services; Owner: postgres
--

ALTER TABLE ONLY services.services
    ADD CONSTRAINT service_pk PRIMARY KEY (service_id);


--
-- TOC entry 2792 (class 2606 OID 24994)
-- Name: clients client_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.clients
    ADD CONSTRAINT client_pk PRIMARY KEY (client_id);


--
-- TOC entry 2790 (class 2606 OID 24982)
-- Name: accounts user_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.accounts
    ADD CONSTRAINT user_pk PRIMARY KEY (account_id);


--
-- TOC entry 2788 (class 2606 OID 24970)
-- Name: users_profile users_profile_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_profile
    ADD CONSTRAINT users_profile_pk PRIMARY KEY (profile_id);


-- Completed on 2022-05-19 17:45:59

--
-- PostgreSQL database dump complete
--

