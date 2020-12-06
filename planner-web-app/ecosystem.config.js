module.exports = {
    apps : [{
      'name'      : 'Server',
      'script'    : './server.js',
      'node_args' : '-r dotenv/config',
      'cwd' : '/var/www/470-planner-web-app/planner-web-app',
      'env_dev' : {
       ' REACT_APP_NODE_ENV': "development",
      },
      'env_production' : {
        'REACT_APP_NODE_ENV' : "production",
      },
    }],
  }
