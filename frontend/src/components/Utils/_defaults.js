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

   static async getDepartmentID () {
      
      const request = await axios.get("/departments")

      const response = await request.data
      
      const { departmentDisplayID } = response.result[0]

      return departmentDisplayID

   }

}

export default Defaults