pipeline {
  agent any
  stages {
    stage('Build and deploy') {
      steps {
        sh '''source ~/.bash_profile
export PATH=$PATH:/usr/local/bin:$HOME/.rbenv/bin:$HOME/.rbenv/shims
eval "$(rbenv init -)"
rbenv local 2.4.0
gem install bundler
bundle install
rbenv rehash
jekyll build
$Currentbranch=env.BRANCH_NAME
if [ "$Currentbranch" = "master" ]; then
  aws s3 sync ./_site s3://epages-devblog/
elif [ "$Currentbranch" = "develop" ]; then
  aws s3 sync ./_site s3://epages-devblog-stg/
else
  echo "$Currentbranch"
fi'''
      }
    }
  }
}