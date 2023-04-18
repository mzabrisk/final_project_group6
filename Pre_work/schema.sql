CREATE TABLE IF NOT EXISTS public.co2emissions
(
    country_code text COLLATE pg_catalog."default",
    country_name text COLLATE pg_catalog."default",
    yr integer,
    num double precision
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.co2emissions
    OWNER to postgres;



-- Table: public.combined_3

-- DROP TABLE IF EXISTS public.combined_3;

CREATE TABLE IF NOT EXISTS public.combined_3
(
    country_name text COLLATE pg_catalog."default",
    country_code text COLLATE pg_catalog."default",
    yr integer,
    num double precision,
    sales_adult_day double precision,
    age_male_death_rate double precision,
    age_female_death_rate double precision
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.combined_3
    OWNER to postgres;



-- Table: public.lat_lon

-- DROP TABLE IF EXISTS public.lat_lon;

CREATE TABLE IF NOT EXISTS public.lat_lon
(
    latt double precision,
    "long" double precision,
    country text COLLATE pg_catalog."default"
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.lat_lon
    OWNER to postgres;

-- Table: public.lung_cancer_deaths

-- DROP TABLE IF EXISTS public.lung_cancer_deaths;

CREATE TABLE IF NOT EXISTS public.lung_cancer_deaths
(
    country_name text COLLATE pg_catalog."default",
    code text COLLATE pg_catalog."default",
    yr integer,
    age_male_death_rate double precision,
    age_female_death_rate double precision
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.lung_cancer_deaths
    OWNER to postgres;

-- Table: public.sig_sales

-- DROP TABLE IF EXISTS public.sig_sales;

CREATE TABLE IF NOT EXISTS public.sig_sales
(
    country_name text COLLATE pg_catalog."default",
    code text COLLATE pg_catalog."default",
    yr integer,
    sales_adult_day double precision
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.sig_sales
    OWNER to postgres;



Create table Combined_with_loc
as
select
	c3.country_name,
	c3.country_code,
	c3.yr,
	c3.num as c02num,
	c3.sales_adult_day,
	c3.age_male_death_rate,
	c3.age_female_death_rate,
	ll.latt,
	ll.long
	
from combined_3 c3

inner join  lat_lon ll
	on c3.country_name = ll.country
order by c3.country_name;


Select * from lat_lon


Create table Combined_with_loc
as
select
	c3.country_name,
	c3.country_code,
	c3.yr,
	c3.num as c02num,
	c3.sales_adult_day,
	c3.age_male_death_rate,
	c3.age_female_death_rate,
	ll.latt,
	ll.long
	
from combined_3 c3

inner join  lat_lon ll
	on c3.country_name = ll.country
order by c3.country_name;

