import request from 'request';
import clipboardy from 'clipboardy';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const options = {
  method: 'POST',
  url: 'https://dev-2bnquasy.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"tLLKmL6gArzAqkqEORNeUj9za4nQPWNr","client_secret":"cyiNP_KSoDp7dYgGMszOj_qwQUv4fTI46B63PRpYfEdtgVD1DqeNnQKK6oKriNH7","audience":"http://localhost:5000/api","grant_type":"client_credentials"}',
};
const __dirname = path.resolve();
const tokenPath = __dirname + '/jwt-token.json';

console.log(chalk.green('Start request...'));
request(options, function (error, response, body) {
  if (error) throw new Error(error);
  const json = JSON.parse(body);
  const formattedJSON = JSON.stringify(json, null, 2);
  clipboardy.write(json?.access_token);
  console.log(chalk.blue(formattedJSON));
  fs.writeFile(tokenPath, formattedJSON, 'utf8', function () {
    console.log(chalk.green('jwt-token.json has been created'));
  });
});
