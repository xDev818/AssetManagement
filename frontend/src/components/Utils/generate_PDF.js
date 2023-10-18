/* 

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
        create generate_PDF.js

*/ 

import PDFAssetStatus from '../../components2/views/pdfreports/PDFAssetStatus'
import PDFPosition from '../../components2/views/pdfreports/PDFPosition'
import PDFDepartment from 'components2/views/pdfreports/PDFDepartment'
import PDFSuppliers from 'components2/views/pdfreports/PDFSuppliers'

import React from 'react'

const generate_PDF =  (paramQuery,paramReportType) => {

  
        if(paramReportType === 'Asset Status') {

            PDFAssetStatus(paramQuery)

        } else if (paramReportType === 'Position') {
           PDFPosition(paramQuery)

        } else if (paramReportType === 'Department') {
            PDFDepartment(paramQuery)
 
         } else if (paramReportType === 'Suppliers') {
            alert("working with bug")
            PDFSuppliers(paramQuery)
 
         }

    
}

export default generate_PDF;