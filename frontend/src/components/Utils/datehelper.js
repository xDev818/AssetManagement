import React from 'react'

export default class Datehelper {

     dateformat_PDFFile () {

  //      const newDate = new Date()
  //      let year = newDate.getFullYear();
  //      let month = newDate.getMonth() + 1;
  //      let day = newDate.getDate();

        const date = Date().split(" ");
        const dateStr = date[1] + date[2] + date[3] + date[4];
        return dateStr
    }

     dateformat_Report () {
        const newDate = new Date()
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        let day = newDate.getDate();

         const dateGenerate = month + "/" + day + "/" + year
         return dateGenerate
    }

    






}