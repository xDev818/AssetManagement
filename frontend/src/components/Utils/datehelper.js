/* 

    Date : 10 / 18 / 23
    Author : Nole
    Activities
    Purpose : 
        create datehelper.js
*/

import React from 'react'

export default class Datehelper {

     dateformat_PDFFile () {

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

    dateformat_MMDDHR() {

        let newDate = new Date()
        
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        let day = newDate.getDate();
        let hr = newDate.getHours();
        //let minute = newDate.getMinutes();
       // let secs = newDate.getSeconds();
        return month + "" + "" + day + "" + hr
        // year+"/"+month+"/"+day +" " + hr+":"+minute+":"+secs
    
    
       
    
    }
    

}