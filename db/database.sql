CREATE TABLE public.routes 
(
  id serial NOT NULL,
  mp_id integer NOT NULL,
  name varchar(255),
  type varchar(50),
  rating varchar(10),
  stars float,
  starVotes integer,
  pitches integer,
  url text,
  longitude float,
  latitude float,
  raw jsonb NOT NULL,
  CONSTRAINT PK_route PRIMARY KEY (id)
)