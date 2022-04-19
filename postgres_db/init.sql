--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8
-- Dumped by pg_dump version 12.8

-- Started on 2022-04-19 11:54:05

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
-- TOC entry 2922 (class 1262 OID 164992)
-- Name: self-employed; Type: DATABASE; Schema: -; Owner: -
--

\connect -reuse-previous=on "dbname='self-employed'"

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
-- TOC entry 9 (class 2615 OID 222955)
-- Name: core; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA core;


--
-- TOC entry 12 (class 2615 OID 164993)
-- Name: roles; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA roles;


--
-- TOC entry 7 (class 2615 OID 165063)
-- Name: rooms; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA rooms;


--
-- TOC entry 10 (class 2615 OID 164995)
-- Name: services; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA services;


--
-- TOC entry 8 (class 2615 OID 164994)
-- Name: users; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA users;


--
-- TOC entry 2 (class 3079 OID 164996)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 2923 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 222956)
-- Name: tokens; Type: TABLE; Schema: core; Owner: -
--

CREATE TABLE core.tokens (
    token_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    refresh_token character varying NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 211 (class 1259 OID 165043)
-- Name: tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tokens (
    token_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    refresh_token character varying NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 208 (class 1259 OID 165007)
-- Name: roles; Type: TABLE; Schema: roles; Owner: -
--

CREATE TABLE roles.roles (
    role_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    description character varying,
    value character varying NOT NULL
);


--
-- TOC entry 209 (class 1259 OID 165017)
-- Name: user_roles; Type: TABLE; Schema: roles; Owner: -
--

CREATE TABLE roles.user_roles (
    role_id uuid NOT NULL,
    user_id uuid NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL
);


--
-- TOC entry 213 (class 1259 OID 222883)
-- Name: rentals; Type: TABLE; Schema: rooms; Owner: -
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


--
-- TOC entry 212 (class 1259 OID 222870)
-- Name: rooms; Type: TABLE; Schema: rooms; Owner: -
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


--
-- TOC entry 216 (class 1259 OID 222966)
-- Name: services; Type: TABLE; Schema: services; Owner: -
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


--
-- TOC entry 214 (class 1259 OID 222892)
-- Name: accounts; Type: TABLE; Schema: users; Owner: -
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


--
-- TOC entry 210 (class 1259 OID 165022)
-- Name: users_profile; Type: TABLE; Schema: users; Owner: -
--

CREATE TABLE users.users_profile (
    profile_id uuid NOT NULL,
    full_name character varying NOT NULL,
    birthday date,
    contacts jsonb DEFAULT '{"email": "", "phone": "", "vk.com": "", "instagram": ""}'::jsonb,
    profession character varying NOT NULL
);


--
-- TOC entry 2915 (class 0 OID 222956)
-- Dependencies: 215
-- Data for Name: tokens; Type: TABLE DATA; Schema: core; Owner: -
--

COPY core.tokens (token_id, user_id, refresh_token, created) FROM stdin;
af958e27-0490-4602-8598-be105e2338dc	1de1931c-bc74-437a-9a4f-bcba24b1e181	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxZGUxOTMxYy1iYzc0LTQzN2EtOWE0Zi1iY2JhMjRiMWUxODEiLCJlbWFpbCI6ImFzZEBhc2QucnUiLCJyb2xlcyI6WyJBRE1JTiJdLCJpYXQiOjE2NTAyNjk1NjYsImV4cCI6MTY1Mjg2MTU2Nn0.PKhQiXw1nXDX_2rQ7xwRn-m4MWA1J6XdHbMYZo7T97k	2022-04-18 08:12:46+00
2e0116e0-1065-4e7e-8308-fac633e0992e	ee3fd897-1e7b-46e5-844e-20faa9de1361	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlZTNmZDg5Ny0xZTdiLTQ2ZTUtODQ0ZS0yMGZhYTlkZTEzNjEiLCJlbWFpbCI6InF3ZUBxd2UucnUiLCJyb2xlcyI6WyJTUEVDSUFMSVNUIl0sImlhdCI6MTY1MDI2OTc3NSwiZXhwIjoxNjUyODYxNzc1fQ.s7_oNOUhNX7Bow1_X6LKCkpDbmgxYUkSnBXH0DQhRd8	2022-04-18 05:22:49+00
\.


--
-- TOC entry 2911 (class 0 OID 165043)
-- Dependencies: 211
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tokens (token_id, user_id, refresh_token, created) FROM stdin;
555da1fb-309a-4529-b5f6-480a77094425	917ba36e-68c2-49e2-a9ce-75acd162d547	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5MTdiYTM2ZS02OGMyLTQ5ZTItYTljZS03NWFjZDE2MmQ1NDciLCJlbWFpbCI6ImRkQGRkLnJ1Iiwicm9sZXMiOlsiU1BFQ0lBTElTVCJdLCJpYXQiOjE2NDkxNTA2MzAsImV4cCI6MTY1MTc0MjYzMH0.QSA8Ch4r_vWjgTQYhQ82ez13cXpJlbGVJhzj5V88bWI	2022-04-05 09:23:50+00
b29972cf-466e-411f-b844-3eb54467137c	311a3f56-5c70-4980-89d0-bc9e13e83f43	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMTFhM2Y1Ni01YzcwLTQ5ODAtODlkMC1iYzllMTNlODNmNDMiLCJlbWFpbCI6ImRkQGRkLnJ1cyIsInJvbGVzIjpbIlNQRUNJQUxJU1QiXSwiaWF0IjoxNjQ5MTUwNzA2LCJleHAiOjE2NTE3NDI3MDZ9.UFjPrDD6Vpork3LO4ViKiG9SWYYlxYoLwHLvCGwdO9c	2022-04-05 09:25:06+00
c7f5bdf0-50cf-46c7-b1eb-92ca54a1a2b4	738ae9e4-1078-4fbd-b4b9-3940d8c89681	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MzhhZTllNC0xMDc4LTRmYmQtYjRiOS0zOTQwZDhjODk2ODEiLCJlbWFpbCI6Iml2YW5AbWFpbC5ydSIsInJvbGVzIjpbIlNQRUNJQUxJU1QiXSwiaWF0IjoxNjQ5MTU3NDU4LCJleHAiOjE2NTE3NDk0NTh9.OyCZGfSoSQb7NYNQGPNppvgLaSJIQy4UEH36Ila6HKE	2022-04-05 10:41:18+00
eff6c7ca-8c95-4703-aa71-0ec40334336e	694098c4-24b8-4944-bdd2-a5acca9415e4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTQwOThjNC0yNGI4LTQ5NDQtYmRkMi1hNWFjY2E5NDE1ZTQiLCJlbWFpbCI6ImFzZEBhc2QucnUiLCJyb2xlcyI6WyJBRE1JTiJdLCJpYXQiOjE2NDk3NTIzNzcsImV4cCI6MTY1MjM0NDM3N30.imkWBEFbSD6mwKIP-xzxNSDyxnCJobmKLwxgtOb9BXg	2022-04-05 09:03:00+00
492f22cc-fc97-48a5-8640-dc4b69fcca70	3364bbbb-3303-41b5-bb8f-6ac596769e22	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMzY0YmJiYi0zMzAzLTQxYjUtYmI4Zi02YWM1OTY3NjllMjIiLCJlbWFpbCI6ImJiQG1tLnJ1Iiwicm9sZXMiOlsiU1BFQ0lBTElTVCJdLCJpYXQiOjE2NDk3NTYyMzksImV4cCI6MTY1MjM0ODIzOX0.Kt3ashiOCcfIfuG6vHYzwbzZGmYcpnLuzHkbxHbfYwA	2022-04-12 09:37:01+00
60c7d955-0b85-4dfa-b41d-4f1af9225f98	da65215c-bdce-422c-b55a-5dd9943d0985	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYTY1MjE1Yy1iZGNlLTQyMmMtYjU1YS01ZGQ5OTQzZDA5ODUiLCJlbWFpbCI6Im1zd2FwMjEyMyIsInJvbGVzIjpbXSwiaWF0IjoxNjQ4MDk4ODgxLCJleHAiOjE2NTA2OTA4ODF9.RzDryBeYgQifpZD1n7rLXzbb_3UAHwREpuEOmORt83g	2022-03-23 09:16:45+00
edd66bd2-13a1-4a37-b8b6-ebcd53129f39	1de1931c-bc74-437a-9a4f-bcba24b1e181	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxZGUxOTMxYy1iYzc0LTQzN2EtOWE0Zi1iY2JhMjRiMWUxODEiLCJlbWFpbCI6ImFzZEBhc2QucnUiLCJyb2xlcyI6WyJBRE1JTiJdLCJpYXQiOjE2NDk4NDE4MDQsImV4cCI6MTY1MjQzMzgwNH0.EwRLmlld9U3ZEiy_WgCAVQgS9unemOzrMbjrwXK61t0	2022-04-12 08:37:42+00
db31763d-b8ee-42bc-8bfe-1178fecda271	71d9248f-2aa8-426d-85c3-3052e6208b95	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MWQ5MjQ4Zi0yYWE4LTQyNmQtODVjMy0zMDUyZTYyMDhiOTUiLCJlbWFpbCI6Im1zd2FwMTIzIiwicm9sZXMiOltdLCJpYXQiOjE2NDgyMDQ0ODUsImV4cCI6MTY1MDc5NjQ4NX0.fw9-qnJdpfPGoESVykqwn4PDSRLH04J37sgxr08olzM	2022-03-25 09:41:16+00
fababd67-1ee5-4b41-b9ec-61fdae7a702b	b9ece2ce-78a4-4816-81d7-6f5eb3944020	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiOWVjZTJjZS03OGE0LTQ4MTYtODFkNy02ZjVlYjM5NDQwMjAiLCJlbWFpbCI6Im1zeDIxNGFhcDEyMyIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTY0ODIwNTIyNSwiZXhwIjoxNjUwNzk3MjI1fQ.O_IDq9JzH378vd0grH88O0A_KA9cPbdYMkgOH3hpxLw	2022-03-25 10:47:05+00
daf83682-b713-4f15-b912-c8076972f9ee	c083c0cd-34bb-43b3-82e7-d5462bab564d	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMDgzYzBjZC0zNGJiLTQzYjMtODJlNy1kNTQ2MmJhYjU2NGQiLCJlbWFpbCI6ImFzQGFzLnJ1Iiwicm9sZXMiOlsiU1BFQ0lBTElTVCJdLCJpYXQiOjE2NDkxNTA0NzMsImV4cCI6MTY1MTc0MjQ3M30.vyN1y2E8Mzx1lvST4fcLQY_J9td4aHKrwGW0urBO03s	2022-04-05 09:21:13+00
\.


--
-- TOC entry 2908 (class 0 OID 165007)
-- Dependencies: 208
-- Data for Name: roles; Type: TABLE DATA; Schema: roles; Owner: -
--

COPY roles.roles (role_id, description, value) FROM stdin;
910f5082-221c-4df2-a444-d0a0bf7be87c	Просто роль	PROSTO
731d75b6-5c55-4835-9b68-eb654c522939	Администратор помещений.	ADMIN
ba01e9a7-7ce2-486b-9e25-dc4392935ee6	Специалист, мастер, снимает помещения и предоставляет услуги.	SPECIALIST
5300be44-b85a-4fa1-a242-0c210694a33e	Пользователь, клиент специалистов. Записываетя на услуги.	USER
\.


--
-- TOC entry 2909 (class 0 OID 165017)
-- Dependencies: 209
-- Data for Name: user_roles; Type: TABLE DATA; Schema: roles; Owner: -
--

COPY roles.user_roles (role_id, user_id, id) FROM stdin;
910f5082-221c-4df2-a444-d0a0bf7be87c	0ddd9311-1a79-4bc5-adcc-7b596fe7c1cd	b3a723c5-949d-485c-bf2f-b85ae0228292
731d75b6-5c55-4835-9b68-eb654c522939	86a51194-dc9c-41d6-9782-b555f580fbca	2c126357-660c-41b2-824e-c44d8420b2e3
731d75b6-5c55-4835-9b68-eb654c522939	bb726837-32b3-4f3a-9109-d57dcd8f5ca7	7cf362f3-e95f-482f-a28e-4d3d2eaa1705
731d75b6-5c55-4835-9b68-eb654c522939	b9ece2ce-78a4-4816-81d7-6f5eb3944020	b4ab0860-6049-4184-8abc-2d66b7f32586
ba01e9a7-7ce2-486b-9e25-dc4392935ee6	c083c0cd-34bb-43b3-82e7-d5462bab564d	5f6f2e80-b732-4f90-9bd1-b69335576e4f
ba01e9a7-7ce2-486b-9e25-dc4392935ee6	917ba36e-68c2-49e2-a9ce-75acd162d547	b56fe4bc-7ffe-495b-9376-977cda05e388
ba01e9a7-7ce2-486b-9e25-dc4392935ee6	311a3f56-5c70-4980-89d0-bc9e13e83f43	c471d73f-0d0a-40a0-b0ec-e0d11c244a84
731d75b6-5c55-4835-9b68-eb654c522939	694098c4-24b8-4944-bdd2-a5acca9415e4	b728ba38-9ed3-4779-ae49-f2b8a252f20b
731d75b6-5c55-4835-9b68-eb654c522939	738ae9e4-1078-4fbd-b4b9-3940d8c89681	70aa1f68-b134-4d41-8171-51e11949fab3
731d75b6-5c55-4835-9b68-eb654c522939	1de1931c-bc74-437a-9a4f-bcba24b1e181	ca248e06-316a-4958-9696-b5fab25bc7a1
ba01e9a7-7ce2-486b-9e25-dc4392935ee6	3364bbbb-3303-41b5-bb8f-6ac596769e22	66d95f7d-7eba-4d89-9ce2-61421d0ec67a
ba01e9a7-7ce2-486b-9e25-dc4392935ee6	ee3fd897-1e7b-46e5-844e-20faa9de1361	23b85d64-0081-47f1-818d-e022ca5e48a8
\.


--
-- TOC entry 2913 (class 0 OID 222883)
-- Dependencies: 213
-- Data for Name: rentals; Type: TABLE DATA; Schema: rooms; Owner: -
--

COPY rooms.rentals (rental_id, specialist_id, room_id, start_date, finish_date, created, created_by, modified, modified_by, in_basket) FROM stdin;
3ae3186d-d82a-4b5f-851c-dbca8431e20e	694098c4-24b8-4944-bdd2-a5acca9415e4	4c553fdf-a34c-4593-a614-1adc347a6e67	2022-04-11 07:00:00+00	2022-04-11 08:00:00+00	2022-04-11 05:39:53+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-11 08:31:52+00	694098c4-24b8-4944-bdd2-a5acca9415e4	t
7b9d22be-338c-4742-b791-c4b7fdc9579d	738ae9e4-1078-4fbd-b4b9-3940d8c89681	11d2b816-e6d6-4f29-8842-b38cae4e7d3a	2022-04-11 09:00:00+00	2022-04-11 10:00:00+00	2022-04-11 06:46:21+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-11 08:32:38+00	694098c4-24b8-4944-bdd2-a5acca9415e4	t
304f6c9a-aa90-4b17-93d1-5d67a9536b68	71d9248f-2aa8-426d-85c3-3052e6208b95	11d2b816-e6d6-4f29-8842-b38cae4e7d3a	2022-04-11 15:10:00+00	2022-04-11 16:00:00+00	2022-04-11 05:35:44+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-11 08:34:18+00	694098c4-24b8-4944-bdd2-a5acca9415e4	t
d8fc7637-d056-4fa7-a749-e33991c2504a	694098c4-24b8-4944-bdd2-a5acca9415e4	4c553fdf-a34c-4593-a614-1adc347a6e67	2022-04-11 12:00:00+00	2022-04-11 13:00:00+00	2022-04-11 08:40:07+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-11 08:40:09+00	694098c4-24b8-4944-bdd2-a5acca9415e4	t
99238e23-ea3f-4ac6-ab8a-ef427aa0cad6	694098c4-24b8-4944-bdd2-a5acca9415e4	4c553fdf-a34c-4593-a614-1adc347a6e67	2022-04-11 13:00:00+00	2022-04-11 14:00:00+00	2022-04-11 08:39:47+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-11 08:40:10+00	694098c4-24b8-4944-bdd2-a5acca9415e4	t
0c81e8b1-da2a-4225-a8e6-ad59cf86607d	40fe257d-8b42-4c2d-9e47-4e6891ad6ee6	4c553fdf-a34c-4593-a614-1adc347a6e67	2022-04-11 09:00:00+00	2022-04-11 10:00:00+00	2022-04-11 08:38:09+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-11 08:40:11+00	694098c4-24b8-4944-bdd2-a5acca9415e4	t
db7c66ca-daa6-4771-819a-20ef489ff317	40fe257d-8b42-4c2d-9e47-4e6891ad6ee6	4c553fdf-a34c-4593-a614-1adc347a6e67	2022-04-11 08:00:00+00	2022-04-11 09:00:00+00	2022-04-11 08:38:14+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-11 08:40:12+00	694098c4-24b8-4944-bdd2-a5acca9415e4	t
47f4622a-3996-4fbd-8951-2a523a9b01e5	694098c4-24b8-4944-bdd2-a5acca9415e4	4c553fdf-a34c-4593-a614-1adc347a6e67	2022-04-11 07:00:00+00	2022-04-11 08:00:00+00	2022-04-11 08:39:27+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-11 08:40:13+00	694098c4-24b8-4944-bdd2-a5acca9415e4	t
14eef765-7d2c-46d3-a60c-582f1e38f3fa	694098c4-24b8-4944-bdd2-a5acca9415e4	4c553fdf-a34c-4593-a614-1adc347a6e67	2022-04-11 04:00:00+00	2022-04-11 05:00:00+00	2022-04-11 05:34:19+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-11 08:40:14+00	694098c4-24b8-4944-bdd2-a5acca9415e4	t
2f68043b-e108-45a5-b0a7-5584e52476df	694098c4-24b8-4944-bdd2-a5acca9415e4	4c553fdf-a34c-4593-a614-1adc347a6e67	2022-04-11 09:45:00+00	2022-04-11 15:00:00+00	2022-04-11 08:40:32+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-11 08:40:32+00	694098c4-24b8-4944-bdd2-a5acca9415e4	f
2e79eea1-e91c-4e2f-b33a-19c7287c8ad3	694098c4-24b8-4944-bdd2-a5acca9415e4	4777c0f0-842d-4977-bad4-423e11b3c5d8	2022-04-11 06:20:00+00	2022-04-11 07:00:00+00	2022-04-11 08:40:52+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-11 08:40:52+00	694098c4-24b8-4944-bdd2-a5acca9415e4	f
936d6c46-15e4-46c4-8b1e-79249f10e886	694098c4-24b8-4944-bdd2-a5acca9415e4	4c553fdf-a34c-4593-a614-1adc347a6e67	2022-04-11 08:00:00+00	2022-04-11 09:00:00+00	2022-04-11 08:40:17+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-11 08:41:14+00	694098c4-24b8-4944-bdd2-a5acca9415e4	t
39599b10-d51d-4745-952d-45496864583a	738ae9e4-1078-4fbd-b4b9-3940d8c89681	4c553fdf-a34c-4593-a614-1adc347a6e67	2022-04-11 08:00:00+00	2022-04-11 09:00:00+00	2022-04-11 08:41:17+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-11 08:41:17+00	694098c4-24b8-4944-bdd2-a5acca9415e4	f
d3fe10f4-8f8e-4070-9f96-2d9d761de725	738ae9e4-1078-4fbd-b4b9-3940d8c89681	4c553fdf-a34c-4593-a614-1adc347a6e67	2022-04-12 09:00:00+00	2022-04-12 10:00:00+00	2022-04-12 05:11:45+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-12 05:12:10+00	694098c4-24b8-4944-bdd2-a5acca9415e4	t
7741f425-d48e-4e19-9e22-5ab4c19847d5	40fe257d-8b42-4c2d-9e47-4e6891ad6ee6	4c553fdf-a34c-4593-a614-1adc347a6e67	2022-04-12 09:00:00+00	2022-04-12 10:00:00+00	2022-04-12 05:12:12+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-12 05:12:12+00	694098c4-24b8-4944-bdd2-a5acca9415e4	f
0aae336d-46a0-49b2-a5ab-5af61b7f4bf5	1de1931c-bc74-437a-9a4f-bcba24b1e181	4c553fdf-a34c-4593-a614-1adc347a6e67	2022-04-13 07:10:00+00	2022-04-13 08:50:00+00	2022-04-13 05:52:36+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	2022-04-13 08:58:05+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	t
26189ff4-f835-4936-940a-07c3dc7fe4f1	1de1931c-bc74-437a-9a4f-bcba24b1e181	4777c0f0-842d-4977-bad4-423e11b3c5d8	2022-04-13 05:00:00+00	2022-04-13 06:00:00+00	2022-04-13 05:52:42+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	2022-04-13 08:58:07+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	t
8e02f6b1-d66e-461f-a355-88d290bdd76f	1de1931c-bc74-437a-9a4f-bcba24b1e181	4777c0f0-842d-4977-bad4-423e11b3c5d8	2022-04-13 09:00:00+00	2022-04-13 11:00:00+00	2022-04-13 05:52:52+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	2022-04-13 08:58:07+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	t
bba2dbb6-5ed9-4c40-a696-1983c6e33f06	1de1931c-bc74-437a-9a4f-bcba24b1e181	4777c0f0-842d-4977-bad4-423e11b3c5d8	2022-04-13 13:00:00+00	2022-04-13 14:00:00+00	2022-04-13 05:52:45+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	2022-04-13 08:58:28+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	t
8a4f5679-0df4-4a79-8821-e7861702c163	1de1931c-bc74-437a-9a4f-bcba24b1e181	4c553fdf-a34c-4593-a614-1adc347a6e67	2022-04-13 05:00:00+00	2022-04-13 13:00:00+00	2022-04-13 08:58:47+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	2022-04-13 08:58:47+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	f
630adc0e-31da-4333-85cd-b4caaf18cc7c	1de1931c-bc74-437a-9a4f-bcba24b1e181	4777c0f0-842d-4977-bad4-423e11b3c5d8	2022-04-13 08:00:00+00	2022-04-13 16:00:00+00	2022-04-13 08:59:00+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	2022-04-13 08:59:00+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	f
7dc9c131-4841-4e61-934f-c9d588d75d31	1de1931c-bc74-437a-9a4f-bcba24b1e181	11d2b816-e6d6-4f29-8842-b38cae4e7d3a	2022-04-13 04:00:00+00	2022-04-13 05:00:00+00	2022-04-13 08:59:04+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	2022-04-13 08:59:04+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	f
97c6b63a-c2ef-4115-908b-c44442bdf1ee	1de1931c-bc74-437a-9a4f-bcba24b1e181	11d2b816-e6d6-4f29-8842-b38cae4e7d3a	2022-04-13 10:00:00+00	2022-04-13 11:00:00+00	2022-04-13 08:59:06+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	2022-04-13 08:59:06+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	f
181c9c44-0ce1-48b3-9400-d7cab058adae	1de1931c-bc74-437a-9a4f-bcba24b1e181	11d2b816-e6d6-4f29-8842-b38cae4e7d3a	2022-04-13 15:00:00+00	2022-04-13 16:00:00+00	2022-04-13 08:59:09+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	2022-04-13 08:59:09+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	f
da1afedf-911b-439f-b49a-ad2457050f93	1de1931c-bc74-437a-9a4f-bcba24b1e181	3ba8006f-50e6-4231-b6c8-594586a85c16	2022-04-13 08:00:00+00	2022-04-13 11:00:00+00	2022-04-13 08:59:15+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	2022-04-13 08:59:15+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	f
e29e0352-f2e0-4929-b727-2c352a445139	1de1931c-bc74-437a-9a4f-bcba24b1e181	05140579-231f-46b1-a554-05c8c31e25a1	2022-04-18 08:20:00+00	2022-04-18 09:50:00+00	2022-04-18 08:13:38+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	2022-04-18 08:13:38+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	f
e00653a8-760a-4b06-924f-3ce58eb69d57	1de1931c-bc74-437a-9a4f-bcba24b1e181	11d2b816-e6d6-4f29-8842-b38cae4e7d3a	2022-04-18 05:00:00+00	2022-04-18 13:00:00+00	2022-04-18 08:15:22+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	2022-04-18 08:15:22+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	f
\.


--
-- TOC entry 2912 (class 0 OID 222870)
-- Dependencies: 212
-- Data for Name: rooms; Type: TABLE DATA; Schema: rooms; Owner: -
--

COPY rooms.rooms (room_id, price, title, description, type, in_basket, created, created_by, modified, modified_by) FROM stdin;
4c553fdf-a34c-4593-a614-1adc347a6e67	123	8 Марта, д.128	\N	browist	f	2022-04-07 12:24:43+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-07 12:24:43+00	694098c4-24b8-4944-bdd2-a5acca9415e4
4777c0f0-842d-4977-bad4-423e11b3c5d8	420	Мира д.110	\N	barber	f	2022-04-07 12:25:08+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-07 12:25:08+00	694098c4-24b8-4944-bdd2-a5acca9415e4
11d2b816-e6d6-4f29-8842-b38cae4e7d3a	222	Тут якобы еще название	\N	lashmaker	f	2022-04-07 12:25:25+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-07 12:25:25+00	694098c4-24b8-4944-bdd2-a5acca9415e4
3ba8006f-50e6-4231-b6c8-594586a85c16	80	Ну и еще одна локация	\N	lashmaker	f	2022-04-07 12:25:43+00	694098c4-24b8-4944-bdd2-a5acca9415e4	2022-04-07 12:25:43+00	694098c4-24b8-4944-bdd2-a5acca9415e4
05140579-231f-46b1-a554-05c8c31e25a1	156	asdas	\N	barber	f	2022-04-18 08:13:08+00	1de1931c-bc74-437a-9a4f-bcba24b1e181	2022-04-18 08:13:08+00	1de1931c-bc74-437a-9a4f-bcba24b1e181
\.


--
-- TOC entry 2916 (class 0 OID 222966)
-- Dependencies: 216
-- Data for Name: services; Type: TABLE DATA; Schema: services; Owner: -
--

COPY services.services (service_id, title, description, price, duration, type, created, modified, created_by, modified_by, in_basket) FROM stdin;
1f4e8587-9b05-472c-bd4d-f5fef67e42ba	Моя первая услуга	Тестирую услугу	400	1800000	browist	2022-04-18 05:24:46+00	2022-04-18 08:16:33+00	ee3fd897-1e7b-46e5-844e-20faa9de1361	ee3fd897-1e7b-46e5-844e-20faa9de1361	t
\.


--
-- TOC entry 2914 (class 0 OID 222892)
-- Dependencies: 214
-- Data for Name: accounts; Type: TABLE DATA; Schema: users; Owner: -
--

COPY users.accounts (account_id, email, password, description, created, modified, modified_by) FROM stdin;
1de1931c-bc74-437a-9a4f-bcba24b1e181	asd@asd.ru	$2a$04$MExFkl5Ih3omf2dXV0Cm3.DDOXf6ppm7V/uBChOzH6vyVYybip0hS	\N	2022-04-12 08:37:42+00	2022-04-12 08:37:42+00	1de1931c-bc74-437a-9a4f-bcba24b1e181
3364bbbb-3303-41b5-bb8f-6ac596769e22	bb@mm.ru	$2a$04$dVZXW3oyASyqDlCW1R2aMu9EZWy9HJCTPw418qOEDLb7BibLGg4I.	Тут мог быть ваш комментарий))	2022-04-12 09:37:01+00	2022-04-13 09:19:37+00	1de1931c-bc74-437a-9a4f-bcba24b1e181
ee3fd897-1e7b-46e5-844e-20faa9de1361	qwe@qwe.ru	$2a$04$sAUX7tQQNt8Q3a8IS4zFd.gcNfVt/cTj99rO7ch1OQkFsa0XWS7fS	sdasda	2022-04-18 05:22:49+00	2022-04-18 08:14:20+00	1de1931c-bc74-437a-9a4f-bcba24b1e181
\.


--
-- TOC entry 2910 (class 0 OID 165022)
-- Dependencies: 210
-- Data for Name: users_profile; Type: TABLE DATA; Schema: users; Owner: -
--

COPY users.users_profile (profile_id, full_name, birthday, contacts, profession) FROM stdin;
8d93ab3e-5cc7-4442-83cb-1cb14dc5af8d	Тестовое имя и фамилия	\N	{"email": "", "phone": "", "vk.com": "", "instagram": ""}	barber
40fe257d-8b42-4c2d-9e47-4e6891ad6ee6	Тестовое имя и фамилия	\N	{"email": "", "phone": "", "vk.com": "", "instagram": ""}	barber
fd7c43fc-4e55-4e3e-97b6-446324516e36	Тестовое имя и фамилия	\N	{"email": "", "phone": "", "vk.com": "", "instagram": ""}	barber
0ddd9311-1a79-4bc5-adcc-7b596fe7c1cd	Тестовое имя и фамилия	\N	{"email": "", "phone": "", "vk.com": "", "instagram": ""}	barber
71d9248f-2aa8-426d-85c3-3052e6208b95	тестовый пользователь	\N	{"email": "", "phone": "", "vk.com": "", "instagram": ""}	barber
da65215c-bdce-422c-b55a-5dd9943d0985	тестовый пользователь	\N	{"email": "", "phone": "", "vk.com": "", "instagram": ""}	barber
fdf68a04-ce8f-4322-ae70-34c9972b8c06	тестовый пользователь	\N	{"email": "", "phone": "", "vk.com": "", "instagram": ""}	barber
b9ece2ce-78a4-4816-81d7-6f5eb3944020	тестовый пользователь	\N	{"email": "", "phone": "", "vk.com": "", "instagram": ""}	barber
694098c4-24b8-4944-bdd2-a5acca9415e4	Тестовое ФИО	\N	{"vk": "", "email": "asd@asd.ru", "phone": "+7 999 999-99-99", "instagram": ""}	barber
c083c0cd-34bb-43b3-82e7-d5462bab564d	Еще один тест	\N	{"vk": "", "email": "as@as.ru", "phone": "+7 546 464-64-65", "instagram": ""}	browist
917ba36e-68c2-49e2-a9ce-75acd162d547	и еще тестим	\N	{"vk": "", "email": "dd@dd.ru", "phone": "+7 897 498-79-78", "instagram": ""}	browist
311a3f56-5c70-4980-89d0-bc9e13e83f43	dasdas	\N	{"vk": "", "email": "dd@dd.rus", "phone": "+7 456 464-64-56", "instagram": ""}	browist
738ae9e4-1078-4fbd-b4b9-3940d8c89681	Иванов Иван Иванович	\N	{"vk": "", "email": "ivan@mail.ru", "phone": "+7 911 123-88-91", "instagram": ""}	barber
1de1931c-bc74-437a-9a4f-bcba24b1e181	Петров Иван Федорович	\N	{"vk": "", "email": "asd@asd.ru", "phone": "+7 999 599-51-12", "instagram": ""}	browist
3364bbbb-3303-41b5-bb8f-6ac596769e22	Иван Иванушка	\N	{"vk": "", "email": "bb@mm.ru", "phone": "+7 999 999-99-99", "instagram": ""}	browist
ee3fd897-1e7b-46e5-844e-20faa9de1361	Петр Онопко	\N	{"vk": "", "email": "qwe@qwe.ru", "phone": "+7 999 444-52-14", "instagram": ""}	browist
\.


--
-- TOC entry 2779 (class 2606 OID 222965)
-- Name: tokens token_id_pk; Type: CONSTRAINT; Schema: core; Owner: -
--

ALTER TABLE ONLY core.tokens
    ADD CONSTRAINT token_id_pk PRIMARY KEY (token_id);


--
-- TOC entry 2771 (class 2606 OID 165052)
-- Name: tokens token_id_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT token_id_pk PRIMARY KEY (token_id);


--
-- TOC entry 2764 (class 2606 OID 165015)
-- Name: roles roles_pk; Type: CONSTRAINT; Schema: roles; Owner: -
--

ALTER TABLE ONLY roles.roles
    ADD CONSTRAINT roles_pk PRIMARY KEY (role_id);


--
-- TOC entry 2766 (class 2606 OID 165061)
-- Name: user_roles user_role_id_pk; Type: CONSTRAINT; Schema: roles; Owner: -
--

ALTER TABLE ONLY roles.user_roles
    ADD CONSTRAINT user_role_id_pk PRIMARY KEY (id);


--
-- TOC entry 2775 (class 2606 OID 222891)
-- Name: rentals rental_id_pk; Type: CONSTRAINT; Schema: rooms; Owner: -
--

ALTER TABLE ONLY rooms.rentals
    ADD CONSTRAINT rental_id_pk PRIMARY KEY (rental_id);


--
-- TOC entry 2773 (class 2606 OID 222881)
-- Name: rooms room_id_pk; Type: CONSTRAINT; Schema: rooms; Owner: -
--

ALTER TABLE ONLY rooms.rooms
    ADD CONSTRAINT room_id_pk PRIMARY KEY (room_id);


--
-- TOC entry 2781 (class 2606 OID 222977)
-- Name: services service_pk; Type: CONSTRAINT; Schema: services; Owner: -
--

ALTER TABLE ONLY services.services
    ADD CONSTRAINT service_pk PRIMARY KEY (service_id);


--
-- TOC entry 2777 (class 2606 OID 222902)
-- Name: accounts user_pk; Type: CONSTRAINT; Schema: users; Owner: -
--

ALTER TABLE ONLY users.accounts
    ADD CONSTRAINT user_pk PRIMARY KEY (account_id);


--
-- TOC entry 2769 (class 2606 OID 165030)
-- Name: users_profile users_profile_pk; Type: CONSTRAINT; Schema: users; Owner: -
--

ALTER TABLE ONLY users.users_profile
    ADD CONSTRAINT users_profile_pk PRIMARY KEY (profile_id);


--
-- TOC entry 2762 (class 1259 OID 165016)
-- Name: role_id_uindex; Type: INDEX; Schema: roles; Owner: -
--

CREATE UNIQUE INDEX role_id_uindex ON roles.roles USING btree (role_id);


--
-- TOC entry 2767 (class 1259 OID 165031)
-- Name: profile_id_uindex; Type: INDEX; Schema: users; Owner: -
--

CREATE UNIQUE INDEX profile_id_uindex ON users.users_profile USING btree (profile_id);


-- Completed on 2022-04-19 11:54:05

--
-- PostgreSQL database dump complete
--

