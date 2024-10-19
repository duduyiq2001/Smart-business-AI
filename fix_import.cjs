const fs = require("fs");
const path = require("path");

// Directory where your JavaScript files are located
const directoryPath = "./clientapi/src"; // Change this to your source directory

// Regex to match import/export statements without file extensions
const importRegex = /(import\s+.*\s+from\s+['"])(\.\/[^'"]+)(['"];?)/g;

function processFile(filePath) {
  // Read the file content
  let fileContent = fs.readFileSync(filePath, "utf8");

  // Check if the file has any imports without .js and add the extension if necessary
  const updatedContent = fileContent.replace(
    importRegex,
    (match, p1, p2, p3) => {
      // Only add .js if it's not already there
      if (!p2.endsWith(".js")) {
        return `${p1}${p2}.js${p3}`;
      }
      return match;
    }
  );

  // Write the updated content back to the file
  fs.writeFileSync(filePath, updatedContent, "utf8");
  console.log(`Processed: ${filePath}`);
}

function processDirectory(dirPath) {
  // Read the directory contents
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);

    // Check if it's a directory
    if (fs.lstatSync(fullPath).isDirectory()) {
      // Recursively process subdirectories
      processDirectory(fullPath);
    } else if (file.endsWith(".js")) {
      // Process JavaScript files
      processFile(fullPath);
    }
  });
}

// Start processing from the specified directory
processDirectory(directoryPath);

console.log("All files processed.");
