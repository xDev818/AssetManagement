/* 

Info : The code was made and controlled by Nole 
            The current Author can add and update the codes

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
        create generate_PDF.js
        import PDFAssetStatus from '../../components2/views/pdfreports/PDFAssetStatus'
         import PDFPosition from '../../components2/views/pdfreports/PDFPosition'
         import PDFDepartment from 'components2/views/pdfreports/PDFDepartment'
         import PDFSuppliers from 'components2/views/pdfreports/PDFSuppliers'


    Date : 10 / 19 / 23
    Author : Nole
    Activities
    Purpose : 
        import PDFAssetCategory from 'components2/views/pdfreports/PDFAssetCategory'


    Date : 10 / 22 / 23
    Author : Nole
    Activities
    Purpose : 
        Add Assets functionality Report

    Date : 10 / 25 / 23
    Author : Nole
    Activities
    Purpose : 
        Add Asset Receiving DOcument

*/ 

import PDFReports from 'components2/views/pdfreports/PDFReports'
import PDFReportReceiving from 'components2/views/pdfreports/PDFReportReceiving'

//import React, { useState } from 'react'


const generate_PDF =  (propdata,paramReportType,docref) => {

    var icount = 0
    const rowdata = []

    const reportColumn = ["#","Name","Description"];
    const positionColumn = ["#","Position","Department", "Description"];
    const assetTypeColumn = ["#","Category","Type", "Description"];
    const vendorColumn  = ["#","Vendor","Address", "Contact No", "Email"];
    const assetsColumn  = ["#","Type","Status", "Code", "Name", "Date Purchase"];
    const receivingColumn = ["#","Code", "Serial","Name", "Type"];
    const CheckoutColumn = ["#","Type", "Serial","Name"];
    
  
        if(paramReportType === 'Asset Status') {

            propdata.forEach(item => {
                icount = icount + 1
                
                const itempData = [
                    icount.toString(),
                    item.statusName,
                    item.statusDescription
                ];
                rowdata.push(itempData)
            });

            PDFReports(rowdata,reportColumn,paramReportType)

        } else if (paramReportType === 'Position') {

            propdata.forEach(item => {
                icount = icount + 1
                
                const itempData = [
                    icount.toString(),
                    item.positionName,
                    item.departmentName,
                    item.description
                ];
                rowdata.push(itempData)
            });
            PDFReports(rowdata,positionColumn,paramReportType)
           // PDFPosition(propdata)

        } else if (paramReportType === 'Department') {
            propdata.forEach(item => {
                icount = icount + 1
                
                const itempData = [
                    icount.toString(),
                    item.departmentName,
                    item.description
                ];
                rowdata.push(itempData)
            });
            PDFReports(rowdata,reportColumn,paramReportType)

        } else if (paramReportType === 'Suppliers') {
            alert("working on presentation view")
            propdata.forEach(item => {
                icount = icount + 1
                
                const itempData = [
                    icount.toString(),
                    item.supplierName,
                    item.address,
                    item.contactno,
                    item.email
                ];
                rowdata.push(itempData)
            });
            PDFReports(rowdata,vendorColumn,paramReportType)

        } else if (paramReportType === 'Asset Category') {

            propdata.forEach(item => {
                icount = icount + 1
                
                const itempData = [
                    icount.toString(),
                    item.assetCategName,
                    item.description
                    
                ];
                rowdata.push(itempData)
            });
            PDFReports(rowdata,reportColumn,paramReportType)

         } else if (paramReportType === 'User Group') {
 
            propdata.forEach(item => {
                icount = icount + 1
                
                const itempData = [
                    icount.toString(),
                    item.categoryName,
                    item.categoryDesc
                ];
                rowdata.push(itempData)
            });

            PDFReports(rowdata,reportColumn,paramReportType)

         }  else if (paramReportType === 'Asset Type') {
 
            propdata.forEach(item => {
                icount = icount + 1
                
                const itempData = [
                    icount.toString(),
                    item.assetCategName,
                    item.typeName,
                    item.description
                ];
                rowdata.push(itempData)
            });

            PDFReports(rowdata,assetTypeColumn,paramReportType)

         } else if (paramReportType === 'Assets') {
 
            propdata.forEach(item => {
                icount = icount + 1
                
                const assetsData = [
                    icount.toString(),
                    item.typeName,
                    item.statusName,
                    item.assetCode,
                    item.assetName,
                    item.date_purchase,
                ];
                rowdata.push(assetsData)

            });

            PDFReports(rowdata,assetsColumn,paramReportType)

         } else if (paramReportType === 'Receiving') {
 
            // propdata.forEach(item => {
            //     icount = icount + 1
                
            //     const assetsData = [
            //         icount.toString(),
            //         item.typeName,
            //         item.statusName,
            //         item.assetCode,
            //         item.assetName,
            //         item.date_purchase,
            //     ];
            //     rowdata.push(assetsData)

            // });
            
            PDFReportReceiving(propdata,receivingColumn,paramReportType,docref)

         } else if (paramReportType === 'Checkout') {

            propdata.forEach(item => {
                icount = icount + 1
                
                const checkoutData = [
                    icount.toString(),
                    item.typeName,
                    item.serialNo,
                    item.assetName
                ];
                rowdata.push(checkoutData)
            });
            PDFReports(rowdata,CheckoutColumn,paramReportType)

         }


   
}

  
export default generate_PDF;