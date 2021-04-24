const httpSever = require('./app/app');

require('./database/mongoose')
  .then((connection) => {
    process.stdout.write('connect mongo successed\n');
    httpSever.listen(4000, () => {
      process.stdout.write('API listening on port 4000\n');
    });
  })
  .catch((err) => {
    console.error(err);
  });
