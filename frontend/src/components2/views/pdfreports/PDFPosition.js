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

const PDFPosition = (positions) => {
 
    const doc = new jsPDF();
    const totalPositions = positions.length.toString();
    const datehelper = new Datehelper()
    try {

      const dateStr = datehelper.dateformat_PDFFile()
      const dateGenerate = datehelper.dateformat_Report()
      
        var img = new Image()
        img.src = DefaultLogoReport

        // define the columns we want and their titles
        const tableColumn = ["#","Position","Department", "Description"];
        // define an empty array of rows
        const tableRows = [];
        var icount = 0

        // for each ticket pass all its data into an array
        positions.forEach(position => {
            icount = icount + 1
            
            const positionData = [
                icount.toString(),
                position.positionName,
                position.departmentName,
                position.description,
            ];
            // push each assets info into a row
            tableRows.push(positionData);
        });

        doc.addImage(img, 'webp',10 ,5, 40,15)  // margin-left,margin-top,width , height
        doc.text("List of Position",150, 12 ); // margin-left,margin-top
        doc.setFontSize(10)
        doc.text('Date Generated : ' + dateGenerate,150,16)
        doc.text('# of Positions : ' + totalPositions,150,21)
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
        doc.save(`ListofPositions_${dateStr}.pdf`);
    }
    catch(err) {
        alert(err)
    }

}

export default PDFPosition;

