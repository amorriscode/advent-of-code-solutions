#!/bin/sh

# Make a new directory
mkdir -p ./solutions/$YEAR/$DAY

# Copy the template files over
cp -r ./_template/ ./solutions/$YEAR/$DAY/

# Replace the year template variable
sed -i '' "s/{{YEAR}}/$YEAR/g" ./solutions/$YEAR/$DAY/README.md
sed -i '' "s/{{YEAR}}/$YEAR/g" ./solutions/$YEAR/$DAY/input.js

# Replace the day template variable
sed -i '' "s/{{DAY}}/$DAY/g" ./solutions/$YEAR/$DAY/README.md
sed -i '' "s/{{DAY}}/$DAY/g" ./solutions/$YEAR/$DAY/input.js

echo "Generated code for Advent of Code $YEAR Day $DAY 🎄"
