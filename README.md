# AWS JSII Action

Package your [AWS CDK](https://aws.amazon.com/cdk/) constructs deliver polyglot libraries from Typscript with [jsii](https://github.com/aws/jsii) via the [jsii/supercahin](https://hub.docker.com/r/jsii/superchain) Docker image.

## Example usage

```yml
on: push
jobs:
  jsii:
    runs-on: ubuntu-latest
    name: "Packages code with aws-jsii"
    steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: package
        uses: spencerbeggs/aws-jsii-action@test20
      - name: artifacts
        uses: actions/upload-artifact@v1
        with:
          name: dist
          path: dist
```
