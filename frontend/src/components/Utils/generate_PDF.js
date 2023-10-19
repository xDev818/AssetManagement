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

import PDFAssetCategory from 'components2/views/pdfreports/PDFAssetCategory'
import PDFAssetStatus from '../../components2/views/pdfreports/PDFAssetStatus'
import PDFPosition from '../../components2/views/pdfreports/PDFPosition'
import PDFDepartment from 'components2/views/pdfreports/PDFDepartment'
import PDFSuppliers from 'components2/views/pdfreports/PDFSuppliers'


import React from 'react'

const generate_PDF =  (propdata,paramReportType) => {

  
        if(paramReportType === 'Asset Status') {

            PDFAssetStatus(propdata)

        } else if (paramReportType === 'Position') {
           PDFPosition(propdata)

        } else if (paramReportType === 'Department') {
            PDFDepartment(propdata)
 

        } else if (paramReportType === 'Suppliers') {
            alert("still working")
            PDFSuppliers(propdata)

        } else if (paramReportType === 'Asset Category') {
        
            PDFAssetCategory(propdata)

         }

       }

  
export default generate_PDF;