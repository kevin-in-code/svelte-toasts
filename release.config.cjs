/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'demo', 'npm-shrinkwrap.json', 'package.json'],
      },
    ],
    '@semantic-release/github',
  ],
};
