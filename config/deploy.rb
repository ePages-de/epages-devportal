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

namespace :jekyll do
  desc 'Move needed files to current'
  task :prepare_files do
    on roles(:app)do
      execute("rm -f /home/#{fetch(:user)}/apps/#{fetch(:application)}/current/Gemfile.lock")
      execute("cp /home/#{fetch(:user)}/apps/#{fetch(:application)}/shared/build-production.sh /home/#{fetch(:user)}/apps/#{fetch(:application)}/current/build-production.sh")
      execute("cp /home/#{fetch(:user)}/apps/#{fetch(:application)}/shared/docker-compose.production.yml /home/#{fetch(:user)}/apps/#{fetch(:application)}/current/docker-compose.production.yml")
      execute("cp /home/#{fetch(:user)}/apps/#{fetch(:application)}/shared/Dockerfile-production /home/#{fetch(:user)}/apps/#{fetch(:application)}/current/Dockerfile-production")
      execute("chmod 755 /home/#{fetch(:user)}/apps/#{fetch(:application)}/current/build-production.sh")
      execute("chmod 755 /home/#{fetch(:user)}/apps/#{fetch(:application)}/current/docker-compose.production.yml")
      execute("chmod 755 /home/#{fetch(:user)}/apps/#{fetch(:application)}/current/Dockerfile-production")
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
      execute("mkdir /home/#{fetch(:user)}/apps/#{fetch(:application)}/current/_site/apps")
      execute("cp -r /home/#{fetch(:user)}/apps/#{fetch(:application)}/shared/apps/* /home/#{fetch(:user)}/apps/#{fetch(:application)}/current/_site/apps")
      execute("cp -r /home/#{fetch(:user)}/apps/#{fetch(:application)}/shared/assets/* /home/#{fetch(:user)}/apps/#{fetch(:application)}/current/_site/assets")
      execute("sudo chown -R deploy:deploy /home/#{fetch(:user)}/apps/#{fetch(:application)}")
    end
  end

  desc 'Remove images and not needed folders and files'
  task :clean_up do
    on roles(:app)do
      execute("cd '#{release_path}'; rm -fr assets")
      execute("cd '#{release_path}'; rm -fr _posts")
      execute("docker rmi -f $(docker images -a -q)")
      execute("docker system prune")
    end
  end

  after :deploy, 'jekyll:prepare_files'
  after :prepare_files, :build
  after :build, :include_old_docs
  after :include_old_docs, :clean_up
end
