/* Schema overview for the Handcraft haven project. 
    pgcrypto extention for random uuid creation

    Sellers table will hold information about the Store account holders. This will include business/store information and owners information alone with account login credentials. 

    Products have a many to one relationship with a seller. This tables holds all the information about a product for both the seller and the user. 

    Users all users will be labeled a guest by default. This will need to be created on site visit, user demographics will only be stored if a purchase is made then the user will no longer be a guest. 

    Trigger is set for new users it will delete all guest users after 12 hours. this will cascade to the carts as well. 

    Carts and cart details will be created when a user adds a product online. Cart details will hold all the product and seller information. Cart will reference the user and store time created. When a purchase in the cart is completed the cart will be deleted and the information moved to orders for storage.  

    Orders and Order Detials will be very similar to cart and cart details but instead of relationships it will take screenshot of the raw seller, user and product data to store, incase of deletion of user, products or sellers all the needed information is still saved. 

    Reviews is for any user to added ratings and comments to any seller or product. 
*/


CREATE EXTENSION IF NOT EXISTS "pgcrypto";
SELECT gen_random_uuid();

CREATE EXTENSION IF NOT EXISTS citext;

Create table sellers (
  id UUID default gen_random_uuid() PRIMARY KEY,
  owner_first varchar(30) NOT NULL,
  owner_last varchar(30) NOT NULL,
  store_name varchar(100) unique NOT NULL,
  store_email CITEXT unique NOT NULL,
  store_address varchar NOT NULL,
  password varchar NOT NULL
);

Create table products (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  item_name varchar(50) NOT NULL,
  item_price numeric(10, 2) NOT NULL,
  item_stock INTEGER CHECK (item_stock >= 0) NOT NULL,
  item_description varchar(500),
  seller_id UUID NOT NULL,
  CONSTRAINT fk_seller
    FOREIGN KEY (seller_id)
    REFERENCES sellers(id)
    ON DELETE cascade
);

Create table users (
  id UUID default gen_random_uuid() PRIMARY KEY,
  user_first varchar(30),
  user_last varchar(30),
  user_email CITEXT unique,
  user_address varchar,
  is_guest BOOLEAN default TRUE,
  created_at timestamptz default current_timestamp
);

Create OR replace FUNCTION delete_old_users() RETURNS trigger as $$
BEGIN
  DELETE FROM users
  WHERE is_guest = TRUE
    AND created_at < now() - interval '12 hours';
  RETURN NEW;
END;
$$ language plpgsql;

Create trigger cleanup_users
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION delete_old_users();

Create table carts (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  time_started timestamptz default current_timestamp,
  user_id UUID NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE cascade
);

Create table cart_details (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cart_id INTEGER NOT NULL,
  seller_id UUID NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  CONSTRAINT fk_cart
    FOREIGN KEY (cart_id)
    REFERENCES carts(id)
    ON DELETE cascade,
  CONSTRAINT fk_seller
    FOREIGN KEY (seller_id)
    REFERENCES sellers(id)
    ON DELETE cascade,
  CONSTRAINT fk_product
    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE cascade
);

Create table orders (
  id UUID default gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  user_name varchar NOT NULL,
  user_email CITEXT NOT NULL,
  user_address varchar NOT NULL,
  total_price numeric(10,2),
  created_at timestamptz default current_timestamp
);

Create table order_items (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id UUID NOT NULL,
  seller_id UUID NOT NULL,
  store_name varchar NOT NULL,
  product_id INTEGER NOT NULL,
  item_name varchar NOT NULL,
  item_price numeric(10,2),
  quantity INTEGER NOT NULL,
  CONSTRAINT fk_order
    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE cascade
);

Create table reviews (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  rating smallint NOT NULL CHECK (rating between 1 and 5),
  product_id INTEGER,
  seller_id UUID NOT NULL,
  user_name varchar NOT NULL,
  description varchar(500),
  created_at timestamptz default current_timestamp,
  CONSTRAINT fk_product
    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE cascade,
  CONSTRAINT fk_seller
    FOREIGN KEY (seller_id)
    REFERENCES sellers(id)
    ON DELETE cascade
);


