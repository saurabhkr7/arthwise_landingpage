module.exports = {
  apps: [
    {
      name: 'arthwise-landing',
      script: 'npm',
      args: 'start',
      cwd: '/Users/saurabhpatel/Documents/Arthwise/arthwise_landingpage',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      merge_logs: true
    }
  ]
};
