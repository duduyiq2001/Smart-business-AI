import { readFileSync, writeFileSync } from "fs";

/**
 * @brief update the .env file such as access token if it expires
 * @param {*} entryName  the name of the field you want to update
 * @param {*} entryValue the value you want to change to
 */
export function writeToEnv(entryName, entryValue) {
  // Read the existing .env file content
  let envFileContent = readFileSync(envFilePath, "utf8");

  // Create a dynamic regex pattern to match any entry with the provided entryName
  const regexPattern = new RegExp(`^${entryName}=.*`, "m");

  // Check if there's already an entry with the given entryName
  if (regexPattern.test(envFileContent)) {
    envFileContent = envFileContent.replace(
      regexPattern,
      `${entryName}=${entryValue}`
    );
  } else {
    // If the entry does not exist, append it to the file
    envFileContent += `\n${entryName}=${entryValue}`;
  }

  // Write the updated content back to the .env file
  writeFileSync("../,env", envFileContent);
}
