
/* -------------------------------------------------------------------------- */
/*                                See Info Below                              */
/*               Write Updates , Activities and Comments Below                */
/*                              Before Coding                                 */
/* -------------------------------------------------------------------------- */

/* 


    Date : 01 / 03 / 23
    Author : Nole
    Activities
    Purpose : 
      create PDF Pullout


 
*/


import DefaultLogoReport from '../../../assets/img/DefaultLogoReport.webp'
import Datehelper from 'components/Utils/datehelper';

import React from 'react'
import jsPDF from "jspdf";
import "jspdf-autotable";

// import {

//   FormLabel,
//   FormControl,
//   Input,

//   useToast


// } from "@chakra-ui/react";


const PDFReportPullout = (propdata,propColumn,paramReportType,docref) => {
  
 // const toast = useToast()

  const doc = new jsPDF();
  //const total = propdata.length.toString();
  const datehelper = new Datehelper()

  // function viewToastify(title,desc,status) {
  //   // const toast = useToast()
  //    return (
       
  //          toast({
  //            title: title,
  //            description: desc,
  //            status: status,
  //            duration: 3000,
  //            isClosable: true,
  //            position: "top"
  //          })
       
      
  //    )
  //  }

    try {
   
     

      const dateStr = datehelper.dateformat_PDFFile()
      const dateGenerate = datehelper.dateformat_Report()
      
      var img = new Image()
      img.src = DefaultLogoReport

      const rowdata = []
      const rowdata2 = []
      var icount  =0

   

      propdata.map(asset => { 

        // console.log(docref)
        // console.log(asset.docRef_Pullout)

        if(asset.docRef_Pullout === docref ) { 
          icount = icount + 1
               
                const itempData = [
                  icount.toString(),
                  asset.typeName,
                  asset.statusName,
                  asset.assetCode,
                  asset.assetName
                  ];
                  rowdata.push(itempData)

                  const releaseData = [
                    asset.fullname
                    ];
                    rowdata2.push(releaseData)
                
        }
      })
      
      if(rowdata.length > 0) {

        doc.addImage(img, 'webp',10 ,5, 40,15)  // margin-left,margin-top,width , height
        doc.text("Asset Pullout Form",150, 12 ); // margin-left,margin-top
        doc.setFontSize(10)
        doc.text('Date Generated : ' + dateGenerate,150,16)
        doc.text('Document No : ' + propdata[0].docRef_Pullout,150,21)
        doc.line(10,25,200,25)
       
        doc.autoTable(propColumn, rowdata,{ startY: 45,horizontalPageBreak: true,horizontalPageBreakRepeat: 0, })
      
        var pageCount = doc.getCurrentPageInfo().pageNumber
        
        for( var i=0; i < pageCount;i++)
        {
          doc.setPage(i)
         
          var curretPage = doc.getCurrentPageInfo().pageNumber

         // doc.setFont('Helvetica-Bold')
          doc.setFontSize(14)
          doc.text("Dear : Asset Team , ",10,30)

         // doc.setFont('Helvetica')
          doc.setFontSize(10)
          doc.text("Please find Below asset(s) for Pullout.",10,35)
          //doc.text("proficient manner. ",10,40)


        // doc.setFont('Helvetica-Bold')
          doc.setFontSize(14)
          doc.text("DECLARATION NOTE : ",10,100)

      //    doc.setFont('Helvetica')
          doc.setFontSize(10)
          doc.text("I acknowledge that I return the above items indicated.",10,105)
          doc.text("Incase any assets pulloout found issues upon checking, I am responsible for the cost incured.",10,110)
          //doc.text("Incase any assets pulloout found issues upon checking, I am responsible for the cost incured.",10,115)


       //   doc.setFont('Helvetica-Bold')
          doc.setFontSize(12)
          doc.text("Asset Team ",10,125)
          doc.text("Employee ",140,125)

       //   doc.setFont('Helvetica')
          doc.setFontSize(10)
         // doc.text(rowdata2[0][1]  ,10,140)  // Released By
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

        } else {

          alert("No Data to Generate")
          // viewToastify(
          //   "PDF Report",
          //   "No Data to Generate",
          //   "info"
          // )

        }
      }
      catch(err)  {
        alert(err)
        //  WriteLog("Error", "Generate PDF " ,"Generate Asset PDF","","")
      }
      

}

export default PDFReportPullout
