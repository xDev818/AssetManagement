/* 

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
        create PDFAssetStatus.js
        
*/ 

import DefaultLogoReport from '../../../assets/img/DefaultLogoReport.webp'
import Datehelper from 'components/Utils/datehelper';

import React from 'react'
import jsPDF from "jspdf";
import "jspdf-autotable";

const PDFAssetStatus = (assetStatus) => {
 
    const doc = new jsPDF();
    const totalAssetStatus = assetStatus.length.toString();
    const datehelper = new Datehelper()
    try {

      const dateStr = datehelper.dateformat_PDFFile()
      const dateGenerate = datehelper.dateformat_Report()
      
        var img = new Image()
        img.src = DefaultLogoReport

        // define the columns we want and their titles
        const tableColumn = ["#","Status", "Description"];
        // define an empty array of rows
        const tableRows = [];
        var icount = 0

        // for each ticket pass all its data into an array
        assetStatus.forEach(status => {
            icount = icount + 1
            
            const statusData = [
                icount.toString(),
                status.statusName,
                status.statusDescription,
            ];
            // push each assets info into a row
            tableRows.push(statusData);
        });

        doc.addImage(img, 'jpeg',10 ,5, 40,15)  // margin-left,margin-top,width , height
        doc.text("Asset Status",150, 12 ); // margin-left,margin-top
        doc.setFontSize(10)
        doc.text('Date Generated : ' + dateGenerate,150,16)
        doc.text('# of Status : ' + totalAssetStatus,150,21)
        doc.line(10,25,200,25)

        doc.autoTable(tableColumn, tableRows,{ startY: 30,horizontalPageBreak: true,horizontalPageBreakRepeat: 0, })

        var pageCount = doc.getCurrentPageInfo().pageNumber

        for( var i=0; i < pageCount;i++)
        {
            doc.setPage(i)
        
            var curretPage = doc.getCurrentPageInfo().pageNumber
            //WriteLog("For Testing"," ")
        // doc.autoTable(tableRows,{startY:30})

            doc.line(10,280,200,280)
            doc.text("Page : " + curretPage + "/" + pageCount, 10,285)
            doc.text("Asset Management Team", 150,285)

        }

        // we define the name of our PDF file to save.
        doc.save(`AssetStatus_${dateStr}.pdf`);
    }
    catch(err) {
        alert(err)
    }

}

export default PDFAssetStatus;

