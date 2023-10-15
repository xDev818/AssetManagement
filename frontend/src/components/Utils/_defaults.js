import axios from 'axios'

class Defaults {

   static async getPositionID () {
      
      const request = await axios.get("/positions")

      const response = await request.data
      
      const { positionDisplayID } = response.result[0]

      return positionDisplayID

   }

   static async getCategoryID () {
      
      const request = await axios.get("/categories")

      const response = await request.data
      
      const { categoryID } = response.result[0]

      return categoryID

   }

}

export default Defaults