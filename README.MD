# Color Palette Generator

This is a web application that generates color palettes based on text prompts using OpenAI's GPT-3 language model.

## Features

- Allows users to enter text prompts for generating color palettes.
- Communicates with the OpenAI API to retrieve color palettes based on the prompts.
- Displays the generated color palettes on the webpage.
- Supports copying color values to the clipboard by clicking on the color divs.
- Provides visual feedback with loading animations when retrieving color palettes.

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/BrennanAdams/Color_Gen_ChatGPT.git

2. Install the required dependencies:
    ```shell
    pip install -r requirements.txt

3. Set up your OpenAI API credentials by creating a .env file and adding your API key:
    OPENAI_API_KEY=your-api-key