--
-- PostgreSQL database dump
--

\restrict 8ANuEWowHxeABrkrU4pMOyWLjt0zRcxYaCYhzFRyltiXKfeRHXnSXqH1lVJYCfl

-- Dumped from database version 18.1 (Debian 18.1-1.pgdg13+2)
-- Dumped by pg_dump version 18.1 (Debian 18.1-1.pgdg13+2)

-- Started on 2026-01-13 12:15:54 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16391)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16865)
-- Name: airport_id; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.airport_id (
    id integer NOT NULL,
    real_name text NOT NULL,
    "cityId" text NOT NULL
);


ALTER TABLE public.airport_id OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16864)
-- Name: airport_id_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.airport_id_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.airport_id_id_seq OWNER TO postgres;

--
-- TOC entry 3478 (class 0 OID 0)
-- Dependencies: 224
-- Name: airport_id_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.airport_id_id_seq OWNED BY public.airport_id.id;


--
-- TOC entry 223 (class 1259 OID 16427)
-- Name: attraction_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attraction_details (
    id integer NOT NULL,
    attraction_name text NOT NULL,
    attraction_slug text NOT NULL,
    additional_info text,
    cancellation_policy text,
    images text NOT NULL,
    price double precision NOT NULL,
    country text NOT NULL,
    city text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.attraction_details OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16426)
-- Name: attraction_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.attraction_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.attraction_details_id_seq OWNER TO postgres;

--
-- TOC entry 3479 (class 0 OID 0)
-- Dependencies: 222
-- Name: attraction_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.attraction_details_id_seq OWNED BY public.attraction_details.id;


--
-- TOC entry 221 (class 1259 OID 16406)
-- Name: flight_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flight_details (
    id integer NOT NULL,
    flight_name text NOT NULL,
    arrival text NOT NULL,
    departure text NOT NULL,
    arrival_time timestamp(3) without time zone NOT NULL,
    departure_time timestamp(3) without time zone NOT NULL,
    flight_logo text NOT NULL,
    fare double precision NOT NULL,
    city text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.flight_details OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16405)
-- Name: flight_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.flight_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.flight_details_id_seq OWNER TO postgres;

--
-- TOC entry 3480 (class 0 OID 0)
-- Dependencies: 220
-- Name: flight_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.flight_details_id_seq OWNED BY public.flight_details.id;


--
-- TOC entry 3309 (class 2604 OID 16868)
-- Name: airport_id id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airport_id ALTER COLUMN id SET DEFAULT nextval('public.airport_id_id_seq'::regclass);


--
-- TOC entry 3307 (class 2604 OID 16430)
-- Name: attraction_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attraction_details ALTER COLUMN id SET DEFAULT nextval('public.attraction_details_id_seq'::regclass);


--
-- TOC entry 3305 (class 2604 OID 16409)
-- Name: flight_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight_details ALTER COLUMN id SET DEFAULT nextval('public.flight_details_id_seq'::regclass);


--
-- TOC entry 3466 (class 0 OID 16391)
-- Dependencies: 219
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
2c9998a4-5900-4937-ac09-eee0dff2ef3b	abfb0fe8aa67aec47ecb0e353b2de0b9d481d996e849abe26b3716c3f8fe755b	2026-01-12 09:20:30.981071+00	20260112092030_init_tables	\N	\N	2026-01-12 09:20:30.950942+00	1
dfebd4e0-960c-4c19-8489-938e552cccca	2e8f03b771156bc73407696cbcb133f99e41a05053d8fdf1d1eeb2f6674bbdc2	2026-01-12 10:08:52.898926+00	20260112100852_init_tables2	\N	\N	2026-01-12 10:08:52.871688+00	1
7a25b0de-4845-4c82-a240-41ac745de331	2dfd67286deb62f24a77d9dc68ae13b7d3eaa808889f3c0c5c6313d1fa9be4dd	2026-01-12 10:28:37.225138+00	20260112102837_init	\N	\N	2026-01-12 10:28:37.202344+00	1
b8e671dc-b231-435c-8ca5-6f17c8141ac9	15cf2d80da62966251f0d18ff76d13b41104d1b220c2b83edab75f5667f1ca4c	2026-01-12 11:11:22.692845+00	20260112111122_init2	\N	\N	2026-01-12 11:11:22.659474+00	1
\.


--
-- TOC entry 3472 (class 0 OID 16865)
-- Dependencies: 225
-- Data for Name: airport_id; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.airport_id (id, real_name, "cityId") FROM stdin;
\.


--
-- TOC entry 3470 (class 0 OID 16427)
-- Dependencies: 223
-- Data for Name: attraction_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attraction_details (id, attraction_name, attraction_slug, additional_info, cancellation_policy, images, price, country, city, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3468 (class 0 OID 16406)
-- Dependencies: 221
-- Data for Name: flight_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.flight_details (id, flight_name, arrival, departure, arrival_time, departure_time, flight_logo, fare, city, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3481 (class 0 OID 0)
-- Dependencies: 224
-- Name: airport_id_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.airport_id_id_seq', 1, false);


--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 222
-- Name: attraction_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.attraction_details_id_seq', 1, false);


--
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 220
-- Name: flight_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.flight_details_id_seq', 1, false);


--
-- TOC entry 3311 (class 2606 OID 16404)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3318 (class 2606 OID 16875)
-- Name: airport_id airport_id_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airport_id
    ADD CONSTRAINT airport_id_pkey PRIMARY KEY (id);


--
-- TOC entry 3316 (class 2606 OID 16444)
-- Name: attraction_details attraction_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attraction_details
    ADD CONSTRAINT attraction_details_pkey PRIMARY KEY (id);


--
-- TOC entry 3313 (class 2606 OID 16425)
-- Name: flight_details flight_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight_details
    ADD CONSTRAINT flight_details_pkey PRIMARY KEY (id);


--
-- TOC entry 3314 (class 1259 OID 16445)
-- Name: attraction_details_attraction_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX attraction_details_attraction_slug_key ON public.attraction_details USING btree (attraction_slug);


-- Completed on 2026-01-13 12:15:54 UTC

--
-- PostgreSQL database dump complete
--

\unrestrict 8ANuEWowHxeABrkrU4pMOyWLjt0zRcxYaCYhzFRyltiXKfeRHXnSXqH1lVJYCfl

