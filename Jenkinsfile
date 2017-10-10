pipeline {
  agent any
  stages {
    stage('error') {
      steps {
        sh '''source ~/.bash_profile
export PATH=$PATH:/usr/local/bin:$HOME/.rbenv/bin:$HOME/.rbenv/shims
eval "$(rbenv init -)"
rbenv local 2.4.0
gem install bundler
bundle install
rbenv rehash
jekyll build
aws s3 sync ./_site s3://epages-devblog/'''
      }
    }
  }
}