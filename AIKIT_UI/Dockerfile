FROM ubuntu:22.04

MAINTAINER Darrell Ricke <Darrell.Ricke@ll.mit.edu>

ENV HTTP_PROXY="http://llproxy.llan.ll.mit.edu:8080" 
ENV HTTPS_PROXY="http://llproxy.llan.ll.mit.edu:8080"
ENV FTP_PROXY="http://llproxy.llan.ll.mit.edu:8080"

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8

# libcurl4-openssl-dev \
RUN apt-get update && apt-get install -y build-essential coreutils \
    wget bzip2 git g++ gfortran libreadline6-dev libncurses5-dev xorg-dev libpng-dev libbz2-dev \
    liblzma-dev libpcre3-dev make libcairo2-dev libgtk2.0-dev \
    locales libcurl4-nss-dev \
    language-pack-en language-pack-en-base \
    git curl unzip bc tabix \
    libssl-dev libgit2-dev libssh2-1-dev \
    gcc zip \
    python3.10 gcc zip python2-dev python3-dev \
    zlib1g-dev libbz2-dev liblzma-dev pigz libncurses5-dev \
    libreadline-dev \
    openssl \
    gnupg2 \
    libmysqlclient-dev \
    nodejs \
    sqlite3 \
    ruby-full rubygems

ENV CRAN_URL "http://cran.rstudio.com"

RUN mkdir /usr/local/S
COPY pcre2-10.40.tar /usr/local/S
COPY Clinical_Studies.tar /usr/local/S
COPY entrypoint.sh /usr/bin

RUN gem install bundler \
    && gem install mysql2 \
    && apt-get -y install libsqlite3-dev \
    && gem install sqlite3 \ 
    && gem install rake \
    && gem install tzinfo-data \
    && gem install rails 

WORKDIR /usr/local/S
RUN curl https://bootstrap.pypa.io/pip/3.6/get-pip.py -o get-pip.py \
    && python3 get-pip.py

RUN cd /usr/local/S && tar -xf pcre2-10.40.tar && cd pcre2-10.40 && ./configure && make -j 24 && make install

WORKDIR /usr/local/S
RUN wget https://cran.r-project.org/src/base/R-4/R-4.1.3.tar.gz && tar zxf R-4.1.3.tar.gz && cd /usr/local/S/R-4.1.3 && ./configure && make && make install

RUN R --slave -e 'install.packages("BiocManager", repo = "http://cran.us.r-project.org")' \
    && R --slave -e 'BiocManager::install("SingleCellExperiment")' \
    && R --slave -e 'BiocManager::install("scater")' \
    && R --slave -e 'install.packages("Rtsne", repo = "http://cran.us.r-project.org")' \
    && R --slave -e 'install.packages("cowplot", repo = "http://cran.us.r-project.org")' 

RUN cd /usr/local/S && wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O /usr/local/S/miniconda.sh
RUN bash /usr/local/S/miniconda.sh -b -p /usr/local/S/miniconda/
ENV PATH="/usr/local/S/miniconda/bin/:$PATH"
RUN export PATH="/usr/local/S/miniconda/bin/:$PATH"

WORKDIR /usr/local/S
RUN tar -xf Clinical_Studies.tar 
WORKDIR /usr/local/S/Clinical_Studies 
RUN bundle install

WORKDIR /usr/local/S/Clinical_Studies
RUN rake highcharts:update
RUN apt-get install -y npm
RUN npm install highcharts --save
RUN bundle exec rake assets:precompile RAILS_ENV=production \
    && bundle exec rake assets:precompile RAILS_ENV=development

RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000
CMD cd /usr/local/S/Clinical_Studies \
    && rails server -b 0.0.0.0
