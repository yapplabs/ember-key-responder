var fs = require('fs');
var RSVP = require('RSVP');
var exec =  RSVP.denodeify(require('child_process').exec);
var version = JSON.parse(fs.readFileSync('package.json')).version;

add('package.json')()
  .then(commit(version))
  .then(tag(version))
  .then(push('origin', 'master'))
  .then(function() { console.log('version: ' + version); })
  .catch(console.error.bind(console));

function add(file) {
  return function() {
    return exec('git add -f ' + file);
  };
}

function commit(version) {
  return function() {
    return exec('git commit -m "Release: ' + version + '"');
  };
}

function tag(version) {
  return function() {
    return exec('git tag v' + version);
  };
}

function push(origin, branch) {
  return function() {
    return exec('git push --tags ' + origin + ' ' + branch);
  };
}
