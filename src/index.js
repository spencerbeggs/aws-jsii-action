import artifact from "@actions/artifact";
import glob from "@actions/glob";

const client = artifact.create();
const { GITHUB_WORKSPACE } = process.env;

async function main() {
  return Promise.all(
    ["js", "python", "dotnet", "java"].map(async (type) => {
      try {
        const root = `${GITHUB_WORKSPACE}/dist/${type}`;
        const patterns = [
          `${root}/**/**`,
          `!${root}/.github`,
          `!${root}/.yarn`,
          `!${root}/.yarnrc`,
        ];
        const globber = await glob.create(patterns.join("\n"));
        const files = await globber.glob();
        const options = {
          continueOnError: true,
        };
        const uploadResponse = await client.uploadArtifact(
          type,
          files,
          root,
          options
        );
        console.log(uploadResponse);
      } catch (err) {
        console.log(err);
      }
    })
  );
}

main();
