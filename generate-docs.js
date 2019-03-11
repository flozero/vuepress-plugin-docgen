const fs = require('fs')
const path = require('path')
const markdownMagic = require('markdown-magic')

const config1 = {
  transforms: {
    CONTRIBUTORS: require('markdown-magic-github-contributors'),
    VERSIONBADGE: require('markdown-magic-version-badge'),
  }
}

const config2 = {
  transforms: {
    CONTRIBUTORS: require('markdown-magic-github-contributors')
  }
}

const markdownPath1 = path.join(__dirname, 'README.md')
const markdownPath2 = path.join(__dirname, './docs/readme.md')
markdownMagic(markdownPath1, config1)
markdownMagic(markdownPath2, config2)