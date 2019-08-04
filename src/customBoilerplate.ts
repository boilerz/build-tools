#!/usr/bin/env node

// import { execSync } from 'child_process';
import { stdin as input, stdout as output, cwd } from 'process';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import util from 'util';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const renameAsync = util.promisify(fs.rename);

const WORKING_DIRECTORY = cwd();
const TEMPLATE_FILE_PATHS = ['package.json', 'README_TEMPLATE.md'];
const FILE_ENCODING = 'utf8';
const READ_INTERFACE = readline.createInterface({ input, output });

const FILE_TO_RENAME_PATHS: FileRenaming[] = [
  {
    source: 'README_TEMPLATE.md',
    destination: 'README.md',
  },
];

interface FileRenaming {
  source: string;
  destination: string;
}

interface TemplateKeyMetaData {
  key: string;
  question: string;
  value?: string;
  defaultValue: string;
}

const keyMetaData: TemplateKeyMetaData[] = [
  {
    key: 'gh_user',
    question: 'Github username',
    defaultValue: 'boilerz',
  },
  {
    key: 'gh_repo_name',
    question: 'Github repo name',
    defaultValue: path.basename(WORKING_DIRECTORY),
  },
  {
    key: 'gh_short_description',
    question: 'Github short description',
    defaultValue: '...',
  },
  {
    key: 'package_version',
    question: 'Package version',
    defaultValue: '1.0.0',
  },
];

async function ask(question: string, defaultValue: string): Promise<string> {
  return new Promise((resolve: Function): void => {
    READ_INTERFACE.question(question, (answer: string): void => {
      resolve(answer || defaultValue);
    });
  });
}

async function collectTemplateKeysValues(): Promise<TemplateKeyMetaData[]> {
  const answerCompletedKeyMetaData = [];
  let metadataIndex = 0;
  while (metadataIndex < keyMetaData.length) {
    const metadata = keyMetaData[metadataIndex];
    answerCompletedKeyMetaData.push({
      ...metadata,
      value: await ask(
        `${metadata.question} (default: ${metadata.defaultValue}): `,
        metadata.defaultValue,
      ),
    });
    metadataIndex += 1;
  }
  return answerCompletedKeyMetaData;
}

async function replaceTemplateKeysOnFile(
  relativeFilePath: string,
  keyMetadata: TemplateKeyMetaData[],
): Promise<void> {
  const filePath = path.resolve(WORKING_DIRECTORY, relativeFilePath);
  let fileContent: string = await readFileAsync(filePath, {
    encoding: FILE_ENCODING,
  });
  keyMetadata.forEach((metadata): void => {
    fileContent = fileContent.replace(
      new RegExp(metadata.key, 'g'),
      metadata.value || metadata.key,
    );
  });
  await writeFileAsync(filePath, fileContent, {
    encoding: FILE_ENCODING,
  });
}

async function renameFile({
  source,
  destination,
}: FileRenaming): Promise<void> {
  await renameAsync(
    path.resolve(WORKING_DIRECTORY, source),
    path.resolve(WORKING_DIRECTORY, destination),
  );
}

async function cleanPackage(): Promise<void> {
  const packageJsonPath = path.resolve(WORKING_DIRECTORY, 'package.json');
  const packageJsonData: string = await readFileAsync(packageJsonPath, {
    encoding: FILE_ENCODING,
  });
  await writeFileAsync(
    packageJsonPath,
    packageJsonData
      .split('\n')
      .filter((line): boolean => !line.includes('customBoilerplate'))
      .join('\n'),
    { encoding: FILE_ENCODING },
  );
}

export default async function customBoilerPlate(): Promise<void> {
  console.log('Customising boiler plate at', cwd());

  const answerCompletedKeyMetaData = await collectTemplateKeysValues();
  READ_INTERFACE.close();

  await Promise.all(
    TEMPLATE_FILE_PATHS.map(
      (filePath): Promise<void> =>
        replaceTemplateKeysOnFile(filePath, answerCompletedKeyMetaData),
    ),
  );

  await Promise.all(FILE_TO_RENAME_PATHS.map(renameFile));

  await cleanPackage();
}

if (!module.parent) customBoilerPlate().catch(console.error);
