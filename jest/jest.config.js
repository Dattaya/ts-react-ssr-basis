module.exports = {
  verbose: true,
  rootDir: '..',
  moduleDirectories: ['node_modules', 'common'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '\\.(css\\?global|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/fileMock.js',
    '\\.(css)$': 'identity-obj-proxy',
  }
}
