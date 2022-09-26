def source_paths
  [__dir__]
end

gsub_file "config/database.yml", /^\s*((username)|(password)):\s*.*\s*$/, ""

gem_group :development, :test do
  gem "dotenv-rails"
  gem "rspec-rails"

  gem "factory_bot_rails"
end

rails_command "generate rspec:install"

copy_file "spec/support/factory_bot.rb"
copy_file "docker-compose.yml"
copy_file "config/tsconfig.json"
copy_file "config/webpack.config.js"
copy_file "config/postcss.config.js"
copy_file "config/tsconfig.json"

after_bundle do
  run "mv app/javascript/application.js app/javascript/application.ts"

  scripts = <<-EOF
  "scripts": {
    "build": "webpack --config config/webpack.config.js",
    "watch": "webpack --config config/webpack.config.js --watch"
  },
EOF
  insert_into_file "package.json", scripts, after: "  \"private\": \"true\",\n"

  run "yarn add autoprefixer css-loader postcss postcss-loader style-loader tailwindcss typescript ts-loader mini-css-extract-plugin"
end
