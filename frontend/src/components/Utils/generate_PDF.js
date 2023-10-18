/* 

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
        create generate_PDF.js

*/ 

import PDFAssetStatus from '../../components2/views/pdfreports/PDFAssetStatus'
//'../components2/views/pdfreports/PDFAssetStatus'
import React from 'react'

const generate_PDF =  (paramQuery,paramReportType) => {

  
        if(paramReportType === 'Asset Status') {

            PDFAssetStatus(paramQuery)

        } else {
           PDFAssetStatus(paramQuery)

        }
    
}

export default generate_PDF;