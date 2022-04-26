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
-- TOC entry 2934 (class 1262 OID 16662)
-- Name: self-employed; Type: DATABASE; Schema: -; Owner: postgres
--

\connect -reuse-previous=on "dbname='self-employed'"


--
-- TOC entry 13 (class 2615 OID 16673)
-- Name: core; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA core;


ALTER SCHEMA core OWNER TO postgres;

--
-- TOC entry 9 (class 2615 OID 16674)
-- Name: roles; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA roles;


ALTER SCHEMA roles OWNER TO postgres;

--
-- TOC entry 10 (class 2615 OID 16677)
-- Name: rooms; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA rooms;


ALTER SCHEMA rooms OWNER TO postgres;

--
-- TOC entry 5 (class 2615 OID 16676)
-- Name: services; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA services;


ALTER SCHEMA services OWNER TO postgres;

--
-- TOC entry 8 (class 2615 OID 16675)
-- Name: users; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA users;


ALTER SCHEMA users OWNER TO postgres;

--
-- TOC entry 2 (class 3079 OID 16678)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 2935 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16760)
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
-- TOC entry 208 (class 1259 OID 16689)
-- Name: roles; Type: TABLE; Schema: roles; Owner: postgres
--

CREATE TABLE roles.roles (
    role_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    description character varying,
    value character varying NOT NULL
);


ALTER TABLE roles.roles OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16698)
-- Name: user_roles; Type: TABLE; Schema: roles; Owner: postgres
--

CREATE TABLE roles.user_roles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    role_id uuid NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE roles.user_roles OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16782)
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
-- TOC entry 216 (class 1259 OID 16770)
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
-- TOC entry 214 (class 1259 OID 16748)
-- Name: records; Type: TABLE; Schema: services; Owner: postgres
--

CREATE TABLE services.records (
    record_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    service_id uuid NOT NULL,
    specialist_id uuid NOT NULL,
    client_id uuid NOT NULL,
    record_date timestamp with time zone NOT NULL,
    status character varying DEFAULT 'sent'::character varying NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    in_basket boolean DEFAULT false NOT NULL
);


ALTER TABLE services.records OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16736)
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
-- TOC entry 211 (class 1259 OID 16713)
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
-- TOC entry 212 (class 1259 OID 16724)
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
-- TOC entry 210 (class 1259 OID 16704)
-- Name: users_profile; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.users_profile (
    profile_id uuid NOT NULL,
    full_name character varying NOT NULL,
    birthday date,
    contacts jsonb DEFAULT '{"email": "", "phone": "", "vk.com": "", "instagram": ""}'::jsonb,
    profession character varying,
    selected_room character varying
);


ALTER TABLE users.users_profile OWNER TO postgres;

--
-- TOC entry 2926 (class 0 OID 16760)
-- Dependencies: 215
-- Data for Name: tokens; Type: TABLE DATA; Schema: core; Owner: postgres
--

COPY core.tokens (token_id, user_id, refresh_token, created) FROM stdin;
ae44220c-f3e5-4574-86a2-a87680925c0f	aee41b24-7f10-4fbb-a70d-abc689d9fe19	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZWU0MWIyNC03ZjEwLTRmYmItYTcwZC1hYmM2ODlkOWZlMTkiLCJlbWFpbCI6ImFkbWluIiwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNjUxMDAyODc5LCJleHAiOjE2NTM1OTQ4Nzl9.Osrz4Lh3YGVT0UnmS4CZKxSlBR-hY2BlJ5907E_RJPI	2022-04-26 22:53:06+03
256ae7ed-686b-4d84-bcd4-40de2a49c043	92d4e921-8709-44aa-85a6-9e068bde87a2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5MmQ0ZTkyMS04NzA5LTQ0YWEtODVhNi05ZTA2OGJkZTg3YTIiLCJlbWFpbCI6InRlc3RAdGVzdC5ydSIsInJvbGVzIjpbIlNQRUNJQUxJU1QiXSwiaWF0IjoxNjUxMDAzMDgyLCJleHAiOjE2NTM1OTUwODJ9.WP5XRqBdpbunMqkPZKvPOo07t8sRrH70p7LwtsISeSY	2022-04-26 22:57:50+03
\.


--
-- TOC entry 2919 (class 0 OID 16689)
-- Dependencies: 208
-- Data for Name: roles; Type: TABLE DATA; Schema: roles; Owner: postgres
--

COPY roles.roles (role_id, description, value) FROM stdin;
1b334d09-c728-48f6-8a8f-ade18dd5708d	Администратор помещений.	ADMIN
841b55ca-1c22-49ac-936e-e9b92f21971b	Специалист, мастер, снимает помещения и предоставляет услуги.	SPECIALIST
226e9f78-9090-4c60-9ad1-62658203e82f	Пользователь, клиент специалистов. Записываетя на услуги.	USER
\.


--
-- TOC entry 2920 (class 0 OID 16698)
-- Dependencies: 209
-- Data for Name: user_roles; Type: TABLE DATA; Schema: roles; Owner: postgres
--

COPY roles.user_roles (id, role_id, user_id) FROM stdin;
b64cee1a-0728-4916-ac49-a3a419ac077c	1b334d09-c728-48f6-8a8f-ade18dd5708d	aee41b24-7f10-4fbb-a70d-abc689d9fe19
522eb984-6bad-4485-9d36-b715109126e2	841b55ca-1c22-49ac-936e-e9b92f21971b	92d4e921-8709-44aa-85a6-9e068bde87a2
\.


--
-- TOC entry 2928 (class 0 OID 16782)
-- Dependencies: 217
-- Data for Name: rentals; Type: TABLE DATA; Schema: rooms; Owner: postgres
--

COPY rooms.rentals (rental_id, specialist_id, room_id, start_date, finish_date, created, created_by, modified, modified_by, in_basket) FROM stdin;
4fd17d28-4abf-44e0-8c32-847f96266b9b	92d4e921-8709-44aa-85a6-9e068bde87a2	7cc4376c-fc99-4cf3-812f-2d716e66a6af	2022-04-27 11:00:00+03	2022-04-27 16:00:00+03	2022-04-26 23:07:19+03	92d4e921-8709-44aa-85a6-9e068bde87a2	2022-04-26 23:07:19+03	92d4e921-8709-44aa-85a6-9e068bde87a2	f
\.


--
-- TOC entry 2927 (class 0 OID 16770)
-- Dependencies: 216
-- Data for Name: rooms; Type: TABLE DATA; Schema: rooms; Owner: postgres
--

COPY rooms.rooms (room_id, price, title, description, type, in_basket, created, created_by, modified, modified_by) FROM stdin;
a3efdf12-e6dd-4a5d-a8e4-d663356672a2	550	Тестовая локация (бровист)	\N	browist	f	2022-04-26 22:56:03+03	aee41b24-7f10-4fbb-a70d-abc689d9fe19	2022-04-26 22:56:03+03	aee41b24-7f10-4fbb-a70d-abc689d9fe19
7cc4376c-fc99-4cf3-812f-2d716e66a6af	600	Тестовая локация (парикмахер)	\N	barber	f	2022-04-26 22:56:21+03	aee41b24-7f10-4fbb-a70d-abc689d9fe19	2022-04-26 22:56:21+03	aee41b24-7f10-4fbb-a70d-abc689d9fe19
8b7b2342-6db2-4672-b4ce-03d232a3eaa3	500	Тестовая локация (лешмейкер)	\N	lashmaker	f	2022-04-26 22:56:39+03	aee41b24-7f10-4fbb-a70d-abc689d9fe19	2022-04-26 22:56:39+03	aee41b24-7f10-4fbb-a70d-abc689d9fe19
bfa15ff4-e28f-4fc1-8e6a-3693f3f76c14	350	Тестовая локация (маникюр)	\N	manicurist	f	2022-04-26 22:56:56+03	aee41b24-7f10-4fbb-a70d-abc689d9fe19	2022-04-26 22:56:56+03	aee41b24-7f10-4fbb-a70d-abc689d9fe19
\.


--
-- TOC entry 2925 (class 0 OID 16748)
-- Dependencies: 214
-- Data for Name: records; Type: TABLE DATA; Schema: services; Owner: postgres
--

COPY services.records (record_id, service_id, specialist_id, client_id, record_date, status, created, in_basket) FROM stdin;
a3735378-392c-43aa-81df-5ccd6d4c37e1	901d81c1-0c40-48e0-b096-3f2a0b9c1630	23ee1ad4-29ec-421d-b0aa-cef97d5318b8	a96169e4-a269-4a7a-90e0-5b344dadf815	2022-04-28 08:00:00+03	sent	2022-04-26 23:02:53+03	f
354ec15f-eba8-4e0b-b3a5-5d2b54db7b45	a6a6841c-d6ca-45ab-9f19-7dd5b85039a5	92d4e921-8709-44aa-85a6-9e068bde87a2	c86c8d80-e615-4681-9254-1ff1e9a1e968	2022-04-28 11:00:00+03	sent	2022-04-26 23:04:09+03	f
55dc0d31-fd2b-4b9a-a2ae-ef8f575228ae	a6a6841c-d6ca-45ab-9f19-7dd5b85039a5	92d4e921-8709-44aa-85a6-9e068bde87a2	c86c8d80-e615-4681-9254-1ff1e9a1e968	2022-04-28 07:00:00+03	sent	2022-04-26 23:04:24+03	f
00608af2-67b6-4be4-bcf0-15a172aa446e	23ee1ad4-29ec-421d-b0aa-cef97d5318b8	92d4e921-8709-44aa-85a6-9e068bde87a2	c86c8d80-e615-4681-9254-1ff1e9a1e968	2022-04-28 11:00:00+03	accepted	2022-04-26 23:03:49+03	f
dc166787-1a9d-402b-a308-bbf8d0c7f8e2	901d81c1-0c40-48e0-b096-3f2a0b9c1630	92d4e921-8709-44aa-85a6-9e068bde87a2	a96169e4-a269-4a7a-90e0-5b344dadf815	2022-04-28 11:00:00+03	accepted	2022-04-26 23:02:11+03	f
a3144bb5-6954-4307-9511-648842dadc43	901d81c1-0c40-48e0-b096-3f2a0b9c1630	92d4e921-8709-44aa-85a6-9e068bde87a2	6d2a51d8-d67c-435a-97cc-a632ac67363f	2022-04-28 13:00:00+03	canceled	2022-04-26 23:05:20+03	f
\.


--
-- TOC entry 2924 (class 0 OID 16736)
-- Dependencies: 213
-- Data for Name: services; Type: TABLE DATA; Schema: services; Owner: postgres
--

COPY services.services (service_id, title, description, price, duration, type, created, modified, created_by, modified_by, in_basket) FROM stdin;
901d81c1-0c40-48e0-b096-3f2a0b9c1630	Тестовая услуга 1	Тестовая услуга под номером 1	440	1800000	barber	2022-04-26 22:58:26+03	2022-04-26 22:58:26+03	92d4e921-8709-44aa-85a6-9e068bde87a2	92d4e921-8709-44aa-85a6-9e068bde87a2	f
23ee1ad4-29ec-421d-b0aa-cef97d5318b8	Тестовая услуга 2	Тестовая услуга под номером два	1000	5400000	barber	2022-04-26 22:58:51+03	2022-04-26 22:58:51+03	92d4e921-8709-44aa-85a6-9e068bde87a2	92d4e921-8709-44aa-85a6-9e068bde87a2	f
a6a6841c-d6ca-45ab-9f19-7dd5b85039a5	Тестовая услуга 3	Тестовая услуга под номером три	870	1800000	barber	2022-04-26 22:59:12+03	2022-04-26 22:59:12+03	92d4e921-8709-44aa-85a6-9e068bde87a2	92d4e921-8709-44aa-85a6-9e068bde87a2	f
\.


--
-- TOC entry 2922 (class 0 OID 16713)
-- Dependencies: 211
-- Data for Name: accounts; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.accounts (account_id, email, password, description, created, modified, modified_by) FROM stdin;
aee41b24-7f10-4fbb-a70d-abc689d9fe19	admin	$2a$04$A080juajEKhfIUJeqx0N3.5e5d5P7ccptRHY7iVcCW9d9nWC6xYHy	\N	2022-04-26 22:53:06+03	2022-04-26 22:53:06+03	aee41b24-7f10-4fbb-a70d-abc689d9fe19
92d4e921-8709-44aa-85a6-9e068bde87a2	test@test.ru	$2a$04$dsEPPbobclnZGq77FfIwNO0aQXIHrLmor9nv0kex3hQzOa30.cMy6	\N	2022-04-26 22:57:50+03	2022-04-26 22:57:50+03	92d4e921-8709-44aa-85a6-9e068bde87a2
\.


--
-- TOC entry 2923 (class 0 OID 16724)
-- Dependencies: 212
-- Data for Name: clients; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.clients (client_id, description, email, name, phone, in_basket, created, modified, modified_by) FROM stdin;
c86c8d80-e615-4681-9254-1ff1e9a1e968	\N	b311@bbnm.ru	Андрей Михайлович	+79995552212	f	2022-04-26 23:03:49+03	2022-04-26 23:04:24+03	\N
6d2a51d8-d67c-435a-97cc-a632ac67363f	\N	b3113@bbnm.ru	Блинов Петр	+79995552232	f	2022-04-26 23:04:59+03	2022-04-26 23:05:20+03	\N
a96169e4-a269-4a7a-90e0-5b344dadf815	Тестовый комментарий	b31@bbnm.ru	Иван Павлович	+79995552222	f	2022-04-26 23:02:11+03	2022-04-26 23:07:35+03	92d4e921-8709-44aa-85a6-9e068bde87a2
\.


--
-- TOC entry 2921 (class 0 OID 16704)
-- Dependencies: 210
-- Data for Name: users_profile; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.users_profile (profile_id, full_name, birthday, contacts, profession, selected_room) FROM stdin;
aee41b24-7f10-4fbb-a70d-abc689d9fe19	Администратор	\N	{"vk": "", "email": "admin@admin.ru", "phone": "+7 999 999-99-99", "instagram": ""}	null	\N
92d4e921-8709-44aa-85a6-9e068bde87a2	Тестовый пользователь	\N	{"vk": "", "email": "test@test.ru", "phone": "+7 998 998-99-88", "instagram": ""}	barber	7cc4376c-fc99-4cf3-812f-2d716e66a6af
\.


--
-- TOC entry 2788 (class 2606 OID 16769)
-- Name: tokens token_id_pk; Type: CONSTRAINT; Schema: core; Owner: postgres
--

ALTER TABLE ONLY core.tokens
    ADD CONSTRAINT token_id_pk PRIMARY KEY (token_id);


--
-- TOC entry 2774 (class 2606 OID 16697)
-- Name: roles roles_pk; Type: CONSTRAINT; Schema: roles; Owner: postgres
--

ALTER TABLE ONLY roles.roles
    ADD CONSTRAINT roles_pk PRIMARY KEY (role_id);


--
-- TOC entry 2776 (class 2606 OID 16703)
-- Name: user_roles user_role_pk; Type: CONSTRAINT; Schema: roles; Owner: postgres
--

ALTER TABLE ONLY roles.user_roles
    ADD CONSTRAINT user_role_pk PRIMARY KEY (role_id, user_id);


--
-- TOC entry 2792 (class 2606 OID 16790)
-- Name: rentals rental_id_pk; Type: CONSTRAINT; Schema: rooms; Owner: postgres
--

ALTER TABLE ONLY rooms.rentals
    ADD CONSTRAINT rental_id_pk PRIMARY KEY (rental_id);


--
-- TOC entry 2790 (class 2606 OID 16781)
-- Name: rooms room_id_pk; Type: CONSTRAINT; Schema: rooms; Owner: postgres
--

ALTER TABLE ONLY rooms.rooms
    ADD CONSTRAINT room_id_pk PRIMARY KEY (room_id);


--
-- TOC entry 2786 (class 2606 OID 16759)
-- Name: records record_pk; Type: CONSTRAINT; Schema: services; Owner: postgres
--

ALTER TABLE ONLY services.records
    ADD CONSTRAINT record_pk PRIMARY KEY (record_id);


--
-- TOC entry 2784 (class 2606 OID 16747)
-- Name: services service_pk; Type: CONSTRAINT; Schema: services; Owner: postgres
--

ALTER TABLE ONLY services.services
    ADD CONSTRAINT service_pk PRIMARY KEY (service_id);


--
-- TOC entry 2782 (class 2606 OID 16735)
-- Name: clients client_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.clients
    ADD CONSTRAINT client_pk PRIMARY KEY (client_id);


--
-- TOC entry 2780 (class 2606 OID 16723)
-- Name: accounts user_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.accounts
    ADD CONSTRAINT user_pk PRIMARY KEY (account_id);


--
-- TOC entry 2778 (class 2606 OID 16712)
-- Name: users_profile users_profile_pk; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_profile
    ADD CONSTRAINT users_profile_pk PRIMARY KEY (profile_id);


-- Completed on 2022-04-27 01:16:54

--
-- PostgreSQL database dump complete
--

