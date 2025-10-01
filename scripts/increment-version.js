#!/usr/bin/env node

/**
 * Version Increment Utility for WeatherWell
 * 
 * This script increments the version and synchronizes all files.
 * Usage: 
 *   npm run version:patch  (0.1.3 -> 0.1.4)
 *   npm run version:minor  (0.1.3 -> 0.2.0)
 *   npm run version:major  (0.1.3 -> 1.0.0)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const versionType = process.argv[2] || 'patch';

if (!['patch', 'minor', 'major'].includes(versionType)) {
  console.error('❌ Invalid version type. Use: patch, minor, or major');
  process.exit(1);
}

// Read current version
const versionPath = path.join(__dirname, '../src/config/version.ts');
const versionContent = fs.readFileSync(versionPath, 'utf8');
const versionMatch = versionContent.match(/APP_VERSION = '(.+)'/);

if (!versionMatch) {
  console.error('❌ Could not find APP_VERSION in version.ts');
  process.exit(1);
}

const currentVersion = versionMatch[1];
const [major, minor, patch] = currentVersion.split('.').map(Number);

// Calculate new version
let newVersion;
switch (versionType) {
  case 'major':
    newVersion = `${major + 1}.0.0`;
    break;
  case 'minor':
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case 'patch':
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
}

console.log(`🚀 Upgrading from v${currentVersion} to v${newVersion} (${versionType})`);

// Update central version file
const newVersionContent = versionContent.replace(
  /APP_VERSION = '.+'/,
  `APP_VERSION = '${newVersion}'`
);

fs.writeFileSync(versionPath, newVersionContent);
console.log(`✅ Updated central version to ${newVersion}`);

// Run synchronization script
try {
  execSync('node scripts/update-version.js', { stdio: 'inherit' });
  console.log(`\n🎉 Successfully upgraded to v${newVersion}!`);
  console.log(`💡 Don't forget to commit your changes!`);
} catch (error) {
  console.error('❌ Error synchronizing version files:', error.message);
  process.exit(1);
}