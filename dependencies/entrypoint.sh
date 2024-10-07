#!/bin/bash
set -e
cd /S/AIKIT_UI

# bundle exec rake assets:precompile RAILS_ENV=development

bundle exec rails server -b 0.0.0.0

# cd /io
# exec bundle exec "$@"
# exec "$@"

