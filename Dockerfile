FROM cypress/included:latest

# Install Firefox
RUN apt-get update && \
    apt-get install -y firefox-esr && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Creating a separate folder with dev dependencies
RUN mkdir /plugins && npm install mochawesome --prefix /plugins --save-dev


# Copying the project
WORKDIR /e2e
COPY . /e2e

# Running tests in Firefox with mochawesome for one test
CMD ["npx", "cypress", "run", "--browser", "firefox",  "--reporter", "/plugins/node_modules/mochawesome", "--headless"]
