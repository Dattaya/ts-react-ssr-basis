const fs = require('fs')

const { serverDevOutputPath } = require('./common')

fs.watch(serverDevOutputPath, (eventType, filename) => {
  if (eventType === 'change' && filename === 'loadable-stats.json') {
    process.exit(0)
  }
})
