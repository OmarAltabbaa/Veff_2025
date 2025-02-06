import fs from 'node:fs/promises';
import path from 'node:path';

const INDEX_PATH = './data/index.json';
const DATA_PATH = './data/';
const DIST_PATH = './dist';

/**
 * Reads a JSON file and returns its parsed content.
 * @param {string} filePath - Path to the JSON file.
 * @returns {Promise<unknown | null>} - Parsed JSON content or null if an error occurs.
 */
async function readJson(filePath) {
    console.log("Starting to read", filePath);
    let data;
    try {
        data = await fs.readFile(path.resolve(filePath), 'utf-8');
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        return null;
    }

    try {
        const parsed = JSON.parse(data);
        return parsed;
    } catch (error) {
        console.error(`Error parsing data as JSON:`, error.message);
        return null;
    }
}

/**
 * Writes an HTML file with a list of links to the JSON files.
 * @param {Array<{file: string, title: string}>} data - Array of file entries.
 * @returns {Promise<void>}
 */
async function writeHtml(data) {
    const indexHtmlFilePath = 'dist/index.html';

    let html = '';
    for (const item of data) {
        html += `<li><a href="${item.file.replace(".json", ".html")}">${item.title}</a></li>\n`;
    }

    const indexHtmlContent = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="styles.css">
            <title>Verkefni 1</title>
        </head>
        <body>
            <header>Verkefni 1 - Quiz Navigation</header>
            <main>
                <nav>
                    <a href="index.html">Home</a>
                </nav>
                <ul>
                    ${html}
                </ul>
            </main>
            <script src="script.js"></script>
        </body>
    </html>
    `;
    await fs.writeFile(indexHtmlFilePath, indexHtmlContent, 'utf-8');
}

/**
 * Validates and parses the index JSON data.
 * @param {unknown} data - The JSON data to validate.
 * @returns {Array<{file: string, title: string}> | null} - Validated data or null if invalid.
 */
function parseIndexJson(data) {
    if (!Array.isArray(data)) {
        console.error("Index data is not an array");
        return null;
    }

    const validFiles = data.filter(entry =>
        typeof entry === "object" &&
        entry !== null &&
        typeof entry.file === "string" &&
        typeof entry.title === "string" &&
        entry.file.endsWith('.json')
    );

    return validFiles;
}

/**
 * Checks if a JSON file exists and is valid.
 * @param {string} filePath - The path to the JSON file.
 * @returns {Promise<boolean>} - true if valid, false if missing or corrupt.
 */
async function isValidJsonFile(filePath) {
    try {
        await fs.access(path.resolve(DATA_PATH + filePath));
        const fileContent = await readJson(DATA_PATH + filePath);

        if (
            typeof fileContent !== "object" ||
            fileContent === null ||
            !("questions" in fileContent) ||
            fileContent.questions === null
        ) {
            console.warn(`Skipping corrupt JSON file: ${filePath}`);
            return false;
        }

        return true;
    } catch (error) {
        console.warn(`Skipping missing file: ${filePath}`, error);
        return false;
    }
}

/**
 * Generates HTML pages for each valid JSON file.
 * @param {Array<{ file: string }>} validFiles - Array of valid JSON files.
 */
async function generateAllHtml(validFiles) {
    for (const entry of validFiles) {
        try {
            const fileContent = await readJson(DATA_PATH + entry.file);

            if (!fileContent || typeof fileContent !== "object" || !("title" in fileContent) || !("questions" in fileContent)) {
                console.warn(`Skipping invalid JSON structure in: ${entry.file}`);
                continue;
            }

            const { title, questions } = fileContent;

            if (!title || !Array.isArray(questions)) {
                console.warn(`Skipping file due to missing fields: ${entry.file}`);
                continue;
            }

            const validQuestions = questions.filter(q => Array.isArray(q.answers));

            let questionsHtml = validQuestions.map(q => `
                <div class="card">
                    <h2>${q.question}</h2>
                    <ul>
                        ${q.answers.map(answer => `
                            <li${answer.correct ? ' class="correct-answer"' : ''}>
                                ${answer.answer}
                            </li>`).join("\n")}
                    </ul>
                </div>
            `).join("\n");

            const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="styles.css">
                    <title>${title}</title>
                </head>
                <body>
                    <header><a href="./index.html">${title}</a></header>
                    <main>
                        ${questionsHtml}
                    </main>
                    <script src="script.js"></script>
                </body>
            </html>`;

            await fs.mkdir("dist", { recursive: true });

            const outputFilePath = `dist/${entry.file.replace(".json", ".html")}`;

            await fs.writeFile(outputFilePath, htmlContent, "utf-8");

        } catch (error) {
            console.error(`Error processing file: ${entry.file}`, error);
        }
    }
}

/**
 * Generates a CSS file with modern light design.
 * @returns {Promise<void>}
 */
async function generateCssFile() {
    try {
        await fs.mkdir(DIST_PATH, { recursive: true });

        const cssFilePath = path.join(DIST_PATH, "styles.css");

        const cssContent = `
        body {
            font-family: 'Roboto', Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            margin: 0;
            padding: 20px;
        }

        header {
            background-color: #4caf50;
            padding: 20px;
            color: white;
            text-align: center;
            font-size: 1.8em;
        }

        main {
            max-width: 900px;
            margin: 20px auto;
            padding: 20px;
        }

        ul {
            list-style: none;
            padding: 0;
        }

        .card {
            background-color: #ffffff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            border-radius: 8px;
            transition: transform 0.3s ease;
        }

        .card:hover {
            transform: translateY(-5px);
        }

        .card h2 {
            color: #4caf50;
        }

        .correct-answer {
            color: #2e7d32;
            font-weight: bold;
        }
        `;
        await fs.writeFile(cssFilePath, cssContent, "utf-8");
        console.log(`CSS file generated: ${cssFilePath}`);
    } catch (error) {
        console.error("Error generating CSS file:", error);
    }
}

/**
 * Generates a JavaScript file for the toggle dark mode feature.
 * @returns {Promise<void>}
 */
async function generateJsFile() {
    try {
        await fs.mkdir(DIST_PATH, { recursive: true });

        const jsFilePath = path.join(DIST_PATH, "script.js");

        const jsContent = `
        document.addEventListener("DOMContentLoaded", function () {
            const navBar = document.createElement("nav");
            navBar.innerHTML = '<a href="index.html">Home</a>';
            document.body.prepend(navBar);
        });
        `;
        await fs.writeFile(jsFilePath, jsContent, "utf-8");
        console.log(`JavaScript file generated: ${jsFilePath}`);
    } catch (error) {
        console.error("Error generating JavaScript file:", error);
    }
}

/**
 * Main function to run the program.
 */
async function main() {
    const indexJson = await readJson(INDEX_PATH);

    const parsedJson = parseIndexJson(indexJson);
    await generateCssFile();
    await generateJsFile();

    if (parsedJson !== null) {
        const validFiles = [];

        for (const entry of parsedJson) {
            if (await isValidJsonFile(entry.file)) {
                validFiles.push(entry);
            }
        }
        await writeHtml(validFiles);
        await generateAllHtml(validFiles);
    } else {
        console.error("Parsed JSON is null");
    }
}

main();
