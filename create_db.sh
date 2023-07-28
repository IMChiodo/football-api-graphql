#!/bin/bash

# Check if the "football" database exists
if psql -h localhost -U postgres -lqt | cut -d \| -f 1 | grep -qw "football"; then
    echo "Database 'football' already exists."
else
    # Create the "football" database
    psql -h localhost -U postgres -c "CREATE DATABASE football;"
    echo "Database 'football' created successfully."
fi
