import ejs from 'ejs';
import pdf from 'html-pdf';
import { ApiError } from '../api-error';

export class PdfGenerator {
  public monthReport(fileName: string): void {
    ejs.renderFile('./src/app/utils/pdfGenerator/month-report.ejs', {}, (err, html) => {
      if(err) {
        console.log(err);
        throw new ApiError(500, "Erro ao gerar html.");
      } else {
        pdf.create(html, {}).toFile(fileName, (err, res) => {
          if(err) {
            console.log(err);
            throw new ApiError(500, "Erro ao gerar arquivo PDF.");
          } else {
            console.log(res);
          }
        });
      }
    }); 
  }
}