const fs = require('node:fs');
const path = require('node:path');

async function main() {
  const occt = await require('occt-import-js')();
  const assemblies = {
    'pan-tilt': 'pan-tilt-revk-full-assembly.step',
    'steady-spoon': 'steadyhand-v3-9-packaging-assembly.step',
  };
  const target = path.join(__dirname, '..', 'public', 'cad-previews');
  fs.mkdirSync(target, {recursive: true});
  for (const [slug, filename] of Object.entries(assemblies)) {
    const data = fs.readFileSync(path.join(__dirname, '..', 'public', 'cad-assemblies', filename));
    const result = occt.ReadStepFile(data, {linearUnit: 'millimeter', linearDeflectionType: 'absolute_value', linearDeflection: 0.2, angularDeflection: 0.35});
    if (!result.success || !result.meshes.length) throw new Error(`Cannot convert ${filename}`);
    const meshes = result.meshes.map(mesh => ({
      positions: mesh.attributes.position.array.map(n => Math.round(n * 1000) / 1000),
      indices: mesh.index.array,
      color: mesh.color,
    }));
    fs.writeFileSync(path.join(target, `${slug}.json`), JSON.stringify(meshes));
    console.log(`${slug}: ${meshes.length} assembly bodies converted`);
  }
}
main().catch(error => { console.error(error); process.exit(1); });
