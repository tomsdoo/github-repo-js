# github-repo-js

with environment variable
``` sh
docker run --rm -it -e GITHUB_TOKEN=YOUR_TOKEN ghcr.io/tomsdoo/github-repo-js:latest
```

with .env file
``` sh
docker run --rm -it --env-file .env ghcr.io/tomsdoo/github-repo-js:latest
```

with script file
``` sh
 docker run -it --env-file .env -v ./scripts:/scripts ghcr.io/tomsdoo/github-repo-js:latest work.js
```
