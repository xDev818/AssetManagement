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

const PDFSuppliers = (suppliers) => {
 
    const doc = new jsPDF();
    const totalSuppliers = suppliers.length.toString();
    const datehelper = new Datehelper()
    try {

      const dateStr = datehelper.dateformat_PDFFile()
      const dateGenerate = datehelper.dateformat_Report()
      
        var img = new Image()
        img.src = DefaultLogoReport

        // define the columns we want and their titles
        const tableColumn = ["#","Vendor","Address", "Contact No"];
        // define an empty array of rows
        const tableRows = [];
        var icount = 0

        // for each ticket pass all its data into an array
        suppliers.forEach(supplier => {
            icount = icount + 1
            
            const supplierData = [
                icount.toString(),
                supplier.supplierName,
                supplier.address,
                supplier.contactno,
            ];
            // push each assets info into a row
            tableRows.push(supplierData);
        });

        doc.addImage(img, 'webp',10 ,5, 40,15)  // margin-left,margin-top,width , height
        doc.text("List of Vendor",150, 12 ); // margin-left,margin-top
        doc.setFontSize(10)
        doc.text('Date Generated : ' + dateGenerate,150,16)
        doc.text('# of Suppliers : ' + totalSuppliers,150,21)
        doc.line(10,25,200,25)

        doc.autoTable(tableColumn, tableRows,{ startY: 30,horizontalPageBreak: true,horizontalPageBreakRepeat: 0, })

        var pageCount = doc.getCurrentPageInfo().pageNumber

        for( var i=0; i < pageCount;i++)
        {
            doc.setPage(i)
        
            var curretPage = doc.getCurrentPageInfo().pageNumber

            doc.line(10,280,200,280)
            doc.text("Page : " + curretPage + "/" + pageCount, 10,285)
            doc.text("Asset Management Team", 150,285)

        }

        // we define the name of our PDF file to save.
        doc.save(`ListofSuppliers_${dateStr}.pdf`);
    }
    catch(err) {
        alert(err)
    }

}

export default PDFSuppliers;

