#!/usr/bin/env node

/**
 * Version Management Script for WeatherWell
 * 
 * This script ensures all version files are synchronized with the central version.
 * Usage: node scripts/update-version.js [new-version]
 */

const fs = require('fs');
const path = require('path');

// Import the central version
const versionPath = path.join(__dirname, '../src/config/version.ts');
const versionContent = fs.readFileSync(versionPath, 'utf8');
const versionMatch = versionContent.match(/APP_VERSION = '(.+)'/);

if (!versionMatch) {
  console.error('❌ Could not find APP_VERSION in version.ts');
  process.exit(1);
}

const centralVersion = versionMatch[1];
console.log(`🎯 Central version: ${centralVersion}`);

// Files to update
const filesToUpdate = [
  {
    path: 'package.json',
    update: (content) => {
      const pkg = JSON.parse(content);
      pkg.version = centralVersion;
      return JSON.stringify(pkg, null, 2);
    }
  },
  {
    path: 'app.json',
    update: (content) => {
      const app = JSON.parse(content);
      app.expo.version = centralVersion;
      return JSON.stringify(app, null, 2);
    }
  },
  {
    path: 'package-lock.json',
    update: (content) => {
      const lock = JSON.parse(content);
      lock.version = centralVersion;
      if (lock.packages && lock.packages[""]) {
        lock.packages[""].version = centralVersion;
      }
      return JSON.stringify(lock, null, 2);
    }
  }
];

// Update all files
let updatedCount = 0;
let errors = [];

filesToUpdate.forEach(({ path: filePath, update }) => {
  try {
    const fullPath = path.join(__dirname, '..', filePath);
    
    if (!fs.existsSync(fullPath)) {
      errors.push(`⚠️  File not found: ${filePath}`);
      return;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const updatedContent = update(content);
    
    // Check if content actually changed
    if (content !== updatedContent) {
      fs.writeFileSync(fullPath, updatedContent);
      console.log(`✅ Updated ${filePath} to version ${centralVersion}`);
      updatedCount++;
    } else {
      console.log(`✓  ${filePath} already at version ${centralVersion}`);
    }
  } catch (error) {
    errors.push(`❌ Error updating ${filePath}: ${error.message}`);
  }
});

// Report results
console.log(`\n📊 Summary:`);
console.log(`✅ Files updated: ${updatedCount}`);
console.log(`✓  Files already current: ${filesToUpdate.length - updatedCount - errors.length}`);

if (errors.length > 0) {
  console.log(`❌ Errors: ${errors.length}`);
  errors.forEach(error => console.log(`   ${error}`));
  process.exit(1);
}

console.log(`\n🎉 All version files synchronized to v${centralVersion}!`);