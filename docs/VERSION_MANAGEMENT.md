# Version Management

WeatherWell keeps every version number in sync from a single source, so a release
never ships with mismatched values.

## Single source of truth

```
src/config/version.ts     ->  export const APP_VERSION = '1.0.7';
```

Everything else is derived from it.

## Bumping a version

```bash
npm run version:patch    # 1.0.7 -> 1.0.8   (bug fixes)
npm run version:minor    # 1.0.7 -> 1.1.0   (new features)
npm run version:major    # 1.0.7 -> 2.0.0   (breaking changes)
```

That single command:

1. Updates `src/config/version.ts`
2. Propagates the version to `package.json`, `package-lock.json` and `app.json`
3. Increments `expo.android.versionCode` in `app.json` by one

If you edit `version.ts` by hand, run `npm run sync-version` to propagate it.
That command only bumps `versionCode` when the version actually changed, so it is
safe to run repeatedly.

## Android version numbers

`android/app/build.gradle` **reads both values directly from `app.json`**:

```gradle
def appJson = new groovy.json.JsonSlurper().parseText(file("$projectRoot/app.json").text)
def appVersionName = appJson.expo.version ?: "1.0.0"
def appVersionCode = appJson.expo.android?.versionCode ?: 1
```

There is nothing to edit in Gradle. Google Play rejects an upload whose
`versionCode` is not higher than the previous one, which is why every version
bump increments it automatically.

## Release checklist

1. `npm run version:patch` (or minor/major)
2. `npx tsc --noEmit`
3. `cd android && ./gradlew bundleRelease` — signed AAB for Play
4. Commit and tag
