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

*/ 

import PDFReports from 'components2/views/pdfreports/PDFReports'


import React, { useState } from 'react'


const generate_PDF =  (propdata,paramReportType) => {

    var icount = 0
    const rowdata = []

    const ThreeColumn = ["#","Name","Description"];
    const FourColumn = ["#","Position","Department", "Description"];
    const vendorColumn  = ["#","Vendor","Address", "Contact No", "Email"];
    

  
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

            PDFReports(rowdata,ThreeColumn,paramReportType)

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
            PDFReports(rowdata,FourColumn,paramReportType)
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
            PDFReports(rowdata,ThreeColumn,paramReportType)

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
            PDFReports(rowdata,ThreeColumn,paramReportType)

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

            PDFReports(rowdata,ThreeColumn,'User Group')

         }
   
}

  
export default generate_PDF;