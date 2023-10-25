export default async function addFonts() {
  const f = new FontFace('Segoeprint', 'url(/src/assets/fonts/segoeprint.ttf)');
  const fBold = new FontFace(
    'Segoeprint-bold',
    'url(/src/assets/fonts/segoeprint-bold.ttf)'
  );

  return new Promise(resolve => {
    Promise.all([f.load(), fBold.load()]).then(([font, fontBold]) => {
      document.fonts.add(font);
      document.fonts.add(fontBold);

      resolve(null);
    });
  });
}
