
/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */

/* 


    Date : 10 / 25 / 23
    Author : Nole
    Activities
    Purpose : 
      create PDFReceiving

  
 
*/


import DefaultLogoReport from '../../../assets/img/DefaultLogoReport.webp'
import Datehelper from 'components/Utils/datehelper';

import React from 'react'
import jsPDF from "jspdf";
import "jspdf-autotable";



const PDFReportReceiving = (propdata,propColumn,paramReportType,docref) => {
  
  const doc = new jsPDF();
  //const total = propdata.length.toString();
  const datehelper = new Datehelper()

    try {
   
     

      const dateStr = datehelper.dateformat_PDFFile()
      const dateGenerate = datehelper.dateformat_Report()
      
      var img = new Image()
      img.src = DefaultLogoReport

      const rowdata = []
      const rowdata2 = []
      var icount  =0
      propdata.map(asset => { 

        if(asset.docRef_Checkin === docref ) { 
          icount = icount + 1
               
                const itempData = [
                  icount.toString(),
                  asset.assetCode,
                  asset.serialNo,
                  asset.assetName,
                  asset.typeName
                  ];
                  rowdata.push(itempData)

                  const releaseData = [
                    asset.fullname,
                    asset.ReleasedBy
                    ];
                    rowdata2.push(releaseData)
                
        }
      })
      
        doc.addImage(img, 'webp',10 ,5, 40,15)  // margin-left,margin-top,width , height
        doc.text("Asset Receive Form",150, 12 ); // margin-left,margin-top
        doc.setFontSize(10)
        doc.text('Date Generated : ' + dateGenerate,150,16)
        doc.text('Document No : ' + propdata[0].docRef_Checkin,150,21)
        doc.line(10,25,200,25)
       
        doc.autoTable(propColumn, rowdata,{ startY: 45,horizontalPageBreak: true,horizontalPageBreakRepeat: 0, })
      
        var pageCount = doc.getCurrentPageInfo().pageNumber
        
        for( var i=0; i < pageCount;i++)
        {
          doc.setPage(i)
         
          var curretPage = doc.getCurrentPageInfo().pageNumber

         // doc.setFont('Helvetica-Bold')
          doc.setFontSize(14)
          doc.text("Dear : " + rowdata2[0][0] + ',',10,30)

         // doc.setFont('Helvetica')
          doc.setFontSize(10)
          doc.text("Please find Below asset(s) checkout/assigned to you, to support in carrying out your assignment in a most",10,35)
          doc.text("proficient manner. ",10,40)


         // doc.setFont('Helvetica-Bold')
          doc.setFontSize(14)
          doc.text("DECLARATION NOTE : ",10,100)

      //    doc.setFont('Helvetica')
          doc.setFontSize(10)
          doc.text("I acknowledge that I have  received the above items that required performing regular function of my designation and",10,105)
          doc.text("responsibility to hold as good working conditions and in order. I am responsible for the assets and replacement cost.",10,110)
          doc.text("Incase any assets are not in use I promise to return without delay. ",10,115)


       //   doc.setFont('Helvetica-Bold')
          doc.setFontSize(12)
          doc.text("Asset Team ",10,125)
          doc.text("Requesting Employee ",140,125)

       //   doc.setFont('Helvetica')
          doc.setFontSize(10)
          doc.text(rowdata2[0][1]  ,10,140)  // Released By
          doc.text(rowdata2[0][0]  ,140,140) // Receiving
          
       //   doc.setFont('Helvetica')
          doc.setFontSize(8)
          doc.text("NAME AND SIGNATURE",10,145)     
          doc.text("NAME AND SIGNATURE" ,140,145)
        

         
          
          doc.setFontSize(10)
          doc.line(10,280,200,280)
          doc.text("Page : " + curretPage + "/" + pageCount, 10,285)
          doc.text("Asset Management Team", 150,285)
      
        }
      
         // we define the name of our PDF file to save.
        doc.save(paramReportType + `${dateStr}.pdf`);
      
      }
      catch(err)  {
        alert(err)
        //  WriteLog("Error", "Generate PDF " ,"Generate Asset PDF","","")
      }
      

}

export default PDFReportReceiving
