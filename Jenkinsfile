pipeline {
  agent any
  stages {
    stage('Build') {
      when { anyOf { branch 'master'; branch 'develop' } }
      steps {
        sh '''
          source ~/.bash_profile
          export PATH=$PATH:/usr/local/bin:$HOME/.rbenv/bin:$HOME/.rbenv/shims
          eval "$(rbenv init -)"
          rbenv local 2.4.2
          gem install bundler
          bundle install
          rbenv rehash
          jekyll build
        '''
      }
    }
    stage('Test') {
      when { anyOf { branch 'master'; branch 'develop' } }
      steps {
        sh '''
          source ~/.bash_profile
          export PATH=$PATH:/usr/local/bin:$HOME/.rbenv/bin:$HOME/.rbenv/shims
          eval "$(rbenv init -)"
          rbenv local 2.4.2
          gem install bundler
          bundle install
          rbenv rehash
          rake test_html
          rake test_files
          rake test_posts
        '''
      }
    }
    stage('Deploy') {
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
          bundle exec cap production deploy --trace
        '''
      }
    }
  }
}
