# Version Management

WeatherWell uses a centralized version management system to ensure all configuration files stay synchronized.

## Central Version Source

The single source of truth for the app version is located in:
```
src/config/version.ts
```

## Version Synchronization

### Manual Sync
To synchronize all version files with the central version:
```bash
npm run sync-version
```

### Automated Version Increments
To increment the version and auto-sync all files:

```bash
# Patch version (0.1.3 -> 0.1.4)
npm run version:patch

# Minor version (0.1.3 -> 0.2.0)  
npm run version:minor

# Major version (0.1.3 -> 1.0.0)
npm run version:major
```

## Files Synchronized

The following files are automatically updated by scripts:
- `package.json`
- `app.json` (Expo configuration)
- `package-lock.json`

### Manual Updates Required
The following files must be updated manually:
- `android/app/build.gradle` - Update `versionCode` (increment by 1) and `versionName`
- `.github/copilot-instructions.md` - Update version references

## Usage Workflow

1. **For feature additions**: `npm run version:minor`
2. **For bug fixes**: `npm run version:patch`
3. **For breaking changes**: `npm run version:major`
4. **Manual sync after editing version.ts**: `npm run sync-version`
5. **Don't forget**: Update `build.gradle` manually!

This prevents version mismatches and ensures consistent versioning across all configuration files.