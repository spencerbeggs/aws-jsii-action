FROM jsii/superchain:latest
COPY entrypoint.sh /entrypoint.sh
COPY index.js /.aws-jsii-action/index.js
COPY package.json /.aws-jsii-action/package.json
COPY yarn.lock /.aws-jsii-action/yarn.lock
RUN ["yarn", "--cwd", "/.aws-jsii-action", "install"]
ENTRYPOINT ["/entrypoint.sh"]