-- db/migrations/V1__create_stocks_table.sql

-- Add watchlists table
CREATE TABLE IF NOT EXISTS watchlists (
    id UUID PRIMARY KEY,
    user_id UUID,
    watch_list_name VARCHAR(25),
    stock_names jsonb,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
