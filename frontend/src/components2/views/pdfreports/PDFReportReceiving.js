
import * as React from 'react'

import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

import DefaultLogoReport from '../../../assets/img/DefaultLogoReport.webp'


const PDFReportReceiving = (assets_byDocref,documentNo) => {
  
    try {
  
        const doc = new jsPDF();
      
        // define the columns we want and their titles
        const tableColumn = ["#","Code", "Serial","Name", "Category"];
        // define an empty array of rows
        const tableRows = [];
          var icount = 0
        // for each ticket pass all its data into an array
        assets_byDocref.forEach(asset => {
          icount = icount + 1
          
          const assetData = [
              icount.toString(),
            asset.assetCode,
            asset.serialNo,
            asset.assetName,
            asset.assetCategName
      
          ];
          // push each assets info into a row
          tableRows.push(assetData);
        });
      
          var img = new Image()
          img.src = DefaultLogoReport
        
          let newDate = new Date()
          let year = newDate.getFullYear();
          let month = newDate.getMonth() + 1;
          let day = newDate.getDate();
          
      
      
        const date = Date().split(" ");
        const dateStr = date[1] + date[2] + date[3] + date[4];
        const dateGenerate = month + "/" + day + "/" + year
      
        
      
        doc.addImage(img, 'jpeg',10 ,5, 40,15)  // margin-left,margin-top,width , height
        doc.text("Asset Receive Form",150, 12 ); // margin-left,margin-top
        doc.setFontSize(10)
        doc.text('Date Generated : ' + dateGenerate,150,16)
        doc.text('Document No : ' + documentNo,150,21)
        doc.line(10,25,200,25)
      
        doc.autoTable(tableColumn, tableRows,{ startY: 45,horizontalPageBreak: true,horizontalPageBreakRepeat: 0, })
      
        var pageCount = doc.getCurrentPageInfo().pageNumber
        
        for( var i=0; i < pageCount;i++)
        {
          doc.setPage(i)
         
          var curretPage = doc.getCurrentPageInfo().pageNumber

          doc.setFont('Helvetica-Bold')
          doc.setFontSize(14)
          doc.text("Dear : " + assets_byDocref[0].FullName + ',',10,30)

          doc.setFont('Helvetica')
          doc.setFontSize(10)
          doc.text("Please find Below asset(s) checkout/assigned to you, to support in carrying out your assignment in a most",10,35)
          doc.text("proficient manner. ",10,40)


          doc.setFont('Helvetica-Bold')
          doc.setFontSize(14)
          doc.text("DECLARATION NOTE : ",10,100)

          doc.setFont('Helvetica')
          doc.setFontSize(10)
          doc.text("I acknowledge that I have  received the above items that required performing regular function of my designation and",10,105)
          doc.text("responsibility to hold as good working conditions and in order. I am responsible for the assets and replacement cost.",10,110)
          doc.text("Incase any assets are not in use I promise to return without delay. ",10,115)


          doc.setFont('Helvetica-Bold')
          doc.setFontSize(12)
          doc.text("Asset Team ",10,125)
          doc.text("Requesting Employee ",140,125)

          doc.setFont('Helvetica')
          doc.setFontSize(10)
          doc.text(assets_byDocref[0].ReleaseBy  ,10,140)
          doc.text(assets_byDocref[0].FullName ,140,140)
          
          doc.setFont('Helvetica')
          doc.setFontSize(8)
          doc.text("NAME AND SIGNATURE",10,145)     
          doc.text("NAME AND SIGNATURE" ,140,145)
        

         
          
          doc.setFontSize(10)
          doc.line(10,280,200,280)
          doc.text("Page : " + curretPage + "/" + pageCount, 10,285)
          doc.text("Asset Management Team", 150,285)
      
        }
      
         // we define the name of our PDF file to save.
        doc.save(`AssetRecived_${dateStr}.pdf`);
      
      }
      catch(err)  {
          WriteLog("Error", "Generate PDF " ,"Generate Asset PDF","","")
      }
      

}

export default PDFReportReceiving
