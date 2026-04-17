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
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      merge_logs: true
    }
  ]
};
