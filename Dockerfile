FROM ruby:2.4.2

RUN apt-get update \
    && apt-get install -y \
    node \
    python-pygments \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/

RUN gem install \
    github-pages \
    jekyll \
    jekyll-redirect-from \
    kramdown \
    rdiscount \
    rouge

EXPOSE 4000

WORKDIR /src

COPY build.sh .
COPY build_d.sh .

CMD jekyll serve
