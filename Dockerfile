FROM ruby:2.6.6

RUN apt-get update
RUN apt install -y locales \
    && apt-get install -y \
    cmake \
    nodejs \
    python-pygments \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/

RUN gem install \
    jekyll \
    jekyll-redirect-from \
    kramdown \
    rdiscount \
    rouge

RUN gem install bundler -v '2.1.4'
RUN gem install nokogiri -v '1.8.1'

EXPOSE 4000

WORKDIR /src

COPY build.sh .

RUN dpkg-reconfigure locales && \
    locale-gen C.UTF-8 && \
    /usr/sbin/update-locale LANG=C.UTF-8

# Install needed default locale for Makefly
RUN echo 'en_US.UTF-8 UTF-8' >> /etc/locale.gen && \
    locale-gen

# Set default locale for the environment
ENV LC_ALL C.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

CMD jekyll serve
