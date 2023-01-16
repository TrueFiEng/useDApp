---
'@usedapp/core': patch
---

This patch serves to update the @metamask/detect-provider dependency to the latest version, resolving a bug related to the older version of that package. The bug was not critical and did not cause any build failures, but did result in some warnings in the console related to sourcemaps.
