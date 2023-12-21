async function main() {
  await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './build',
  });
}

main();
