/* eslint-disable global-require */
export default function Documento() {
  const PDFDocument = require('pdfkit');
  const fs = require('fs');

  const pdfDoc = new PDFDocument();
  pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
  pdfDoc.text('My Sample PDF Document');
  pdfDoc.end();
}
