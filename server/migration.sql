DROP TABLE IF EXISTS check_list;

CREATE TABLE check_list (
  id serial,
  category varchar(25),
  description varchar(250),
  complete boolean DEFAULT false
);

INSERT INTO check_list (category, description)
VALUES ('cleaning', 'vacuum all rugs and carpets'),
('cleaning', 'load and start dishwasher'),
('cleaning', 'gather all clothing/bedding to be washed, wash/dry/fold'),
('appointment', 'apt at providence on 5th for annual physical');