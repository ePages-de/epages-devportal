# config valid for current version and patch releases of Capistrano
lock "~> 3.8.1"

server '18.195.76.160', roles: [:web, :app, :db], primary: true

set :application, "epages_devblog"
set :repo_url, "git@github.com:ePages-de/epages-devblog.git"
set :rbenv_ruby, '2.4.2'
set :user, 'deploy'
set :branch, 'develop'
set :pty,             true
set :use_sudo,        false
set :stage,           :production
set :deploy_via,      :remote_cache
set :deploy_to,       "/home/#{fetch(:user)}/apps/#{fetch(:application)}"
set :ssh_options,     { forward_agent: true, user: fetch(:user), keys: %w(~/.ssh/id_rsa.pub) }

namespace :deploy do
  after :updated, :jekyll_tasks do
    on roles(:app)do
      invoke 'jekyll:prepare_files'
    end
  end
end

namespace :jekyll do
  desc 'Move needed files to current'
  task :prepare_files do
    on roles(:app)do
      execute("cd #{release_path}; rm -f Gemfile.lock")
      execute("cd #{release_path}; rm -f Gemfile")
      execute("cp /home/#{fetch(:user)}/apps/#{fetch(:application)}/shared/build-production.sh #{release_path}/build-production.sh")
      execute("cp /home/#{fetch(:user)}/apps/#{fetch(:application)}/shared/docker-compose.production.yml #{release_path}/docker-compose.production.yml")
      execute("cp /home/#{fetch(:user)}/apps/#{fetch(:application)}/shared/Dockerfile-production #{release_path}/Dockerfile-production")
      execute("cp /home/#{fetch(:user)}/apps/#{fetch(:application)}/shared/Gemfile #{release_path}/Gemfile")
      execute("chmod 755 #{release_path}/build-production.sh")
      execute("chmod 755 #{release_path}/docker-compose.production.yml")
      execute("chmod 755 #{release_path}/Dockerfile-production")
      execute("chmod 755 #{release_path}/Gemfile")
    end
  end

  desc 'Build and generate _site with jekyll'
  task :build do
    on roles(:app) do
      execute("cd '#{release_path}'; docker-compose -f docker-compose.production.yml build")
      execute("cd '#{release_path}'; docker-compose -f docker-compose.production.yml up")
      execute("sudo chown -R deploy:deploy /home/#{fetch(:user)}/apps/#{fetch(:application)}")
    end
  end

  desc 'Add the old docs to _site'
  task :include_old_docs do
    on roles(:app) do
      execute("mkdir #{release_path}/_site/apps")
      execute("cp -r /home/#{fetch(:user)}/apps/#{fetch(:application)}/shared/apps/* #{release_path}/_site/apps")
      execute("cp -r /home/#{fetch(:user)}/apps/#{fetch(:application)}/shared/assets/* #{release_path}/_site/assets")
      execute("sudo chown -R deploy:deploy /home/#{fetch(:user)}/apps/#{fetch(:application)}")
    end
  end

  desc 'Remove images and not needed folders and files'
  task :clean_up do
    on roles(:app)do
      execute("cd '#{release_path}'; rm -fr assets")
      execute("cd '#{release_path}'; rm -fr _posts")
      execute("docker rmi -f $(docker images -a -q); true")
      execute("docker system prune -f; true")
    end
  end

  after :prepare_files, :build
  after :build, :include_old_docs
  after :include_old_docs, :clean_up
end
