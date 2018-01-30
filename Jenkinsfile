pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '2', artifactNumToKeepStr: '2'))
  }
  stages {
    stage('Build') {
      when { anyOf { branch 'master'; branch 'develop'; expression { BRANCH_NAME ==~ /PR-\d*/ } } }
      steps {
        sh '''
          source ~/.bash_profile
          export PATH=$PATH:/usr/local/bin:$HOME/.rbenv/bin:$HOME/.rbenv/shims
          eval "$(rbenv init -)"
          rbenv local 2.4.2
          gem install bundler
          bundle install
          rbenv rehash
          bundle exec jekyll build
        '''
      }
    }
    stage('Test') {
      when { anyOf { branch 'master'; branch 'develop'; expression { BRANCH_NAME ==~ /PR-\d*/ } } }
      steps {
        sh '''
          source ~/.bash_profile
          export PATH=$PATH:/usr/local/bin:$HOME/.rbenv/bin:$HOME/.rbenv/shims
          eval "$(rbenv init -)"
          rbenv local 2.4.2
          gem install bundler
          bundle install
          bundle update
          rbenv rehash
          rake test_html
          rake test_files
          rake test_posts
        '''
      }
    }
    stage('Deploy Staging') {
      when { branch 'develop' }
      steps {
        sh '''
          source ~/.bash_profile
          export PATH=$PATH:/usr/local/bin:$HOME/.rbenv/bin:$HOME/.rbenv/shims
          eval "$(rbenv init -)"
          rbenv local 2.4.2
          gem install bundler
          bundle install
          rbenv rehash
          eval `ssh-agent -s`
          ssh-add
          bundle exec cap staging deploy --trace
        '''
      }
    }
    stage('Deploy Live') {
      when { branch 'master' }
      steps {
        sh '''
          source ~/.bash_profile
          export PATH=$PATH:/usr/local/bin:$HOME/.rbenv/bin:$HOME/.rbenv/shims
          eval "$(rbenv init -)"
          rbenv local 2.4.2
          gem install bundler
          bundle install
          rbenv rehash
          eval `ssh-agent -s`
          ssh-add
          bundle exec cap production deploy --trace
        '''
      }
    }
  }
}
