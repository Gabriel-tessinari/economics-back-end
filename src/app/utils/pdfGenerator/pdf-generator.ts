import ejs from 'ejs';
import pdf from 'html-pdf';
import { Transaction } from '../../entities/transaction';
import { ApiError } from '../api-error';

export class PdfGenerator {
  public monthReport(fileName: string, account: string, month: string, year: number, transactions: Transaction[]): void {
    let total = transactions[0].account?.total;
    let monthReportRequest = { month: month, account: account, total: total, year: year, transactions: transactions };

    ejs.renderFile('./src/app/utils/pdfGenerator/month-report.ejs', monthReportRequest, (err, html) => {
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