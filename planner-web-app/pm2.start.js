module.exports = {
    apps : [{
      name      : 'Server',
      script    : './server.js',
      node_args : '-r dotenv/config',
      env_dev : {
        REACT_APP_NODE_ENV: "development",
      },
      env_production : {
        REACT_APP_NODE_ENV: "production",
      },
    }],
  }