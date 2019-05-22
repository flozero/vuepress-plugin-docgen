# Local Development

Fork the [project](https://github.com/f3ltron/vuepress-plugin-docgen)

Clone it immediately or with your fork:

```bash
git clone https://github.com/f3ltron/vuepress-plugin-docgen
```

As we actually dev with native nodejs we don't need any transpiler. 
To test the code, open a terminal and run

```bash
npm ci # to avoid chnging the package-lock

npm run bootstrap # to make the current package available in the example

npm run dev # launches vuepress in dev mode with the current plugin loaded
```

And that's all ! You have anything to develop