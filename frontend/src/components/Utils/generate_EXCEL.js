
/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */


/* 
    Date : 10 / 23 / 23
    Author : Nole
    Activities
    Purpose : 
      Generate EXCEL data

*/


import * as Filesaver from 'file-saver'
import XLSX from 'sheetjs-style'
const generate_EXCEL =  (propdata,paramReportType) => {




  var icount = 0
  const rowdata = []

  const reportColumn = ["#","Name","Description"];
  const positionColumn = ["#","Position","Department", "Description"];
  const assetTypeColumn = ["#","Category","Type", "Description"];
  const vendorColumn  = ["#","Vendor","Address", "Contact No", "Email"];
  const assetsColumn  = ["#","Type","Status", "Code", "Name", "Date Purchase"];

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(propdata);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    Filesaver.saveAs(data, paramReportType + fileExtension);

      //PDFReports(rowdata,reportColumn,paramReportType)

}

export default generate_EXCEL;